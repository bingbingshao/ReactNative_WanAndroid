/**
 * @author bingPo
 * @date 2020-04-04 18:58
 * @name: Setting
 * @description：Setting
 */
import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet, StatusBar, TouchableHighlight,
} from 'react-native';
import Theme from '../../component/Theme';
import Style from '../../css/Style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ScreenUtil, {deviceWidth} from '../../component/ScreenUtil';
import Message from '../../component/Message';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {goBackPage} from '../../redux/action/NavigationAction';
import {LogoutApp} from '../../redux/action/login/LoginAction';
import Loading from '../../component/Loading';

class Setting extends Component {
    constructor() {
        super();
        this.state = {};
    }

    //渲染前调用
    componentWillMount() {
    }

    //渲染后调用
    componentDidMount() {
    }

    //卸载前调用
    componentWillUnmount() {
    }

    /**
     * 方法处理
     */
    logout() {
        this.props.LogoutApp();
    }

    /**
     * 页面渲染
     */
    //顶部导航渲染
    _nav() {
        return (
            <View>
                <StatusBar barStyle={'light-content'} translucent={true} backgroundColor={Theme.themeColor}/>
                <View style={[Style.barView, Style.rowBetweenCenter]}>
                    <TouchableHighlight
                        underlayColor={'transparent'}
                        onPress={() => this.props.goBackPage()}>
                        <View style={Style.rowCenterCenter}>
          <AntDesign name={'arrowleft'} color={Theme.white} size={ScreenUtil.setSpFont(20)}
                                       style={{paddingLeft: ScreenUtil.scaleSizeW(10)}}/>
                            <Text style={Style.barTitle}>{' '}{Message.MY_SETTING}</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

    //
    _list() {

    }

    _logout() {
        return (
            <View style={[styles.logoutView, Style.rowCenterCenter]}>
                <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={() => this.logout()}>
                    <View style={[styles.logoutButton, Style.rowCenterCenter]}>
                        <Text style={styles.logoutFont}>{Message.LOGOUT}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.contains}>
                {this._nav()}
                {this._list()}
                {this._logout()}
                <Loading isShow={this.props.my.isLoading}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        nav: state.nav,
        my: state.my,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        goBackPage,
        LogoutApp,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting);

const styles = StyleSheet.create({
    contains: {
        flex: 1,
        backgroundColor: Theme.white,
        position: 'relative',
    },
    logoutView: {
        position: 'absolute',
        bottom: 0,
        width: deviceWidth,
        marginBottom: ScreenUtil.scaleSizeH(120),
    },
    logoutButton: {
        width: deviceWidth - ScreenUtil.scaleSizeW(50),
        height: ScreenUtil.scaleSizeH(60),
        borderRadius: ScreenUtil.scaleSizeW(10),
        backgroundColor: Theme.red,
    },
    logoutFont: {
        color: Theme.white,
        fontSize: ScreenUtil.setSpFont(14),
        fontWeight: '600',
    },
});
