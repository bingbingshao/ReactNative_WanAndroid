/**
 * @author bingPo
 * @date 2020-04-04 09:38
 * @name: Login
 * @description：Login
 */
import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet, StatusBar, TouchableHighlight, TextInput,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Theme from '../../component/Theme';
import Style from '../../css/Style';
import Message from '../../component/Message';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ScreenUtil, {deviceWidth} from '../../component/ScreenUtil';
import {goBackPage, goRegister} from '../../redux/action/NavigationAction';
import {LoginStateChange, LoginApp} from '../../redux/action/login/LoginAction';
import ClearTextInput from '../../component/ClearTextInput';
import Util from '../../component/Util';
import Loading from '../../component/Loading';


class Login extends Component {
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
    login() {
        const {loginAccount, loginPassword} = this.props.login;
        if (Util.checkIsEmptyString(loginAccount)) {
            Util.showToast(Message.LOGIN_TIP_1);
            return;
        }
        if (Util.checkIsEmptyString(loginPassword)) {
            Util.showToast(Message.LOGIN_TIP_2);
            return;
        }
        this.props.LoginApp();
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
                            <AntDesign name={'close'} color={Theme.white} size={ScreenUtil.setSpFont(18)}
                                       style={{paddingLeft: ScreenUtil.scaleSizeW(10)}}/>
                            <Text style={Style.barTitle}>{' '}{Message.LOGIN}</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

    _loginView() {
        const {loginAccount, loginPassword} = this.props.login;

        return (
            <View style={[styles.loginView, Style.columnStartCenter]}>
                <Image style={styles.image} source={require('../../image/login/icon.png')}/>
                <View style={[styles.inputView]}>
                    <ClearTextInput
                        style={styles.input}
                        placeholder={Message.LOGIN_ACCOUNT}
                        placeholderTextColor={Theme.color_1}
                        value={loginAccount}
                        onChangeText={(text) => {
                            this.props.LoginStateChange({
                                loginAccount: text.trim(),
                            });
                        }}
                    />
                </View>
                <View style={[styles.inputView, Style.rowStartCenter]}>
                    <ClearTextInput
                        style={styles.input}
                        placeholder={Message.LOGIN_PASSWORD}
                        placeholderTextColor={Theme.color_1}
                        secureTextEntry={true}
                        value={loginPassword}
                        onChangeText={(text) => {
                            this.props.LoginStateChange({
                                loginPassword: text.trim(),
                            });
                        }}
                    />
                </View>
                <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={() => this.login()}>
                    <View style={[styles.button, Style.rowCenterCenter]}>
                        <Text style={styles.font1}>{Message.LOGIN}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

    _other() {
        return (
            <View style={[Style.rowEndCenter, styles.otherView]}>
                <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={() => this.props.goRegister()}>
                    <Text style={styles.font2}>
                        {Message.REGISTER}
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.contains}>
                {this._nav()}
                {this._loginView()}
                {this._other()}
                <Loading isShow={this.props.login.isLoading}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        nav: state.nav,
        login: state.login,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        goBackPage,
        goRegister,
        LoginStateChange,
        LoginApp,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

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

