/**
 * @author bingPo
 * @date 2020-04-04 09:38
 * @name: SearchResult
 * @description：SearchResult
 */
import React, {Component} from 'react';
import {
    View,
    Image,
    StatusBar,
    Text,
    StyleSheet,
    TouchableHighlight,
    ScrollView, FlatList, RefreshControl, DeviceEventEmitter,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ScreenUtil, {deviceWidth} from '../../component/ScreenUtil';
import Theme from '../../component/Theme';
import Style from '../../css/Style';
import Message from '../../component/Message';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {goBackPage, goWebView} from '../../redux/action/NavigationAction';
import {
    SearchData,
    HomeStateChange,
    CollectArticle,
    CollectArticleDelete,
    CollectNet, CollectNetDelete,
} from '../../redux/action/home/HomeAction';
import Loading from '../../component/Loading';
import {BoxShadow} from 'react-native-shadow';
import Util from '../../component/Util';
import * as TypeId from '../../component/TypeId';
import {LargeList} from "react-native-largelist-v3";
import {ListHeader} from "../../component/ListHeader";
import {ListFooter} from "../../component/ListFooter";

class SearchResult extends Component {
    constructor() {
        super();
        this.state = {};
    }

    //渲染前调用
    componentWillMount() {
        this._onRefresh();
    }

    //渲染后调用
    componentDidMount() {
        this.listener = DeviceEventEmitter.addListener(TypeId.SEARCH_GET_SUCCESS, (param) => {
            this._list.endRefresh();
            this._list.endLoading();
        });
    }

    //卸载前调用
    componentWillUnmount() {
        this.listener.remove();
        this.props.HomeStateChange({
            searchText: '',
            searchData: [],
            searchPage: 0,
            searchFont: 0,
            collectId: '',
            collectName: '',
            collectLink: '',
        });
    }

    /**
     * 方法处理
     */

    //收藏文章
    collect(item) {
        console.log(item);
        const {searchData} = this.props.home;
        const {userId} = this.props.login;
        // console.log('item', item);
        if (Util.checkIsEmptyString(userId)) {  //没有登录跳转登录
            this.props.goLogin();
            return;
        }
        this.props.HomeStateChange({
            collectId: item.id,
            collectName: item.author ? item.author : item.shareUser,
            collectLink: item.link,
        });

        if (item.type == TypeId.NET) {  //网址
            if (item.collect) { //已收藏取消收藏
                //设置页面取消收藏渲染
                let tempList = searchData;
                tempList.map((data) => {
                    if (data.id == item.id) {
                        data.collect = false;
                    }
                });
                this.props.HomeStateChange({
                    searchData: tempList,
                });
                this.props.CollectNetDelete();
            } else {
                //设置页面收藏渲染
                let tempList = searchData;
                tempList.map((data) => {
                    if (data.id == item.id) {
                        data.collect = true;
                    }
                });
                this.props.HomeStateChange({
                    searchData: tempList,
                });
                this.props.CollectNet();
            }
        } else if (item.type == TypeId.ARTICLE) {  //文章
            if (item.collect) { //已收藏取消收藏
                //设置页面取消收藏渲染
                let tempList = searchData;
                tempList.map((data) => {
                    if (data.id == item.id) {
                        data.collect = false;
                    }
                });
                this.props.HomeStateChange({
                    searchData: tempList,
                });
                this.props.CollectArticleDelete();
            } else {
                //设置页面收藏渲染
                let tempList = webData;
                tempList.map((data) => {
                    if (data.id == item.id) {
                        data.collect = true;
                    }
                });
                this.props.HomeStateChange({
                    webData: tempList,
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
        const {searchText} = this.props.home;
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
                            <Text style={Style.barTitle}>{' '}{searchText}</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

    //数据列表
    _listData() {
        const data = [];
        const {searchData} = this.props.home;
        data.push({items: searchData})

        return (
            <LargeList
                ref={ref => (this._list = ref)}
                style={styles.container}
                data={data}
                heightForSection={() => 0}
                renderSection={this._renderSection}
                refreshHeader={ListHeader}
                loadingFooter={ListFooter}
                allLoaded={this.state.allLoaded}
                onLoading={() => {
                    this._onLoadMore();
                }}
                renderIndexPath={this._renderIndexPath}
                heightForIndexPath={() => ScreenUtil.scaleSizeH(190)}
                renderEmpty={this._renderEmpty}
                onRefresh={() => {
                    this._onRefresh()
                }}
            />
        )
    }


    //数据展示
    _renderIndexPath = ({section: section, row: row}) => {
        const {searchData} = this.props.home;
        let item = searchData[row];
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
            title.length > 20 ? title.slice(0, 20) + '..' : title
            : '';
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
    /**
     * 下啦刷新
     * @private
     */
    _onRefresh = () => {
        this.props.HomeStateChange({
            searchPage: 1,
            searchFont: 0,
            isRefresh: true,
        });
        this.props.SearchData();
    };

    /**
     * 加载更多
     * @private
     */
    _onLoadMore() {
        const {searchFont, searchPage} = this.props.home;
        if (searchFont !== 2) {
            this.props.HomeStateChange({
                searchPage: searchPage + 1,
            });
            this.props.SearchData();
        }
    }

    render() {
        return (
            <View style={styles.contains}>
                {this._nav()}
                {this._listData()}
                {/*<Loading isShow={this.props.home.isLoading}/>*/}
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
        goWebView,
        goBackPage,
        SearchData,
        HomeStateChange,
        CollectArticle,
        CollectArticleDelete,
        CollectNet,
        CollectNetDelete,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);

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

    contains: {
        flex: 1,
        backgroundColor: Theme.color_3,
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
