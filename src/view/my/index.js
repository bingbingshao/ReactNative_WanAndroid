/**
 * @author bingPo
 * @date 2020-04-04 09:39
 * @name: index
 * @description：index
 */
import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    StatusBar,
    TouchableHighlight,
    ScrollView,
    RefreshControl,
    FlatList,
    DeviceEventEmitter,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Theme from '../../component/Theme';
import Style from '../../css/Style';
import Message from '../../component/Message';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import ScreenUtil, {deviceWidth} from '../../component/ScreenUtil';
import {
    goMyArticle,
    goMyCollect,
    goMyIntegral,
    goMyJoinUs,
    goMyOpenSourceNet,
    goMySetting,
    goMyWaitToDo,
    goLogin,
    goWebView,
} from '../../redux/action/NavigationAction';
import Util from '../../component/Util';
import * as TypeId from '../../component/TypeId';
import {MyStateChange, MyInformation} from '../../redux/action/my/MyAction.js';
import Loading from '../../component/Loading';
import {HomeStateChange} from '../../redux/action/home/HomeAction';

class index extends Component {
    constructor() {
        super();
        this.state = {};
    }

    //渲染前调用
    componentWillMount() {
        const {userId} = this.props.login;
        if (!Util.checkIsEmptyString(userId)) {  // 已经登录
            this._onRefresh();
        }
    }

    //渲染后调用
    componentDidMount() {
        this.listener = DeviceEventEmitter.addListener(TypeId.LOGIN_SUCCESS, (param) => {
            this._onRefresh();
        });
    }

    //卸载前调用
    componentWillUnmount() {
        this.listener.remove();
    }

    /**
     * 方法处理
     */
    //页面跳转
    jumpPage(type) {
        const isLogin = true;
        if (isLogin) {  //已经登录
            switch (type) {
                case 'integral':  //积分页面
                    this.props.goMyIntegral();
                    break;
                case 'collect':  //收藏页面
                    this.props.goMyCollect();
                    break;
                case 'article':  //文章页面
                    this.props.goMyArticle();
                    break;
                case 'wait':  //代办页面
                    this.props.goMyWaitToDo();
                    break;
                // case 'open':  //开源网站页面
                //     this.props.goMyOpenSourceNet();
                //     break;
                case 'join':  //加入我们页面
                    this.props.goMyJoinUs();
                    break;
            }
        } else {  //未登录
            this.props.goLogin();
        }

    }

    jumpOpen() {
        let data = {
            title: '玩Android网站',
            url: 'https://www.wanandroid.com/index',
        };
        this.props.HomeStateChange({
            webData: data,
        });
        this.props.goWebView();
    }

    //数据数据刷新
    _onRefresh() {
        this.props.MyInformation();
    }

    /**
     * 页面渲染
     */
    //顶部导航渲染
    _nav() {
        const {userId, userName} = this.props.login;
        const {range} = this.props.my;
        const {themeColor} = this.props.theme;
        return (
            <View>
                <StatusBar barStyle={'light-content'} translucent={true} backgroundColor={themeColor}/>
                <View style={[styles.navView, {position: 'relative', backgroundColor: themeColor}]}>
                    <View style={[styles.navHead, Style.rowStartCenter]}>
                        <Image style={styles.image} source={require('../../image/login/head.jpg')}/>
                        {
                            Util.checkIsEmptyString(userId) ?
                                <TouchableHighlight
                                    underlayColor={'transparent'}
                                    onPress={() => this.props.goLogin()}>
                                    <View style={[Style.columnAround, styles.headView]}>
                                        <Text style={styles.font1}>{Message.LOGIN_TIP}</Text>
                                        <Text style={styles.font2}>
                                            {Message.MY_ID}{'--'}
                                            {'     '}
                                            {Message.MY_RANG}{'--'}
                                        </Text>
                                    </View>
                                </TouchableHighlight>
                                :
                                <View style={[Style.columnAround, styles.headView]}>
                                    <Text style={styles.font1}>{userName}</Text>
                                    <Text style={styles.font2}>
                                        {Message.MY_ID}{userId}
                                        {'     '}
                                        {Message.MY_RANG}{range}
                                    </Text>
                                </View>
                        }

                    </View>
                    <View style={{
                        position: 'absolute',
                        bottom: 0,
                        width: deviceWidth,
                        backgroundColor: '#fff',
                        height: ScreenUtil.scaleSizeH(40),
                        borderTopLeftRadius: ScreenUtil.scaleSizeH(50),
                        borderTopRightRadius: ScreenUtil.scaleSizeH(50),
                    }}>

                    </View>
                </View>
            </View>
        );
    }

    //我的页面数据列 渲染
    _listView() {
        const {grade} = this.props.my;
        return (
            <View style={styles.listView}>
                <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={() => this.jumpPage('integral')}>
                    <View style={[Style.rowBetweenCenter, styles.listView1]}>
                        <View style={[Style.rowCenterCenter]}>
                            <Feather name={'database'} color={Theme.themeColor} size={ScreenUtil.setSpFont(18)}/>
                            <Text style={styles.font3}>{Message.MY_INTEGRAL}</Text>
                        </View>
                        <View style={[Style.rowCenterCenter]}>
                            <Text style={styles.font4}>{Message.MY_INTEGRAL_NOW}</Text>
                            <Text style={styles.font5}>{grade}</Text>
                            <AntDesign name={'right'} color={Theme.black} size={ScreenUtil.setSpFont(14)}/>
                        </View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={() => this.jumpPage('collect')}>
                    <View style={[Style.rowBetweenCenter, styles.listView1]}>
                        <View style={[Style.rowCenterCenter]}>
                            <FontAwesome name={'star'} color={Theme.color_2} size={ScreenUtil.setSpFont(18)}/>
                            <Text style={styles.font3}>{Message.MY_COLLECT}</Text>
                        </View>
                        <View style={[Style.rowCenterCenter]}>
                            <Text style={styles.font4}>{''}</Text>
                            <Text style={styles.font5}>{''}</Text>
                            <AntDesign name={'right'} color={Theme.black} size={ScreenUtil.setSpFont(14)}/>
                        </View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={() => this.jumpPage('article')}>
                    <View style={[Style.rowBetweenCenter, styles.listView1]}>
                        <View style={[Style.rowCenterCenter]}>
                            <Entypo name={'open-book'} color={Theme.color_5} size={ScreenUtil.setSpFont(18)}/>
                            <Text style={styles.font3}>{Message.MY_ARTICLE}</Text>
                        </View>
                        <View style={[Style.rowCenterCenter]}>
                            <Text style={styles.font4}>{''}</Text>
                            <Text style={styles.font5}>{''}</Text>
                            <AntDesign name={'right'} color={Theme.black} size={ScreenUtil.setSpFont(14)}/>
                        </View>
                    </View>
                </TouchableHighlight>
                {/*<TouchableHighlight*/}
                {/*underlayColor={'transparent'}*/}
                {/*onPress={() => this.jumpPage('wait')}>*/}
                {/*<View style={[Style.rowBetweenCenter, styles.listView1]}>*/}
                {/*<View style={[Style.rowCenterCenter]}>*/}
                {/*<AntDesign name={'filetext1'} color={Theme.color_6} size={ScreenUtil.setSpFont(18)}/>*/}
                {/*<Text style={styles.font3}>{Message.MY_WAIT_TO_DO}</Text>*/}
                {/*</View>*/}
                {/*<View style={[Style.rowCenterCenter]}>*/}
                {/*<Text style={styles.font4}>{''}</Text>*/}
                {/*<Text style={styles.font5}>{''}</Text>*/}
                {/*<AntDesign name={'right'} color={Theme.black} size={ScreenUtil.setSpFont(14)}/>*/}
                {/*</View>*/}
                {/*</View>*/}
                {/*</TouchableHighlight>*/}
                <View style={styles.blankView}/>
                <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={() => this.jumpOpen('open')}>
                    <View style={[Style.rowBetweenCenter, styles.listView1]}>
                        <View style={[Style.rowCenterCenter]}>
                            <Ionicons name={'ios-globe'} color={Theme.color_4} size={ScreenUtil.setSpFont(18)}/>
                            <Text style={styles.font3}>{Message.MY_OPEN_SOURCE_NET}</Text>
                        </View>
                        <View style={[Style.rowCenterCenter]}>
                            <Text style={styles.font4}>{''}</Text>
                            <Text style={styles.font5}>{''}</Text>
                            <AntDesign name={'right'} color={Theme.black} size={ScreenUtil.setSpFont(14)}/>
                        </View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={() => this.jumpPage('join')}>
                    <View style={[Style.rowBetweenCenter, styles.listView1]}>
                        <View style={[Style.rowCenterCenter]}>
                            <FontAwesome name={'hand-grab-o'} color={Theme.color_7} size={ScreenUtil.setSpFont(18)}/>
                            <Text style={styles.font3}>{Message.MY_JOIN_US}</Text>
                        </View>
                        <View style={[Style.rowCenterCenter]}>
                            <Text style={styles.font4}>{''}</Text>
                            <Text style={styles.font5}>{''}</Text>
                            <AntDesign name={'right'} color={Theme.black} size={ScreenUtil.setSpFont(14)}/>
                        </View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={() => this.props.goMySetting()}>
                    <View style={[Style.rowBetweenCenter, styles.listView1]}>
                        <View style={[Style.rowCenterCenter]}>
                            <AntDesign name={'setting'} color={Theme.color_1} size={ScreenUtil.setSpFont(18)}/>
                            <Text style={styles.font3}>{Message.MY_SETTING}</Text>
                        </View>
                        <View style={[Style.rowCenterCenter]}>
                            <Text style={styles.font4}>{''}</Text>
                            <Text style={styles.font5}>{''}</Text>
                            <AntDesign name={'right'} color={Theme.black} size={ScreenUtil.setSpFont(14)}/>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.contains}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            title={'Loading'}
                            colors={[Theme.themeColor]}
                            refreshing={false}
                            onRefresh={() => {
                                this._onRefresh();
                            }}
                        />
                    }
                >
                    <View style={styles.contains}>
                        {this._nav()}
                        {this._listView()}
                    </View>
                </ScrollView>
                <Loading isShow={this.props.my.isLoading}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        nav: state.nav,
        login: state.login,
        my: state.my,
        theme: state.theme,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        goMyArticle,
        goMyCollect,
        goMyIntegral,
        goMyJoinUs,
        goMyOpenSourceNet,
        goMySetting,
        goMyWaitToDo,
        goLogin,
        goWebView,
        MyStateChange,
        MyInformation,
        HomeStateChange,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(index);

const styles = StyleSheet.create({
    contains: {
        position: 'relative',
        backgroundColor: Theme.white,
        flex: 1,
    },
    navView: {
        width: deviceWidth,
        height: deviceWidth * 3 / 5,
        backgroundColor: Theme.themeColor,
    },
    navHead: {
        marginTop: ScreenUtil.scaleSizeH(140),
        marginLeft: ScreenUtil.scaleSizeW(50),
    },
    image: {
        width: ScreenUtil.scaleSizeW(140),
        height: ScreenUtil.scaleSizeW(140),
        borderRadius: ScreenUtil.scaleSizeW(70),
    },
    headView: {
        height: ScreenUtil.scaleSizeW(100),
        marginLeft: ScreenUtil.scaleSizeW(30),
    },
    font1: {
        fontSize: ScreenUtil.setSpFont(14),
        color: Theme.white,
        fontWeight: '600',
    },
    font2: {
        fontSize: ScreenUtil.setSpFont(10),
        color: Theme.white,
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
    listView: {
        // position: 'absolute',
        // top: deviceWidth * 3 / 5 - ScreenUtil.scaleSizeH(30),
        // left:0,
        backgroundColor: Theme.white,
        borderRadius: ScreenUtil.scaleSizeH(30),
        // paddingTop: ScreenUtil.scaleSizeH(20),
        width: deviceWidth,
    },
    listView1: {
        marginTop: ScreenUtil.scaleSizeH(40),
        paddingLeft: ScreenUtil.scaleSizeW(20),
        paddingRight: ScreenUtil.scaleSizeW(20),
    },
    blankView: {
        width: deviceWidth,
        height: ScreenUtil.scaleSizeH(10),
        backgroundColor: Theme.color_3,
        marginTop: ScreenUtil.scaleSizeH(30),
    },
});
