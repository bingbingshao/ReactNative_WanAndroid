/**
 * @author bingPo
 * @date 2020-04-04 09:38
 * @name: SeriesDetails
 * @description：SeriesDetails
 */
import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet, StatusBar,
    TouchableHighlight,
    ScrollView, FlatList,
    RefreshControl,
    TouchableOpacity, DeviceEventEmitter
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Theme from '../../component/Theme';
import Style from '../../css/Style';
import Message from '../../component/Message';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ScreenUtil, {defaultBarHeight, deviceWidth, statusBarHeight} from '../../component/ScreenUtil';
import {SquareStateChange, SquareSeriesDetails} from '../../redux/action/square/SquareAction';
import Util from '../../component/Util';
import {Card} from 'react-native-shadow-cards';
import {
    CollectArticle,
    CollectArticleDelete,
    CollectNet,
    CollectNetDelete,
    HomeStateChange,
} from '../../redux/action/home/HomeAction';
import {goWebView, goBackPage} from '../../redux/action/NavigationAction';
import Loading from '../../component/Loading';
import * as TypeId from '../../component/TypeId';
import ScrollableTabView, {ScrollableTabBar} from "react-native-scrollable-tab-view";
import {LargeList} from "react-native-largelist-v3";
import {ListHeader} from "../../component/ListHeader";
import {ListFooter} from "../../component/ListFooter";
import MyScrollBar from "../../component/MyScrollBar";

class SeriesDetails extends Component {
    constructor() {
        super();
        this.layoutX = 0;
        this.state = {
            nowPage: 0,  //当前导航页
            nowScroll: 0, //当前顶部tab滚动距离
        };
    }

    //渲染前调用
    componentWillMount() {
        this.props.SquareSeriesDetails();
    }

    //渲染后调用
    componentDidMount() {
        this.listener = DeviceEventEmitter.addListener(TypeId.SQUARE_SERIES_GET_SUCCESS, (param) => {  //触发关闭刷新或加载
            this._list.endRefresh();
            this._list.endLoading();
        });
    }

    //卸载前调用
    componentWillUnmount() {
        this.listener.remove();
        this.props.SquareStateChange({
            seriesPage: 0,
            seriesFont: 0,
            seriesIsRefresh: true,
            seriesArticleList: [],
        });
    }

    /**
     * 方法处理
     */
    //公众号页面菜单选择
    selectMenu(data) {
        this.props.SquareStateChange({
            seriesMenuSelected: data.id,
        });
        this._onRefresh();
    }

    //记录tabScroll 是否滑动
    onScrollable(e) {
        this.setState({
            nowScroll: e
        })
    }

    //切换菜单
    changeTab(obj) {
        const {seriesMenuList, seriesArticleList} = this.props.square;

        this.setState({
            nowPage: obj.i
        });
        this.props.SquareStateChange({
            seriesMenuPage: obj.i,
        });


        if (seriesArticleList[obj.i] == undefined) {
            this.selectMenu(seriesMenuList.children[obj.i]);
        }
    }

    //收藏文章
    collect(item) {
        const {seriesArticleList} = this.props.square;
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
                let tempList = seriesArticleList;
                tempList.map((data) => {
                    if (data.id == item.id) {
                        data.collect = false;
                    }
                });
                this.props.SquareStateChange({
                    seriesArticleList: tempList,
                });
                this.props.CollectNetDelete();
            } else {
                //设置页面收藏渲染
                let tempList = seriesArticleList;
                tempList.map((data) => {
                    if (data.id == item.id) {
                        data.collect = true;
                    }
                });
                this.props.SquareStateChange({
                    seriesArticleList: tempList,
                });
                this.props.CollectNet();
            }
        } else if (item.type == TypeId.ARTICLE) {  //文章
            if (item.collect) { //已收藏取消收藏
                //设置页面取消收藏渲染
                let tempList = seriesArticleList;
                tempList.map((data) => {
                    if (data.id == item.id) {
                        data.collect = false;
                    }
                });
                this.props.SquareStateChange({
                    seriesArticleList: tempList,
                });
                this.props.CollectArticleDelete();
            } else {
                //设置页面收藏渲染
                let tempList = seriesArticleList;
                tempList.map((data) => {
                    if (data.id == item.id) {
                        data.collect = true;
                    }
                });
                this.props.SquareStateChange({
                    seriesArticleList: tempList,
                });
                this.props.CollectArticle();
            }
        }
        // console.log("item",item)


    }

    //跳转详情页面
    jumpWeb(data) {
        const {nowPage, nowScroll} = this.state;
        if (nowPage == nowScroll) {
            this.props.HomeStateChange({
                webData: data,
            });
            this.props.goWebView();
        }
    }

    /**
     * 页面渲染
     */
    //顶部导航渲染
    _nav() {
        const {seriesMenuList, seriesMenuSelected} = this.props.square;
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
                            <Text style={Style.barTitle}>{' '}{seriesMenuList.name}</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

    _contains() {
        let that = this;
        const {seriesMenuList, seriesMenuSelected, seriesMenuPage} = this.props.square;
        const {themeColor} = this.props.theme;
        let childrenData = seriesMenuList.children;
        if (childrenData && childrenData.length > 0) {
            return (
                <View style={{flex: 1,}}>
                    <ScrollableTabView
                        onScroll={(e) => this.onScrollable(e)}
                        onChangeTab={(obj) => this.changeTab(obj)}
                        initialPage={seriesMenuPage}
                        style={{flex: 1}}
                        renderTabBar={() =>
                            <MyScrollBar
                                style={[{borderBottomWidth: 0, backgroundColor: themeColor}]}
                                textStyle={{fontSize: ScreenUtil.setSpFont(14), color: Theme.white}}
                                underlineStyle={{
                                    marginBottom: ScreenUtil.scaleSizeW(10),
                                    backgroundColor: Theme.white,
                                    borderRadius: ScreenUtil.scaleSizeW(20),
                                }}
                            />
                        }
                    >
                        {
                            childrenData.map((data, i) => {
                                return (
                                    <View style={{flex: 1}}
                                          tabLabel={data.name} key={i}>
                                        {this._listData()}
                                    </View>
                                )
                            })
                        }
                    </ScrollableTabView>
                </View>
            )
        } else {
            return (
                <View style={styles.empty}>
                    <Text>{'没有数据'}</Text>
                </View>
            )
        }
    }

    //数据列表
    _listData() {
        const {seriesArticleList, seriesMenuPage} = this.props.square;
        const data = [];
        if (seriesArticleList[seriesMenuPage] != undefined) {
            data.push({items: seriesArticleList[seriesMenuPage]})
        }
        console.log("seriesArticleList", seriesArticleList)

        return (
            <LargeList
                ref={ref => (this._list = ref)}
                style={styles.container}
                data={data}
                heightForSection={() => 0}
                renderSection={this._renderSection}
                renderHeader={this._banner}
                refreshHeader={ListHeader}
                loadingFooter={ListFooter}
                allLoaded={this.state.allLoaded}
                onLoading={() => {
                    this._onLoadMore();
                }}
                renderIndexPath={this._renderIndexPath}
                heightForIndexPath={() => ScreenUtil.scaleSizeH(180)}
                renderEmpty={this._renderEmpty}
                onRefresh={() => {
                    this._onRefresh()
                }}
            />
        )
    }

    //数据为空时
    _renderEmpty = () => {
        return (
            <View style={styles.empty}>
                <Text>{'没有数据'}</Text>
            </View>
        );
    };

    //分区渲染 置空
    _renderSection = (section) => {

        return (
            <View style={{height: 0}}>
            </View>
        );
    };


    _renderIndexPath = ({section: section, row: row,}) => {
        const {seriesArticleList, seriesMenuPage} = this.props.square;
        let data = seriesArticleList[seriesMenuPage];
        let item = data[row];

        let title = Util.filterHTMLTag(item.title);
        title = title ?
            title.length > 26 ? title.slice(0, 26) + '..' : title : '';
        return (
            <View style={[styles.itemView, Style.rowCenterCenter]}>

                <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={() => this.jumpWeb(item)}>
                    <Card
                        cornerRadius={0}
                        opacity={0.2}
                        style={[styles.itemView1, Style.columnBetween]}>
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

                        <Text style={[styles.titleFont, {
                            marginTop: ScreenUtil.scaleSizeH(15),
                            marginBottom: ScreenUtil.scaleSizeH(15),
                        }]}>
                            {title}
                        </Text>

                        <View style={[Style.rowBetweenCenter, styles.itemView2]}>
                            <Text style={styles.font1}>
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
                    </Card>
                </TouchableHighlight>
            </View>
        );
    }

    /**
     * 下啦刷新
     * @private
     */
    _onRefresh = () => {
        this.props.SquareStateChange({
            seriesPage: 1,
            seriesFont: 0,
            seriesIsRefresh: true,
        });
        this.props.SquareSeriesDetails();
    };

    /**
     * 加载更多
     * @private
     */
    _onLoadMore() {
        const {seriesFont, seriesPage} = this.props.square;
        if (seriesFont !== 2) {
            this.props.SquareStateChange({
                seriesPage: seriesPage + 1,
                seriesFont: 1,
            });
            this.props.SquareSeriesDetails();
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {this._nav()}
                {this._contains()}
                {/*<Loading isShow={this.props.square.isLoading}/>*/}
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
        goBackPage,
        goWebView,
        CollectArticle,
        CollectArticleDelete,
        HomeStateChange,
        SquareStateChange,
        SquareSeriesDetails,
        CollectNet,
        CollectNetDelete,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SeriesDetails);


const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    section: {
        flex: 1,
        backgroundColor: "gray",
        justifyContent: "center",
        alignItems: "center"
    },
    row: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    line: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 1,
        backgroundColor: "#EEE"
    },
    empty: {
        marginVertical: 20,
        alignSelf: "center"
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
        fontSize: ScreenUtil.setSpFont(13),
        lineHeight: ScreenUtil.scaleSizeH(22),
    },
    itemImage: {
        width: ScreenUtil.scaleSizeW(200),
        height: ScreenUtil.scaleSizeW(200),
    },
});
