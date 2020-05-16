/**
 * @author bingPo
 * @date 2020-04-04 09:38
 * @name: Register
 * @description：Register
 */
import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet, StatusBar, TouchableHighlight,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Theme from '../../component/Theme';
import Style from '../../css/Style';
import Message from '../../component/Message';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ScreenUtil, {deviceWidth} from '../../component/ScreenUtil';
import {goBackPage} from '../../redux/action/NavigationAction';
import ClearTextInput from '../../component/ClearTextInput';
import {LoginStateChange, RegisterApp} from '../../redux/action/login/LoginAction';
import Util from '../../component/Util';
import Loading from '../../component/Loading';

class Register extends Component {
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
        this.props.LoginStateChange({
            loginAccount: '',
            loginPassword: '',
        });
    }

    /**
     * 方法处理
     */
    register() {
        const {registerAccount, registerPassword, registerPasswordAgain} = this.props.login;
        if (Util.checkIsEmptyString(registerAccount)) {
            Util.showToast(Message.LOGIN_TIP_1);
            return;
        }
        if (Util.checkIsEmptyString(registerPassword)) {
            Util.showToast(Message.LOGIN_TIP_2);
            return;
        }
        if (Util.checkIsEmptyString(registerPasswordAgain)) {
            Util.showToast(Message.LOGIN_TIP_2_1);
            return;
        }
        if (registerPasswordAgain != registerPassword) {
            Util.showToast(Message.LOGIN_TIP_3);
            return;
        }
        this.props.RegisterApp();
    }


    /**
     * 页面渲染
     */
    //顶部导航渲染
    _nav() {
        const {themeColor} = this.props.theme;
        return (
            <View>
                <StatusBar barStyle={'light-content'} translucent={true} backgroundColor={themeColor}/>
                <View style={[Style.barView, Style.rowBetweenCenter,{backgroundColor:themeColor}]}>
                    <TouchableHighlight
                        underlayColor={'transparent'}
                        onPress={() => this.props.goBackPage()}>
                        <View style={Style.rowCenterCenter}>
                            <AntDesign name={'arrowleft'} color={Theme.white} size={ScreenUtil.setSpFont(20)}
                                       style={{paddingLeft: ScreenUtil.scaleSizeW(10)}}/>
                            <Text style={Style.barTitle}>{' '}{Message.REGISTER}</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

    _loginView() {
        const {registerAccount, registerPassword, registerPasswordAgain} = this.props.login;
        const {themeColor} = this.props.theme;
        return (
            <View style={[styles.loginView, Style.columnStartCenter]}>
                <Image style={styles.image} source={require('../../image/login/icon.png')}/>
                <View style={[styles.inputView]}>
                    <ClearTextInput
                        style={styles.input}
                        placeholder={Message.LOGIN_ACCOUNT}
                        placeholderTextColor={Theme.color_1}
                        value={registerAccount}
                        onChangeText={(text) => {
                            this.props.LoginStateChange({
                                registerAccount: text.trim(),
                            });
                        }}
                    />
                </View>
                <View style={[styles.inputView]}>
                    <ClearTextInput
                        style={styles.input}
                        placeholder={Message.LOGIN_PASSWORD}
                        placeholderTextColor={Theme.color_1}
                        secureTextEntry={true}
                        value={registerPassword}
                        onChangeText={(text) => {
                            this.props.LoginStateChange({
                                registerPassword: text.trim(),
                            });
                        }}
                    />
                </View>
                <View style={[styles.inputView]}>
                    <ClearTextInput
                        style={styles.input}
                        placeholder={Message.LOGIN_PASSWORD_AGAIN}
                        placeholderTextColor={Theme.color_1}
                        secureTextEntry={true}
                        value={registerPasswordAgain}
                        onChangeText={(text) => {
                            this.props.LoginStateChange({
                                registerPasswordAgain: text.trim(),
                            });
                        }}
                    />
                </View>
                <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={() => this.register()}>
                    <View style={[styles.button, Style.rowCenterCenter,{backgroundColor:themeColor}]}>
                        <Text style={styles.font1}>{Message.REGISTER}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.contains}>
                {this._nav()}
                {this._loginView()}
                <Loading isShow={this.props.login.isLoading}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        nav: state.nav,
        login: state.login,
        theme: state.theme,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        goBackPage,
        LoginStateChange,
        RegisterApp,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);

const styles = StyleSheet.create({
    contains: {
        flex: 1,
        backgroundColor: Theme.white,
    },
    loginView: {
        width: deviceWidth,
        marginTop: ScreenUtil.scaleSizeH(80),
    },
    image: {
        width: ScreenUtil.scaleSizeW(180),
        height: ScreenUtil.scaleSizeW(180),
        resizeMode: 'contain',
        marginBottom: ScreenUtil.scaleSizeH(20),
    },
    inputView: {
        marginTop: ScreenUtil.scaleSizeH(30),
        width: deviceWidth - ScreenUtil.scaleSizeW(50),
        height: ScreenUtil.scaleSizeH(70),
        backgroundColor: Theme.color_3,
        borderRadius: ScreenUtil.scaleSizeH(15),
        padding: ScreenUtil.scaleSizeH(20),
    },
    input: {
        flex: 1,
        fontSize: ScreenUtil.setSpFont(13),
        color: Theme.black,
        padding: 0,
        height:ScreenUtil.scaleSizeH(20*2),
    },
    button: {
        width: deviceWidth - ScreenUtil.scaleSizeW(50),
        height: ScreenUtil.scaleSizeH(70),
        backgroundColor: Theme.themeColor,
        borderRadius: ScreenUtil.scaleSizeH(10),
        marginTop: ScreenUtil.scaleSizeH(80),
    },
    font1: {
        fontSize: ScreenUtil.setSpFont(14),
        color: Theme.white,
        fontWeight: '600',
    },
    otherView: {
        width: deviceWidth - ScreenUtil.scaleSizeW(50),
        height: ScreenUtil.scaleSizeH(70),
    },
    font2: {
        fontSize: ScreenUtil.setSpFont(12),
        color: Theme.themeColor,
    },
});
