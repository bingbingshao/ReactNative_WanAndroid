/**
 * @author bingPo
 * @date 2020-04-04 09:20
 * @name: index
 * @description：index
 */
import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet, BackHandler, ToastAndroid,
    AppState,
    StatusBar
} from 'react-native';
import * as TypeId from "./component/TypeId";
import Message from "./component/Message";
import {createAppContainer} from "react-navigation";
import RootNavigator from "./nav/Navigation";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {goBackPage} from "./redux/action/NavigationAction";

const AppNav = createAppContainer(RootNavigator);

class index extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        if (Platform.OS === 'android') {
            this.backHandler = BackHandler.addEventListener(TypeId.ANDROID_BLACK, this.onBackButtonPressAndroid);
        }

        AppState.addEventListener('change', this.handleAppStateChange);
    }

    componentWillUnmount() {
        this.backHandler && this.backHandler.remove();
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    /**
     * 切换前后台触发事件
     * 设置状态栏透明 字体黑色
     */

    handleAppStateChange = (nextAppState) => {
        // //console.log('nexAppState', nextAppState);
        const {themeColor} = this.props.theme;
        StatusBar.setBarStyle('light-content');
        StatusBar.setBackgroundColor(themeColor);
        StatusBar.setTranslucent(true);
    };

    onBackButtonPressAndroid = () => {
        if (this.props.nav.routes[0].index === 0) {  //判断是不是 根路由
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                //最近2秒内按过back键，可以退出应用。
                BackHandler.exitApp();
                return false;
            }
            this.lastBackPressed = Date.now();
            ToastAndroid.show(Message.LOGIN_EXIT, ToastAndroid.SHORT);
        } else {
            this.props.goBackPage();
        }

        return true;
    };


    /**
     * 方法处理
     */

    /**
     * 页面渲染
     */

    render() {
        return (
            <AppNav/>
        );
    }
}

function mapStateToProps(state) {
    return {
        nav: state.nav,
        theme: state.theme
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        goBackPage
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(index);

const styles = StyleSheet.create({});
