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
    StyleSheet, StatusBar, TouchableHighlight, ScrollView, FlatList, RefreshControl, DeviceEventEmitter,
    TouchableOpacity
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Theme from '../../component/Theme';
import Style from '../../css/Style';
import Message from '../../component/Message';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ScreenUtil, {deviceWidth, statusBarHeight} from '../../component/ScreenUtil';
import {ProjectList, ProjectMenu, ProjectStateChange} from '../../redux/action/project/ProjectAction';
import {goWebView} from '../../redux/action/NavigationAction';
import Loading from '../../component/Loading';
import {BoxShadow} from 'react-native-shadow';
import Util from '../../component/Util';
import {
    CollectArticle,
    CollectArticleDelete,
    CollectNet,
    CollectNetDelete,
    HomeStateChange,
} from '../../redux/action/home/HomeAction';
import * as TypeId from '../../component/TypeId';
import {LargeList} from "react-native-largelist-v3";
import {ListHeader} from "../../component/ListHeader";
import {ListFooter} from "../../component/ListFooter";
import ScrollableTabView, {ScrollableTabBar} from "react-native-scrollable-tab-view";

class index extends Component {
    constructor() {
        super();
        this.state = {
            nowPage: 0,  //当前导航页
            nowScroll: 0, //当前顶部tab滚动距离
        };
    }

    //渲染前调用
    componentWillMount() {
        this.props.ProjectMenu();
    }

    //渲染后调用
    componentDidMount() {
        this.listener = DeviceEventEmitter.addListener(TypeId.LOGIN_SUCCESS, (param) => {
            this._onRefresh();
        });
        this.listener = DeviceEventEmitter.addListener(TypeId.PROJECT_GET_SUCCESS, (param) => {  //触发关闭刷新或加载
            this._list.endRefresh();
            this._list.endLoading();
        });
    }

    //卸载前调用
    componentWillUnmount() {
        this.listener.remove();
    }

    /**
     * 方法处理
     */
    //项目页面菜单选择
    selectMenu(data) {
        this.props.ProjectStateChange({
            menuSelectedId: data.id,
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
        const {menuList, menuSelectedId, dataList} = this.props.project;

        this.setState({
            nowPage: obj.i
        });
        this.props.ProjectStateChange({
            nowChildPage: obj.i,
        });

        if (dataList[obj.i] == undefined) {
            this.selectMenu(menuList[obj.i]);
        }
    }

    //收藏文章
    collect(item) {
        const {dataList} = this.props.project;
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
                let tempList = dataList;
                tempList.map((data) => {
                    if (data.id == item.id) {
                        data.collect = false;
                    }
                });
                this.props.ProjectStateChange({
                    dataList: tempList,
                });
                this.props.CollectNetDelete();
            } else {
                //设置页面收藏渲染
                let tempList = dataList;
                tempList.map((data) => {
                    if (data.id == item.id) {
                        data.collect = true;
                    }
                });
                this.props.ProjectStateChange({
                    dataList: tempList,
                });
                this.props.CollectNet();
            }

        } else if (item.type == TypeId.ARTICLE) {  //文章
            if (item.collect) { //已收藏取消收藏
                //设置页面取消收藏渲染
                let tempList = dataList;
                tempList.map((data) => {
                    if (data.id == item.id) {
                        data.collect = false;
                    }
                });
                this.props.ProjectStateChange({
                    dataList: tempList,
                });
                this.props.CollectArticleDelete();
            } else {
                //设置页面收藏渲染
                let tempList = dataList;
                tempList.map((data) => {
                    if (data.id == item.id) {
                        data.collect = true;
                    }
                });
                this.props.ProjectStateChange({
                    dataList: tempList,
                });
                this.props.CollectArticle();
            }
        }

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
        const {themeColor} = this.props.theme;
        const {menuList, menuSelectedId} = this.props.project;
        return (
            <View>
                <StatusBar barStyle={'light-content'} translucent={true} backgroundColor={themeColor}/>

                <View style={[Style.barView, Style.rowCenterCenter, {backgroundColor: themeColor}]}>
                    <ScrollView
                        ref={(view) => {
                            this.myScrollView = view;
                        }}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        <View style={Style.rowStartCenter}>
                            {
                                menuList.map((data, i) => {
                                    if (menuSelectedId == data.id) {
                                        return (
                                            <View
                                                onLayout={event => {
                                                    this.myScrollView.scrollTo({
                                                        x: event.nativeEvent.layout.x,
                                                        y: 0,
                                                        animated: true,
                                                    });
                                                }}
                                                style={[Style.navView, Style.columnCenterCenter]}>
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
                    </ScrollView>
                </View>
            </View>
        );
    }

    _contains() {
        const {themeColor} = this.props.theme;
        const {menuList, menuSelectedId} = this.props.project;
        if (menuList && menuList.length > 0) {
            return (
                <View style={{flex: 1, marginTop: statusBarHeight}}>
                    <StatusBar barStyle={'light-content'} translucent={true} backgroundColor={themeColor}/>
                    <ScrollableTabView
                        onScroll={(e) => this.onScrollable(e)}
                        onChangeTab={(obj) => this.changeTab(obj)}
                        style={{flex: 1}}
                        renderTabBar={() =>
                            <ScrollableTabBar
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
                            menuList.map((data, i) => {
                                return (
                                    <View style={{flex: 1}} tabLabel={data.name}>
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
        const {dataList, nowChildPage} = this.props.project;
        const data = [];
        if (dataList[nowChildPage] != undefined) {
            data.push({items: dataList[nowChildPage]})
        }

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
                heightForIndexPath={() => ScreenUtil.scaleSizeH(308)}
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
        const {dataList, nowChildPage} = this.props.project;
        let data = dataList[nowChildPage];
        let item = data[row];
        const shadowOpt = {
            width: deviceWidth - ScreenUtil.scaleSizeW(20),
            height: ScreenUtil.scaleSizeH(300),
            color: Theme.shadowColor,
            border: ScreenUtil.scaleSizeW(1),
            radius: ScreenUtil.scaleSizeW(5),
            opacity: 0.2,
            x: 0,
            y: 2,
            style: {marginVertical: 0},
        };
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
                <TouchableOpacity underLayColor={'transparent'}>
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
                            <View style={[Style.rowStartCenter]}>
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
                </TouchableOpacity>
            </View>
        );
    }

    /**
     * 下啦刷新
     * @private
     */
    _onRefresh = () => {
        this.props.ProjectStateChange({
            page: 1,
            font: 0,
            isRefresh: true,
            // dataList: [],
        });
        this.props.ProjectList();
    };

    /**
     * 加载更多
     * @private
     */
    _onLoadMore() {
        const {font, page} = this.props.project;
        if (font !== 2) {
            this.props.ProjectStateChange({
                page: page + 1,
            });
            this.props.ProjectList();
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {/*{this._nav()}*/}
                {this._contains()}
                {/*{this._listData()}*/}
                {/*<Loading isShow={this.props.project.isLoading}/>*/}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        nav: state.nav,
        project: state.project,
        login: state.login,
        theme: state.theme,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        goWebView,
        ProjectStateChange,
        HomeStateChange,
        ProjectList,
        ProjectMenu,
        CollectArticle,
        CollectArticleDelete,
        CollectNet,
        CollectNetDelete,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(index);

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
        marginTop: ScreenUtil.scaleSizeH(10),
    },
    itemView1: {
        width: deviceWidth - ScreenUtil.scaleSizeW(20),
        height: ScreenUtil.scaleSizeH(300),
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
        height: ScreenUtil.scaleSizeW(200),
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
        fontWeight: '400',
        lineHeight: ScreenUtil.scaleSizeH(28),
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
