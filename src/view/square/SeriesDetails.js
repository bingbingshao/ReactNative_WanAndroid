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
    StyleSheet, StatusBar, TouchableHighlight, ScrollView, FlatList, RefreshControl,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Theme from '../../component/Theme';
import Style from '../../css/Style';
import Message from '../../component/Message';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ScreenUtil, {deviceWidth} from '../../component/ScreenUtil';
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

class SeriesDetails extends Component {
    constructor() {
        super();
        this.state = {};
        this.layoutX = 0;
    }

    //渲染前调用
    componentWillMount() {
        console.log('componentWillMount');
        this.props.SquareSeriesDetails();
    }

    //渲染后调用
    componentDidMount() {
    }

    //卸载前调用
    componentWillUnmount() {
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
        console.log('selectMenu');
        this.props.SquareStateChange({
            seriesMenuSelected: data.id,
        });
        this._onRefresh();
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
                <View style={[Style.barView1, Style.rowBetweenCenter, {backgroundColor: themeColor}]}>
                    <ScrollView
                        ref={(view) => {
                            this.myScrollView = view;
                        }}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        <View style={Style.rowStartCenter}>
                            {
                                seriesMenuList.children.map((data, i) => {
                                    if (seriesMenuSelected == data.id) {
                                        return (
                                            <View
                                                ref={'selectView'}
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

    //数据列表
    _list() {
        const {seriesArticleList} = this.props.square;
        // console.log('articleList', seriesArticleList);
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                data={seriesArticleList}
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
        title = title ?
            title.length > 35 ? title.slice(0, 35) + '..' : title : '';
        return (
            <View style={[styles.itemView, Style.rowCenterCenter]}>

                <TouchableHighlight
                    underLayColor={'transparent'}
                    onPress={() => this.jumpWeb(item)}
                >
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
                            <Text style={styles.font1}>
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
     * 创建尾部布局
     */
    _createListFooter = () => {
        const {seriesFont} = this.props.square;
        return (
            <View style={Style.footerView}>
                <Text style={Style.footerFont}>
                    {seriesFont === 0 ? '' : seriesFont === 1 ? '正在加载更多数据...' : '没有更多数据了'}
                </Text>
            </View>
        );
    };
    /**
     * 下啦刷新
     * @private
     */
    _onRefresh = () => {
        console.log('_onRefresh');
        this.props.SquareStateChange({
            seriesPage: 0,
            seriesFont: 0,
            seriesIsRefresh: true,
            seriesArticleList: [],
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
            <View>
                {this._nav()}
                {this._list()}
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
        fontSize: ScreenUtil.setSpFont(14),
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
        fontSize: ScreenUtil.setSpFont(15),
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
