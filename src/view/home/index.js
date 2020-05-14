/**
 * @author bingPo
 * @date 2020-04-04 09:38
 * @name: index
 * @description：index
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
    FlatList,
    RefreshControl, DeviceEventEmitter,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ScreenUtil from '../../component/ScreenUtil';
import Theme from '../../component/Theme';
import Style from '../../css/Style';
import Message from '../../component/Message';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {goSearch, goWebView, goLogin} from '../../redux/action/NavigationAction';
import {
    HomeStateChange,
    HomeArticle,
    HomeBanner,
    CollectArticle,
    CollectArticleDelete, CollectNet, CollectNetDelete,
} from '../../redux/action/home/HomeAction';
import {LoginStateChange} from '../../redux/action/login/LoginAction';
import Loading from '../../component/Loading';
import Swiper from 'react-native-swiper';
import {deviceWidth, bannerHeight,IsIOS} from '../../component/ScreenUtil';
import {BoxShadow} from 'react-native-shadow';
import Store from 'react-native-simple-store';
import Util from '../../component/Util';
import * as TypeId from '../../component/TypeId';

class index extends Component {
    constructor() {
        super();
        this.state = {};
    }

    //渲染前调用
    componentWillMount() {
        this.props.HomeBanner();
        this._onRefresh();
    }

    //渲染后调用
    componentDidMount() {
        let that = this;
        //获取登录信息
        Store.get(TypeId.USER_ID)
            .then((res) => {
                if (!Util.checkIsEmptyString(res)) {
                    that.props.LoginStateChange({
                        userId: res,
                    });
                }
            })
            .catch((e) => console.log(e));
        Store.get(TypeId.USER_NAME)
            .then((res) => {
                if (!Util.checkIsEmptyString(res)) {
                    that.props.LoginStateChange({
                        userName: res,
                    });
                }
            })
            .catch((e) => console.log(e));
        Store.get(TypeId.USER_PASSWORD)
            .then((res) => {
                if (!Util.checkIsEmptyString(res)) {
                    that.props.LoginStateChange({
                        userPassword: res,
                    });
                }
            })
            .catch((e) => console.log(e));

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
    search() {
        this.props.goSearch();
    }

    //点击搜索
    bannerClick(data) {
        this.props.HomeStateChange({
            webData: data,
        });
        this.props.goWebView();
    }

    //收藏文章
    collect(item) {
        const {articleList} = this.props.home;
        const {userId} = this.props.login;
        // console.log('item', item);
        if (Util.checkIsEmptyString(userId)) {  //没有登录跳转登录
            this.props.goLogin();
            return;
        }

        this.props.HomeStateChange({
            collectId: item.id,
            collectName: item.author ? item.author : item.shareUser ? item.shareUser : item.name,
            collectLink: item.link ? item.link : item.url,
        });
        if (item.type == TypeId.NET) {  //网址
            if (item.collect) { //已收藏取消收藏
                //设置页面取消收藏渲染
                let tempList = articleList;
                tempList.map((data) => {
                    if (data.id == item.id) {
                        data.collect = false;
                    }
                });
                this.props.HomeStateChange({
                    articleList: tempList,
                });
                this.props.CollectNetDelete();
            } else {
                //设置页面收藏渲染
                let tempList = articleList;
                tempList.map((data) => {
                    if (data.id == item.id) {
                        data.collect = true;
                    }
                });
                this.props.HomeStateChange({
                    articleList: tempList,
                });
                this.props.CollectNet();
            }
        } else if (item.type == TypeId.ARTICLE) {  //文章
            if (item.collect) { //已收藏取消收藏
                //设置页面取消收藏渲染
                let tempList = articleList;
                tempList.map((data) => {
                    if (data.id == item.id) {
                        data.collect = false;
                    }
                });
                this.props.HomeStateChange({
                    articleList: tempList,
                });
                this.props.CollectArticleDelete();
            } else {
                //设置页面收藏渲染
                let tempList = articleList;
                tempList.map((data) => {
                    if (data.id == item.id) {
                        data.collect = true;
                    }
                });
                this.props.HomeStateChange({
                    articleList: tempList,
                });
                this.props.CollectArticle();
            }
        }
    }

    //跳转详情页面
    jumpWeb(data) {
        this.props.HomeStateChange({
            webData: data,
        });
        this.props.goWebView();
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
                    <Text style={Style.barTitle}>{Message.HOME}</Text>
                    <TouchableHighlight
                        underlayColor={'transparent'}
                        onPress={() => this.search()}>
                        <AntDesign name={'search1'} color={Theme.white}
                                   size={ScreenUtil.setSpFont(20)} style={Style.barIcon}/>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

    //轮播图
    _banner() {
        const {bannerList} = this.props.home;
        return (
            <View style={styles.bannerContain}>
                {
                    bannerList.length > 0 ?
                        <View style={[styles.bannerView, Style.rowCenterCenter, {height: bannerHeight}]}>
                            <Swiper
                                width={deviceWidth}
                                height={bannerHeight}
                                showsButtons={false}
                                removeClippedSubviews={false} //这个很主要啊，解决白屏问题
                                autoplay={true}
                                swipeEnabled={true}
                                horizontal={true}
                                showsPagination={true}
                                paginationStyle={styles.paginationStyle}
                                dotStyle={styles.dotStyle}
                                activeDotStyle={styles.activeDotStyle}
                            >
                                {
                                    bannerList.map((data) => {
                                        return (
                                            <TouchableHighlight
                                                underlayColor={'transparent'}
                                                onPress={() => this.bannerClick(data)}>
                                                <Image source={{uri: data.imagePath}}
                                                       style={[styles.bannerViewImage, {height: bannerHeight}]}/>
                                            </TouchableHighlight>
                                        );
                                    })
                                }
                            </Swiper>
                        </View>
                        :
                        <View style={[styles.bannerView, Style.rowCenterCenter, {height: bannerHeight}]}>
                            <Image
                                style={[styles.bannerViewImage, {height: bannerHeight}]}/>
                        </View>
                }
            </View>
        );
    }

    //数据列表
    _list() {
        const {articleList} = this.props.home;
        // console.log('articleList', articleList);
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                data={articleList}
                renderItem={({item}) => this._listItem(item)}
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
                ListHeaderComponent={this._banner()}
                refreshing={false}
                onEndReached={() => this._onLoadMore()}
                onEndReachedThreshold={0.1}
                //添加尾布局
                ListFooterComponent={this._createListFooter.bind(this)}
            />
        );
    }


    //数据展示
    _listItem(item) {
        const shadowOpt = {
            width: deviceWidth - ScreenUtil.scaleSizeW(20),
            height: ScreenUtil.scaleSizeH(180),
            color: Theme.shadowColor,
            border: ScreenUtil.scaleSizeW(1),
            radius: ScreenUtil.scaleSizeW(5),
            opacity: 0.2,
            x: 0,
            y: 2,
            style: {marginVertical: 0},
        };
        return (
            <View style={[styles.itemView, Style.rowCenterCenter]}>
                <TouchableHighlight
                    underLayColor={'transparent'}
                    onPress={() => this.jumpWeb(item)}
                >
                    <BoxShadow setting={shadowOpt}>
                        <View style={[styles.itemView1, Style.columnBetween]}>
                            <View style={[Style.rowBetweenCenter, styles.itemView2]}>
                                <View style={Style.rowStartCenter}>
                                    <Text style={styles.font1}>
                                        {
                                            item.author ?
                                                item.author :
                                                item.shareUser
                                        }
                                    </Text>
                                    {
                                        item.zhiding ?
                                            <View style={[styles.tagsView1, Style.rowCenterCenter]}>
                                                <Text style={styles.tagsFont1}>{'置顶'}</Text>
                                            </View>
                                            : null
                                    }
                                    {
                                        item.tags.map((data, i) => {
                                            if (i == 0) {
                                                return (
                                                    <View style={[styles.tagsView2, Style.rowCenterCenter]}>
                                                        <Text style={styles.tagsFont2}>{data.name}</Text>
                                                    </View>
                                                );
                                            }
                                        })
                                    }
                                </View>
                                <Text style={styles.font1_1}>
                                    {item.niceDate ? item.niceDate : ''}
                                </Text>
                            </View>
                            <Text style={styles.titleFont}>
                                {
                                    item.title ?
                                        item.title.length > 20 ? item.title.slice(0, 20) + '..' : item.title
                                        : ''
                                }
                            </Text>
                            <View style={[Style.rowBetweenCenter, styles.itemView2]}>
                                <Text style={styles.font1_1}>
                                    {item.superChapterName ? item.superChapterName + '·' : ''}
                                    {item.chapterName ? item.chapterName : ''}
                                </Text>
                                <TouchableHighlight
                                    underlayColor={'transparent'}
                                    onPress={() => this.collect(item)}>
                                    <AntDesign
                                        name={item.collect ? 'heart' : 'hearto'}
                                        size={ScreenUtil.setSpFont(18)} color={Theme.color_2}/>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </BoxShadow>
                </TouchableHighlight>
            </View>
        );
    }

    /**
     * 创建尾部布局
     */
    _createListFooter = () => {
        const {font} = this.props.home;
        return (
            <View style={Style.footerView}>
                <Text style={Style.footerFont}>
                    {font === 0 ? '' : font === 1 ? '正在加载更多数据...' : '没有更多数据了'}
                </Text>
            </View>
        );
    };
    /**
     * 下啦刷新
     * @private
     */
    _onRefresh = () => {
        this.props.HomeStateChange({
            page: 0,
            font: 0,
            isRefresh: true,
        });
        this.props.HomeArticle();
    };

    /**
     * 加载更多
     * @private
     */
    _onLoadMore() {
        const {font, page} = this.props.home;
        if (font !== 2) {
            this.props.HomeStateChange({
                page: page + 1,
            });
            this.props.HomeArticle();
        }
    }

    render() {
        return (
            <View style={styles.contains}>
                {this._nav()}
                {this._list()}
                <Loading isShow={this.props.home.isLoading}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        nav: state.nav,
        home: state.home,
        login: state.login,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        goSearch,
        goWebView,
        goLogin,
        HomeStateChange,
        LoginStateChange,
        HomeArticle,
        HomeBanner,
        CollectArticle,
        CollectArticleDelete,
        CollectNet,
        CollectNetDelete,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(index);

const styles = StyleSheet.create({
    contains: {
        flex: 1,
        backgroundColor: Theme.color_3,
    },
    bannerContain: {
        marginTop: -ScreenUtil.scaleSizeH(6),
        width: deviceWidth,
        height: bannerHeight,
    },
    bannerView: {
        width: deviceWidth,
    },
    bannerViewImage: {
        width: deviceWidth,
        backgroundColor: Theme.color_3,
    },
    paginationStyle: {
        bottom: ScreenUtil.scaleSizeW(6 * 2),
        right: ScreenUtil.scaleSizeW(10 * 2),
        // left: null,
    },
    dotStyle: {
        width: ScreenUtil.scaleSizeW(5 * 2),
        height: ScreenUtil.scaleSizeW(5 * 2),
        backgroundColor: Theme.themeColor,
        borderRadius: ScreenUtil.scaleSizeW(5),
        opacity: 0.7,
    },
    activeDotStyle: {
        width: ScreenUtil.scaleSizeW(15 * 2),
        height: ScreenUtil.scaleSizeW(5 * 2),
        backgroundColor: Theme.themeColor,
        borderRadius: ScreenUtil.scaleSizeW(5),
    },
    itemView: {
        marginTop: ScreenUtil.scaleSizeH(10),
    },
    itemView1: {
        width: deviceWidth - ScreenUtil.scaleSizeW(20),
        height: ScreenUtil.scaleSizeH(180),
        backgroundColor: Theme.white,
        borderRadius: ScreenUtil.scaleSizeW(5),
        padding: ScreenUtil.scaleSizeW(20),
        borderWidth: ScreenUtil.pixelRatio(1),
        borderColor: Theme.color_8,
    },
    itemView2: {
        width: deviceWidth - ScreenUtil.scaleSizeW(60),
    },
    font1: {
        color: Theme.color_9,
        fontSize: ScreenUtil.setSpFont(12),
        lineHeight: ScreenUtil.scaleSizeH(30),
    },
    font1_1: {
        color: Theme.color_9,
        fontSize: ScreenUtil.setSpFont(10),
        lineHeight: ScreenUtil.scaleSizeH(30),
    },
    tagsView1: {
        marginLeft: ScreenUtil.scaleSizeW(10),
        paddingRight: ScreenUtil.scaleSizeW(5),
        paddingLeft: ScreenUtil.scaleSizeW(5),
        height: ScreenUtil.scaleSizeH(20),
        borderRadius: ScreenUtil.scaleSizeW(2),
        borderWidth: ScreenUtil.pixelRatio(1),
        borderColor: Theme.red,
    },
    tagsView2: {
        marginLeft: ScreenUtil.scaleSizeW(10),
        paddingRight: ScreenUtil.scaleSizeW(5),
        paddingLeft: ScreenUtil.scaleSizeW(5),
        height: ScreenUtil.scaleSizeH(20),
        borderRadius: ScreenUtil.scaleSizeW(2),
        borderWidth: ScreenUtil.pixelRatio(1),
        borderColor: Theme.color_7,
    },
    tagsFont1: {
        color: Theme.red,
        fontSize: ScreenUtil.setSpFont(9),
    },
    tagsFont2: {
        color: Theme.color_7,
        fontSize: ScreenUtil.setSpFont(9),
    },
    titleFont: {
        color: Theme.black,
        fontSize: ScreenUtil.setSpFont(14),
        // fontWeight: '600',
        lineHeight: ScreenUtil.scaleSizeH(30),
    },
});
