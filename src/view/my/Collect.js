/**
 * @author bingPo
 * @date 2020-04-04 18:56
 * @name: Collect
 * @description：Collect
 */
import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet, StatusBar, TouchableHighlight, FlatList, RefreshControl,
    ScrollView,
} from 'react-native';
import Theme from '../../component/Theme';
import Style from '../../css/Style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ScreenUtil, {deviceWidth} from '../../component/ScreenUtil';
import Message from '../../component/Message';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {goBackPage, goWebView} from '../../redux/action/NavigationAction';
import {MyStateChange, MyCollectArticle, MyCollectNet} from '../../redux/action/my/MyAction';
import Loading from '../../component/Loading';
import {Card} from 'react-native-shadow-cards';
import Util from '../../component/Util';
import {
    CollectArticle,
    CollectArticleDelete,
    CollectNet,
    CollectNetDelete,
    HomeStateChange,
} from '../../redux/action/home/HomeAction';

class Collect extends Component {
    constructor() {
        super();
        this.state = {
            menuList: [
                {id: 'article', name: '文章'},
                {id: 'net', name: '网址'},
            ],
            menuSelectedId: 'article',
        };
    }

    //渲染前调用
    componentWillMount() {
        const {menuSelectedId} = this.state;
        this.start(menuSelectedId);
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
    start(type) {
        if (type == 'article') {
            this._onRefresh();
        } else {
            this.props.MyCollectNet();
        }

    }

    //选择子菜单
    selectMenu(data) {
        this.setState({
            menuSelectedId: data.id,
        });
        this.start(data.id);
    }


    //收藏文章
    collect(item) {
        const {collectList} = this.props.my;
        const {userId} = this.props.login;
        if (Util.checkIsEmptyString(userId)) {  //没有登录跳转登录
            this.props.goLogin();
            return;
        }
        this.props.HomeStateChange({
            collectId: item.id,
        });
        if (item.collect || item.collect == undefined) { //已收藏取消收藏
            //设置页面取消收藏渲染
            let tempList = collectList;
            tempList.map((data) => {
                if (data.id == item.id) {
                    data.collect = false;
                }
            });
            this.props.MyStateChange({
                collectList: tempList,
            });
            this.props.CollectArticleDelete();
        } else {
            //设置页面收藏渲染
            let tempList = collectList;
            tempList.map((data) => {
                if (data.id == item.id) {
                    data.collect = true;
                }
            });
            this.props.MyStateChange({
                collectList: tempList,
            });
            this.props.CollectArticle();
        }
    }

    collectNet(item) {
        const {collectNetList} = this.props.my;
        const {userId} = this.props.login;
        if (Util.checkIsEmptyString(userId)) {  //没有登录跳转登录
            this.props.goLogin();
            return;
        }
        this.props.HomeStateChange({
            collectId: item.id,
            collectName: item.author ? item.author : item.shareUser ? item.shareUser : item.name,
            collectLink: item.link ? item.link : item.url,
        });
        if (item.collect || item.collect == undefined) { //已收藏取消收藏
            //设置页面取消收藏渲染
            let tempList = collectNetList;
            tempList.map((data) => {
                if (data.id == item.id) {
                    data.collect = false;
                }
            });
            this.props.MyStateChange({
                collectNetList: tempList,
            });
            this.props.CollectNetDelete();
        } else {
            //设置页面收藏渲染
            let tempList = collectNetList;
            tempList.map((data) => {
                if (data.id == item.id) {
                    data.collect = true;
                }
            });
            this.props.MyStateChange({
                collectNetList: tempList,
            });
            this.props.CollectNet();
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
        const {menuList, menuSelectedId} = this.state;

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
                        </View>
                    </TouchableHighlight>
                    <View style={Style.rowCenterCenter}>
                        {
                            menuList.map((data, i) => {
                                if (menuSelectedId == data.id) {
                                    return (
                                        <View style={[Style.navView, Style.columnCenterCenter]}>
                                            <Text style={Style.font1}>{data.name}</Text>
                                            <View style={Style.navLine}/>
                                        </View>
                                    );
                                } else {
                                    return (
                                        <TouchableHighlight
                                            underlayColor={'transparent'}
                                            onPress={() => this.selectMenu(data)}>
                                            <View style={[Style.navView, Style.columnCenterCenter]}>
                                                <Text style={Style.font2}>{data.name}</Text>
                                                <View style={Style.navLine1}/>
                                            </View>
                                        </TouchableHighlight>
                                    );
                                }
                            })
                        }
                    </View>
                    <View/>
                </View>
            </View>
        );
    }

    //数据列表
    _list() {
        const {collectList} = this.props.my;
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                data={collectList}
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
        let title = Util.filterHTMLTag(item.title);
        let content = Util.filterHTMLTag(item.desc);
        title = title ?
            title.length > 35 ? title.slice(0, 35) + '..' : title : '';
        content = content ?
            title.length < 16 ?
                content.length > 70 ?
                    content.slice(0, 70) + '..'
                    : content
                : content.length > 55 ? content.slice(0, 55) + '..' : content : '';

        return (
            <View style={[styles.itemView, Style.rowCenterCenter]}>
                <TouchableHighlight
                    underLayColor={'transparent'}
                    onPress={() => this.jumpWeb(item)}
                >
                    <Card
                        cornerRadius={0}
                        opacity={0.2}
                        style={[styles.itemView1]}>
                        <View style={[Style.rowBetweenCenter, styles.itemView2]}>
                            <View style={Style.rowStartCenter}>
                                <Text style={styles.font1}>
                                    {
                                        item.author ?
                                            item.author :
                                            item.shareUser ?
                                                item.shareUser : '匿名用户'
                                    }
                                </Text>
                            </View>
                            <Text style={styles.font1_1}>
                                {item.niceDate ? item.niceDate : ''}
                            </Text>
                        </View>
                        {
                            Util.checkIsEmptyString(item.envelopePic) ?
                                <Text style={styles.titleFont}>
                                    {title}
                                </Text>
                                :
                                <View style={[Style.rowStartCenter, {
                                    marginTop: ScreenUtil.scaleSizeH(10),
                                    marginBottom: ScreenUtil.scaleSizeH(10),
                                }]}>
                                    <Image style={styles.itemImage} source={{uri: item.envelopePic}}/>
                                    <View style={styles.itemView3}>
                                        <Text style={styles.titleFont}>
                                            {title}
                                        </Text>
                                        <Text style={styles.titleFont1}>
                                            {content}
                                        </Text>
                                    </View>
                                </View>

                        }
                        <View style={[Style.rowBetweenCenter, styles.itemView2]}>
                            <Text style={styles.font1_1}>
                                {item.superChapterName ? item.superChapterName + '·' : ''}
                                {item.chapterName ? item.chapterName : ''}
                            </Text>
                            <TouchableHighlight
                                underlayColor={'transparent'}
                                onPress={() => this.collect(item)}>
                                <AntDesign
                                    name={
                                        item.collect == undefined ?
                                            'heart' :
                                            item.collect ?
                                                'heart' : 'hearto'
                                    }
                                    size={ScreenUtil.setSpFont(18)} color={Theme.color_2}/>
                            </TouchableHighlight>
                        </View>

                    </Card>
                </TouchableHighlight>
            </View>
        );
    }

    /**
     * 创建尾部布局
     */
    _createListFooter = () => {
        const {font3} = this.props.my;
        return (
            <View style={Style.footerView}>
                <Text style={Style.footerFont}>
                    {font3 === 0 ? '' : font3 === 1 ? '正在加载更多数据...' : '没有更多数据了'}
                </Text>
            </View>
        );
    };
    /**
     * 下啦刷新
     * @private
     */
    _onRefresh = () => {
        this.props.MyStateChange({
            page3: 0,
            font3: 0,
            isRefresh3: true,
            // collectList: [],
        });
        this.props.MyCollectArticle();
        // this.props.MyIntegralHistory();
    };

    /**
     * 加载更多
     * @private
     */
    _onLoadMore() {
        const {font3, page3} = this.props.my;
        if (font3 !== 2) {
            this.props.MyStateChange({
                page3: page3 + 1,
                font3: 1,
            });
            this.props.MyCollectArticle();
            // this.props.MyIntegralHistory();
        }
    }


    _listNet() {

        const {collectNetList} = this.props.my;
        console.log('collectNetList', collectNetList);
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        title={'Loading'}
                        colors={[Theme.themeColor]}
                        refreshing={false}
                        onRefresh={() => {
                            this.props.MyCollectNet();
                        }}
                    />
                }>
                <View>
                    {
                        collectNetList.map((data, i) => {
                            return (
                                <View style={[styles.itemView, Style.rowCenterCenter]}>
                                    <TouchableHighlight
                                        underLayColor={'transparent'}
                                        onPress={() => this.jumpWeb(item)}
                                    >
                                        <Card
                                            cornerRadius={0}
                                            opacity={0.2}
                                            style={[styles.itemView1, Style.rowBetweenCenter]}>
                                            <View>
                                                <Text style={styles.font2}>{data.name ? data.name : '匿名用户'}</Text>
                                                <Text style={[styles.font1, {marginTop: ScreenUtil.scaleSizeH(10)}]}>
                                                    {
                                                        data.link ?
                                                            data.link.length > 40 ?
                                                                data.link.slice(0, 40) + '..' : data.link : ''
                                                    }
                                                </Text>
                                            </View>
                                            <TouchableHighlight
                                                underlayColor={'transparent'}
                                                onPress={() => this.collectNet(data)}>
                                                <AntDesign
                                                    name={
                                                        data.collect == undefined ?
                                                            'heart' :
                                                            data.collect ?
                                                                'heart' : 'hearto'
                                                    }
                                                    size={ScreenUtil.setSpFont(18)} color={Theme.color_2}/>
                                            </TouchableHighlight>
                                        </Card>
                                    </TouchableHighlight>
                                </View>
                            );
                        })
                    }
                    <View style={Style.footerView}>
                        <Text style={Style.footerFont}>
                            {'没有更多数据了'}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        );
    }

    render() {
        const {menuSelectedId} = this.state;
        return (
            <View styl={styles.contains}>
                {this._nav()}
                {
                    menuSelectedId == 'article' ?
                        this._list()
                        :
                        this._listNet()
                }
                <Loading isShow={this.props.my.isLoading}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        nav: state.nav,
        my: state.my,
        login: state.login,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        goBackPage,
        goWebView,
        MyStateChange,
        MyCollectArticle,
        MyCollectNet,
        CollectArticle,
        CollectArticleDelete,
        HomeStateChange,
        CollectNet,
        CollectNetDelete,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Collect);

const styles = StyleSheet.create({
    contains: {
        flex: 1,
        backgroundColor: Theme.white,
    },
    itemView: {
        marginTop: ScreenUtil.scaleSizeH(15),
    },
    itemView1: {
        width: deviceWidth - ScreenUtil.scaleSizeW(20),
        // height: ScreenUtil.scaleSizeH(180),
        backgroundColor: Theme.white,
        borderRadius: ScreenUtil.scaleSizeW(5),
        padding: ScreenUtil.scaleSizeW(20),
        borderWidth: ScreenUtil.pixelRatio(1),
        borderColor: Theme.color_8,
    },
    itemView2: {
        width: deviceWidth - ScreenUtil.scaleSizeW(60),
    },
    itemView3: {
        width: deviceWidth - ScreenUtil.scaleSizeW(260),
        paddingLeft: ScreenUtil.scaleSizeW(10),
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
    titleFont: {
        marginTop: ScreenUtil.scaleSizeH(10),
        marginBottom: ScreenUtil.scaleSizeH(10),
        color: Theme.black,
        fontSize: ScreenUtil.setSpFont(13),
        fontWeight: '400',
        lineHeight: ScreenUtil.scaleSizeH(26),
    },
    titleFont1: {
        marginTop: ScreenUtil.scaleSizeW(10),
        color: Theme.color_1,
        fontSize: ScreenUtil.setSpFont(11),
        lineHeight: ScreenUtil.scaleSizeH(22),
    },
    itemImage: {
        width: ScreenUtil.scaleSizeW(200),
        height: ScreenUtil.scaleSizeW(200),
    },
});
