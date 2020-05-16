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
    Modal, FlatList, TouchableOpacity
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
import {ChangeThemeColor} from '../../redux/action/theme/ThemeAction';
import {saveThemeColor} from "../../component/ThemeDao";
import Loading from '../../component/Loading';
import AllTheme from '../../component/AllTheme';

const allThemeColorArray = Object.keys(AllTheme);

class Setting extends Component {
    constructor() {
        super();
        this.state = {
            themeModal: false
        };
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

    //修改主题
    changeTheme() {
        this.setState({
            themeModal: true,
        });
    }

    changeColor(item) {
        this.setState({
            themeModal: false,
        });
        this.props.ChangeThemeColor({
            themeColor: AllTheme[item],
        });
        saveThemeColor(AllTheme[item]);
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
                <View style={[Style.barView, Style.rowBetweenCenter, {backgroundColor: themeColor}]}>
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
        const {themeColor} = this.props.theme;
        return (
            <View style={styles.listView}>
                <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={() => this.changeTheme()}>
                    <View style={[Style.rowBetweenCenter, styles.listView1]}>
                        <View style={[Style.rowCenterCenter]}>
                            <Text style={styles.font3}>{Message.MY_CHANGE_THEME}</Text>
                        </View>
                        <View style={[Style.rowCenterCenter]}>
                            <View style={[styles.themeSquare, {backgroundColor: themeColor}]}/>
                            <AntDesign name={'right'} color={Theme.black} size={ScreenUtil.setSpFont(14)}/>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }

    _logout() {
        const {themeColor} = this.props.theme;
        return (
            <View style={[styles.logoutView, Style.rowCenterCenter]}>
                <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={() => this.logout()}>
                    <View style={[styles.logoutButton, Style.rowCenterCenter,{backgroundColor:themeColor}]}>
                        <Text style={styles.logoutFont}>{Message.LOGOUT}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

    _modal() {
        const {themeModal} = this.state;
        return (
            <View style={{flex: 1}}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    style={{backgroundColor: Theme.blackTransparent}}
                    visible={themeModal}
                >
                    {
                        Platform.OS !== 'IOS' ?
                            <StatusBar backgroundColor={Theme.blackTransparent}/> : null
                    }
                    <View style={[styles.modalView, Style.columnEndCenter]}>
                        <View style={[styles.modalView1, Style.columnCenterCenter]}>
                            <FlatList// 整个界面用FlatList来实现九宫格的效果
                                style={{maxHeight: deviceWidth}}
                                data={allThemeColorArray}
                                renderItem={({item, index}) => this._renderItem({item, index})}
                                keyExtractor={(item) => item.key}
                                showsVerticalScrollIndicator={false}
                                numColumns={3}// 显示三列
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }

    _renderItem({item, index}) {
        console.log(item);
        return (
            <TouchableOpacity
                onPress={() => this.changeColor(item)}>
                <View style={[styles.cardView, {backgroundColor: AllTheme[item]}]}>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.contains}>
                {this._nav()}
                {this._list()}
                {this._logout()}
                {this._modal()}
                <Loading isShow={this.props.my.isLoading}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        nav: state.nav,
        my: state.my,
        theme: state.theme,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        goBackPage,
        LogoutApp,
        ChangeThemeColor
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
        height: ScreenUtil.scaleSizeH(70),
        borderRadius: ScreenUtil.scaleSizeW(10),
        backgroundColor: Theme.color_17,
    },
    logoutFont: {
        color: Theme.white,
        fontSize: ScreenUtil.setSpFont(14),
        fontWeight: '600',
    },
    listView: {
        backgroundColor: Theme.white,
        borderRadius: ScreenUtil.scaleSizeH(30),
        // paddingTop: ScreenUtil.scaleSizeH(20),
        width: deviceWidth,
    },
    listView1: {
        backgroundColor: Theme.white,
        marginLeft: ScreenUtil.scaleSizeW(20),
        width: deviceWidth - ScreenUtil.scaleSizeW(20),
        height: ScreenUtil.scaleSizeH(40 * 2),
        borderBottomColor: Theme.color_16,
        borderBottomWidth: ScreenUtil.pixelRatio(2),
        paddingRight: ScreenUtil.scaleSizeW(20),
    },
    font3: {
        fontSize: ScreenUtil.setSpFont(12),
        color: Theme.black,
        fontWeight: '500',
        marginLeft: ScreenUtil.scaleSizeW(30),
    },
    font4: {
        fontSize: ScreenUtil.setSpFont(10),
        color: Theme.color_1,
    },
    font5: {
        fontSize: ScreenUtil.setSpFont(12),
        color: Theme.themeColor,
        paddingRight: ScreenUtil.scaleSizeH(5),
        fontWeight: '500',
    },
    themeSquare: {
        width: ScreenUtil.scaleSizeW(30),
        height: ScreenUtil.scaleSizeW(30),
        marginRight: ScreenUtil.scaleSizeW(10)
    },



    modalView: {
        flex: 1,
        backgroundColor:Theme.blackTransparent,
    },
    modalView1: {
        width: deviceWidth,
        backgroundColor: Theme.white,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    cardView: {
        width: deviceWidth / 3 - 10,
        height: deviceWidth / 3 - 10,
        margin: 2,
    },
});
