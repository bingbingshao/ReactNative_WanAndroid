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
    StyleSheet, StatusBar, TouchableHighlight, FlatList, RefreshControl,
    ScrollView, DeviceEventEmitter,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Theme from '../../component/Theme';
import Style from '../../css/Style';
import Message from '../../component/Message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ScreenUtil, {deviceWidth} from '../../component/ScreenUtil';
import {SquareStateChange, SquareList, SquareNavigation, SquareSeries} from '../../redux/action/square/SquareAction';
import * as TypeId from '../../component/TypeId';
import Util from '../../component/Util';
import {BoxShadow} from 'react-native-shadow';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Loading from '../../component/Loading';
import {
    CollectArticle,
    CollectArticleDelete,
    CollectNet,
    CollectNetDelete,
    HomeStateChange,
} from '../../redux/action/home/HomeAction';
import {goWebView, goSquareSeriesDetails, goLogin, goPublishArticle} from '../../redux/action/NavigationAction';
import {Card} from 'react-native-shadow-cards';

class index extends Component {
    constructor() {
        super();
        this.state = {};
    }

    //渲染前调用
    componentWillMount() {
        const {menuSelectedId} = this.props.square;
        this.start(menuSelectedId);
    }

    //渲染后调用
    componentDidMount() {
        this.listener = DeviceEventEmitter.addListener(TypeId.LOGIN_SUCCESS, (param) => {
            const {menuSelectedId} = this.props.square;
            this.start(menuSelectedId);
        });
    }

    //卸载前调用
    componentWillUnmount() {
        this.listener.remove();
    }

    /**
     * 方法处理
     */
    start(id) {
        switch (id) {
            case TypeId.SQUARE:  //广场
                this._onRefresh();
                break;
            case TypeId.SERIES:  //体系
                this.props.SquareSeries();
                break;
            case TypeId.NAVIGATION:  //导航
                this.props.SquareNavigation();
                break;
        }
    }

    //选择子菜单
    selectMenu(data) {
        this.props.SquareStateChange({
            menuSelectedId: data.id,
        });
        this.start(data.id);
    }

    //点击加号
    addPlus() {
        const {userId} = this.props.login;
        if (Util.checkIsEmptyString(userId)) {
            this.props.goLogin();
            return;
        }
        this.props.goPublishArticle();
    }

    //收藏文章
    collect(item) {
        const {squareList} = this.props.square;
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
        if (item.type == TypeId.NET) {  //网址
            if (item.collect) { //已收藏取消收藏
                //设置页面取消收藏渲染
                let tempList = squareList;
                tempList.map((data) => {
                    if (data.id == item.id) {
                        data.collect = false;
                    }
                });
                this.props.SquareStateChange({
                    squareList: tempList,
                });
                this.props.CollectNetDelete();
            } else {
                //设置页面收藏渲染
                let tempList = squareList;
                tempList.map((data) => {
                    if (data.id == item.id) {
                        data.collect = true;
                    }
                });
                this.props.SquareStateChange({
                    squareList: tempList,
                });
                this.props.CollectNet();
            }
        } else if (item.type == TypeId.ARTICLE) {  //文章
            if (item.collect) { //已收藏取消收藏
                //设置页面取消收藏渲染
                let tempList = squareList;
                tempList.map((data) => {
                    if (data.id == item.id) {
                        data.collect = false;
                    }
                });
                this.props.SquareStateChange({
                    squareList: tempList,
                });
                this.props.CollectArticleDelete();
            } else {
                //设置页面收藏渲染
                let tempList = squareList;
                tempList.map((data) => {
                    if (data.id == item.id) {
                        data.collect = true;
                    }
                });
                this.props.SquareStateChange({
                    squareList: tempList,
                });
                this.props.CollectArticle();
            }
        }
        // console.log("item",item)


    }

    //跳转详情页面
    jumpWeb(data) {
        this.props.HomeStateChange({
            webData: data,
        });
        this.props.goWebView();
    }

    //跳转体系详情页面
    goSeriesDetails(data, id) {
        this.props.SquareStateChange({
            seriesMenuList: data,
            seriesMenuSelected: id,
        });
        this.props.goSquareSeriesDetails();
    }

    /**
     * 页面渲染
     */
    //顶部导航渲染
    _nav() {
        const {menuList, menuSelectedId} = this.props.square;
        const {themeColor} = this.props.theme;
        return (
            <View>
                <StatusBar barStyle={'light-content'} translucent={true} backgroundColor={themeColor}/>
                <View style={[Style.barView, Style.rowBetweenCenter,{backgroundColor:themeColor}]}>
                    <Text style={Style.barTitle1}>{Message.SQUARE}</Text>
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
                    <TouchableHighlight
                        underlayColor={'transparent'}
                        onPress={() => this.addPlus()}>
                        <Ionicons name={'ios-add'} color={Theme.white}
                                  size={ScreenUtil.setSpFont(28)} style={Style.barIcon}/>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }


    //广场
    _square() {
        const {squareList} = this.props.square;
        // console.log('articleList', articleList);
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                data={squareList}
                renderItem={({item}) => this._squareItem(item)}
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

    _squareItem(item) {
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
        let title = Util.filterHTMLTag(item.title);
        title = title ?
            title.length > 35 ? title.slice(0, 35) + '..' : title : '';
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
                                </View>
                                <Text style={styles.font1_1}>
                                    {item.niceDate ? item.niceDate : ''}
                                </Text>
                            </View>

                            <Text style={styles.titleFont}>
                                {title}
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
        const {font} = this.props.square;
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
        this.props.SquareStateChange({
            page: 1,
            font: 0,
            isRefresh: true,
            dataList: [],
        });
        this.props.SquareList();
    };

    /**
     * 加载更多
     * @private
     */
    _onLoadMore() {
        const {font, page} = this.props.square;
        if (font !== 2) {
            this.props.SquareStateChange({
                page: page + 1,
            });
            this.props.SquareList();
        }
    }

    //体系
    _series() {
        const {seriesList} = this.props.square;
        return (
            <ScrollView>
                <View style={Style.columnStartCenter}>
                    {
                        seriesList.map((data, i) => {
                            return (
                                <Card
                                    cornerRadius={0}
                                    opacity={0.2}
                                    style={styles.navigationView}>
                                    <Text style={styles.itemFont1}>{data.name}</Text>
                                    <View style={[Style.rowWarp]}>
                                        {
                                            data.children.map((info, i) => {
                                                let fontStyle = styles.itemFont2;
                                                let type = i % 7;
                                                switch (type) {
                                                    case 0:
                                                        fontStyle = styles.itemFont3;
                                                        break;
                                                    case 1:
                                                        fontStyle = styles.itemFont4;
                                                        break;
                                                    case 2:
                                                        fontStyle = styles.itemFont5;
                                                        break;
                                                    case 3:
                                                        fontStyle = styles.itemFont6;
                                                        break;
                                                    case 4:
                                                        fontStyle = styles.itemFont7;
                                                        break;
                                                    case 5:
                                                        fontStyle = styles.itemFont8;
                                                        break;
                                                    case 6:
                                                        fontStyle = styles.itemFont9;
                                                        break;
                                                    default:
                                                        break;
                                                }
                                                return (
                                                    <TouchableHighlight
                                                        underlayColor={'transparent'}
                                                        onPress={() => this.goSeriesDetails(data, info.id)}>
                                                        <View style={[Style.rowCenterCenter, styles.navigationView1]}>
                                                            <Text style={fontStyle}>{info.name}</Text>
                                                        </View>
                                                    </TouchableHighlight>
                                                );
                                            })
                                        }
                                    </View>
                                </Card>
                            );
                        })
                    }
                </View>
            </ScrollView>
        );
    }

    //导航
    _navigation() {
        const {navigationList} = this.props.square;
        return (
            <ScrollView>
                <View style={Style.columnStartCenter}>
                    {
                        navigationList.map((data, i) => {
                            return (
                                <Card
                                    cornerRadius={0}
                                    opacity={0.2}
                                    style={styles.navigationView}>
                                    <Text style={styles.itemFont1}>{data.name}</Text>
                                    <View style={[Style.rowWarp]}>
                                        {
                                            data.articles.map((info, i) => {
                                                let fontStyle = styles.itemFont2;
                                                let type = i % 7;
                                                switch (type) {
                                                    case 0:
                                                        fontStyle = styles.itemFont3;
                                                        break;
                                                    case 1:
                                                        fontStyle = styles.itemFont4;
                                                        break;
                                                    case 2:
                                                        fontStyle = styles.itemFont5;
                                                        break;
                                                    case 3:
                                                        fontStyle = styles.itemFont6;
                                                        break;
                                                    case 4:
                                                        fontStyle = styles.itemFont7;
                                                        break;
                                                    case 5:
                                                        fontStyle = styles.itemFont8;
                                                        break;
                                                    case 6:
                                                        fontStyle = styles.itemFont9;
                                                        break;
                                                    default:
                                                        break;
                                                }
                                                return (
                                                    <TouchableHighlight
                                                        underlayColor={'transparent'}
                                                        onPress={() => this.jumpWeb(info)}>
                                                        <View style={[Style.rowCenterCenter, styles.navigationView1]}>
                                                            <Text style={fontStyle}>{info.title}</Text>
                                                        </View>
                                                    </TouchableHighlight>
                                                );
                                            })
                                        }
                                    </View>
                                </Card>
                            );
                        })
                    }
                </View>
            </ScrollView>
        );
    }


    render() {
        const {menuSelectedId} = this.props.square;
        return (
            <View>
                {this._nav()}
                {
                    menuSelectedId == TypeId.SQUARE ? //广场
                        this._square()
                        : menuSelectedId == TypeId.SERIES ? //体系
                        this._series()
                        : menuSelectedId == TypeId.NAVIGATION ? //导航
                            this._navigation() : null
                }
                <Loading isShow={this.props.square.isLoading}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        nav: state.nav,
        square: state.square,
        login: state.login,
        theme: state.theme,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        goWebView,
        goLogin,
        goPublishArticle,
        goSquareSeriesDetails,
        SquareStateChange,
        SquareList,
        SquareNavigation,
        SquareSeries,
        CollectArticle,
        CollectArticleDelete,
        HomeStateChange,
        CollectNet,
        CollectNetDelete,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(index);

const styles = StyleSheet.create({
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

    navigationView: {
        width: deviceWidth - ScreenUtil.scaleSizeW(30),
        padding: ScreenUtil.scaleSizeW(25),
        borderRadius: ScreenUtil.scaleSizeW(5),
        backgroundColor: Theme.white,
        borderWidth: ScreenUtil.pixelRatio(1),
        borderColor: Theme.color_8,
        marginTop: ScreenUtil.scaleSizeH(15),
        elevation: 2,
    },
    navigationView1: {
        paddingLeft: ScreenUtil.scaleSizeW(8),
        paddingRight: ScreenUtil.scaleSizeW(8),
        height: ScreenUtil.scaleSizeH(40),
        backgroundColor: Theme.color_3,
        marginRight: ScreenUtil.scaleSizeW(25),
        marginTop: ScreenUtil.scaleSizeW(25),
    },
    itemFont1: {
        color: Theme.black,
        fontWeight: '400',
        fontSize: ScreenUtil.setSpFont(14),
    },
    itemFont2: {
        color: Theme.color_11,
        fontSize: ScreenUtil.setSpFont(12),
    },
    itemFont3: {
        color: Theme.color_6,
        fontSize: ScreenUtil.setSpFont(12),
    },
    itemFont4: {
        color: Theme.color_2,
        fontSize: ScreenUtil.setSpFont(12),
    },
    itemFont5: {
        color: Theme.color_12,
        fontSize: ScreenUtil.setSpFont(12),
    },
    itemFont6: {
        color: Theme.color_10,
        fontSize: ScreenUtil.setSpFont(12),
    },
    itemFont7: {
        color: Theme.color_13,
        fontSize: ScreenUtil.setSpFont(12),
    },
    itemFont8: {
        color: Theme.color_14,
        fontSize: ScreenUtil.setSpFont(12),
    },
    itemFont9: {
        color: Theme.color_15,
        fontSize: ScreenUtil.setSpFont(12),
    },
});
