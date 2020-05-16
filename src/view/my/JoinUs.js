/**
 * @author bingPo
 * @date 2020-04-04 18:57
 * @name: JoinUs
 * @description：JoinUs
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

class JoinUs extends Component {
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

    /**
     * 页面渲染
     */
    //顶部导航渲染
    _nav() {
        const {themeColor} = this.props.theme;
        return (
            <View>
                <StatusBar barStyle={'light-content'} translucent={true} backgroundColor={themeColor}/>
                <View style={[Style.barView, Style.rowBetweenCenter,{backgroundColor: themeColor}]}>
                    <TouchableHighlight
                        underlayColor={'transparent'}
                        onPress={() => this.props.goBackPage()}>
                        <View style={Style.rowCenterCenter}>
                            <AntDesign name={'arrowleft'} color={Theme.white} size={ScreenUtil.setSpFont(20)}
                                       style={{paddingLeft: ScreenUtil.scaleSizeW(10)}}/>
                            <Text style={Style.barTitle}>{' '}{Message.MY_JOIN_US}</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

    _center() {

        return (
            <View style={Style.columnStartCenter}>
                <View style={styles.view1}/>
                <Image style={styles.image} source={require('../../image/login/about.jpg')}/>
                <Text style={styles.font1}>{'一个正在努力学习的程序员'}</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.contains}>
                {this._nav()}
                {this._center()}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        nav: state.nav,
        theme: state.theme,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        goBackPage,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinUs);

const styles = StyleSheet.create({
    contains: {
        flex: 1,
        backgroundColor: Theme.white,
    },
    view1: {
        marginTop: ScreenUtil.scaleSizeH(160),
    },
    image: {
        width: deviceWidth - ScreenUtil.scaleSizeW(30),
        resizeMode: 'contain',
        height: ScreenUtil.scaleSizeH(300),
    },
    font1: {
        fontSize: ScreenUtil.setSpFont(16),
        color: Theme.black,
        marginTop: ScreenUtil.scaleSizeH(20),
        lineHeight: ScreenUtil.scaleSizeH(50),
    },
});
