/**
 * @author bingPo
 * @date 2020-04-04 09:38
 * @name: WebView
 * @description：WebView
 */
import React, {Component} from 'react';
import {
    View,
    Image,
    StatusBar,
    Text,
    StyleSheet,
    TouchableHighlight,
    ScrollView,
    Share,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ScreenUtil, {deviceHeight, deviceWidth} from '../../component/ScreenUtil';
import Theme from '../../component/Theme';
import Style from '../../css/Style';
import Message from '../../component/Message';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {goBackPage} from '../../redux/action/NavigationAction';
import {
    CollectArticle,
    CollectArticleDelete,
    HomeStateChange,
    CollectNet,
    CollectNetDelete,
} from '../../redux/action/home/HomeAction';
import Util from '../../component/Util';
import * as TypeId from '../../component/TypeId';

class WebViewPage extends Component {
    constructor() {
        super();
        this.state = {
            webData: '',
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
    collect(item) {
        const {webData} = this.props.home;
        const {userId} = this.props.login;
        // console.log('item', item);
        if (Util.checkIsEmptyString(userId)) {  //没有登录跳转登录
            this.props.goLogin();
            return;
        }
        this.props.HomeStateChange({
            collectId: item.id,
        });

        if (item.type == TypeId.NET) {  //网址
            this.props.HomeStateChange({
                collectId: item.id,
                collectName: item.author ? item.author : item.shareUser ? item.shareUser : item.name,
                collectLink: item.link ? item.link : item.url,
            });
            if (item.collect) { //已收藏取消收藏
                //设置页面取消收藏渲染
                let tempList = webData;
                tempList.collect = false;
                this.props.HomeStateChange({
                    webData: tempList,
                });
                this.props.CollectNetDelete();
            } else {
                //设置页面收藏渲染
                let tempList = webData;
                tempList.collect = true;
                this.props.HomeStateChange({
                    webData: tempList,
                });
                this.props.CollectNet();
            }
        } else if (item.type == TypeId.ARTICLE) {  //文章
            if (item.collect) { //已收藏取消收藏
                //设置页面取消收藏渲染
                let tempList = webData;
                tempList.collect = false;
                this.props.HomeStateChange({
                    webData: tempList,
                });
                this.props.CollectArticleDelete();
            } else {
                //设置页面收藏渲染
                let tempList = webData;
                tempList.collect = true;
                this.props.HomeStateChange({
                    webData: tempList,
                });
                this.props.CollectArticle();
            }
        }


    }

    //分享
    share(webData) {

        let url = webData.url ? webData.url : webData.link;
        Share.share({
            message: webData.title,
            url: url,
            title: webData.title,
        }, {
            dialogTitle: 'Share React Native website',
            excludedActivityTypes: [
                'com.apple.UIKit.activity.PostToTwitter',
            ],
            tintColor: 'green',
        });
    }

    other() {

    }

    /**
     * 页面渲染
     */
    //顶部导航渲染
    _nav() {
        const {webData} = this.props.home;
        const {themeColor} = this.props.theme;
        let title = '';
        if (webData) {
            title = Util.filterHTMLTag(webData.title);
        }
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
                            <Text style={Style.barTitle}>{' '}
                                {
                                    title.length > 15 ?
                                        title.slice(0, 15) + '..'
                                        : title
                                }
                            </Text>
                        </View>
                    </TouchableHighlight>
                    <View style={Style.rowCenterCenter}>
                        <TouchableHighlight
                            underlayColor={'transparent'}
                            onPress={() => this.collect(webData)}>
                            <AntDesign name={webData.collect ? 'heart' : 'hearto'}
                                       color={webData.collect ? Theme.color_2 : Theme.white}
                                       size={ScreenUtil.setSpFont(20)}
                                       style={{paddingRight: ScreenUtil.scaleSizeW(30)}}/>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor={'transparent'}
                            onPress={() => this.share(webData)}>
                            <Entypo name={'share'} color={Theme.white} size={ScreenUtil.setSpFont(20)}
                                    style={{paddingRight: ScreenUtil.scaleSizeW(15)}}/>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }

    //网页显示
    _webView() {
        const {webData} = this.props.home;
        // console.log('webData', webData);
        let url = webData.url ? webData.url : webData.link;
        return (
            <View style={styles.webView}>
                <WebView

                    automaticallyAdjustContentInsets={true}  //设置是否自动调整内容
                    startInLoadingState={true}  //是否开启页面加载的状态
                    source={{uri: url}}
                    // source={{url: 'https://mp.weixin.qq.com/s/8oYLKPpPPh3Fw2oFa2Kq9Q'}}
                />
            </View>
        );
    }

    render() {
        return (
            <View style={styles.contains}>
                {this._nav()}
                {this._webView()}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        nav: state.nav,
        home: state.home,
        login: state.login,
        theme: state.theme
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        goBackPage,
        CollectArticle,
        CollectArticleDelete,
        HomeStateChange,
        CollectNet,
        CollectNetDelete,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WebViewPage);

const styles = StyleSheet.create({
    contains: {
        flex: 1,
        backgroundColor: Theme.white,
    },
    webView: {
        width: deviceWidth,
        height: deviceHeight,
    },
});
