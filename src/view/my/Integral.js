/**
 * @author bingPo
 * @date 2020-04-04 18:57
 * @name: Integral
 * @description：Integral
 */
import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet, StatusBar, TouchableHighlight, FlatList, RefreshControl,
} from 'react-native';
import Theme from '../../component/Theme';
import Style from '../../css/Style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ScreenUtil, {deviceWidth} from '../../component/ScreenUtil';
import Message from '../../component/Message';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {goBackPage, goMyIntegralHistory, goWebView} from '../../redux/action/NavigationAction';
import {MyStateChange, MyIntegral} from '../../redux/action/my/MyAction';
import Util from '../../component/Util';
import {Card} from 'react-native-shadow-cards';
import Loading from '../../component/Loading';

class Integral extends Component {
    constructor() {
        super();
        this.state = {};
    }

    //渲染前调用
    componentWillMount() {
        this.props.MyIntegral();
    }

    //渲染后调用
    componentDidMount() {
    }

    //卸载前调用
    componentWillUnmount() {
        this.props.MyStateChange({
            page1: 0,
            font1: 0,
            isRefresh1: true,
            integralList: [],
        });
    }

    /**
     * 方法处理
     */
    //说明
    illustrate() {
        let data = {
            title: '本站积分规则',
            url: 'https://www.wanandroid.com/blog/show/2653',
        };
        this.props.HomeStateChange({
            webData: data,
        });
        this.props.goWebView();
    }

    //历史
    history() {
        this.props.goMyIntegralHistory();
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
                    <TouchableHighlight
                        underlayColor={'transparent'}
                        onPress={() => this.props.goBackPage()}>
                        <View style={Style.rowCenterCenter}>
          <AntDesign name={'arrowleft'} color={Theme.white} size={ScreenUtil.setSpFont(20)}
                                       style={{paddingLeft: ScreenUtil.scaleSizeW(10)}}/>
                            <Text style={Style.barTitle}>{' '}{Message.MY_INTEGRAL_RANG}</Text>
                        </View>
                    </TouchableHighlight>
                    <View style={Style.rowCenterCenter}>
                        <TouchableHighlight
                            underlayColor={'transparent'}
                            onPress={() => this.illustrate()}>
                            <Ionicons name={'ios-help-circle-outline'} color={Theme.white}
                                      size={ScreenUtil.setSpFont(20)}
                                      style={{paddingRight: ScreenUtil.scaleSizeW(30)}}/>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor={'transparent'}
                            onPress={() => this.history()}>
                            <Ionicons name={'md-time'} color={Theme.white} size={ScreenUtil.setSpFont(20)}
                                      style={{paddingRight: ScreenUtil.scaleSizeW(20)}}/>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }

    //数据列表
    _list() {
        const {integralList} = this.props.my;
        // console.log('articleList', seriesArticleList);
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                data={integralList}
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
        // console.log('item', item);
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
                        <View style={Style.rowStartCenter}>
                            <Text style={styles.font1}>{item.rank + 30}</Text>
                            <Text style={styles.font2}>{'    '}{item.username}</Text>
                        </View>
                        <Text style={styles.font3}>{item.coinCount}</Text>
                    </Card>
                </TouchableHighlight>
            </View>
        );
    }

    /**
     * 创建尾部布局
     */
    _createListFooter = () => {
        const {font1} = this.props.my;
        return (
            <View style={Style.footerView}>
                <Text style={Style.footerFont}>
                    {font1 === 0 ? '' : font1 === 1 ? '正在加载更多数据...' : '没有更多数据了'}
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
            page1: 0,
            font1: 0,
            isRefresh1: true,
        });
        this.props.MyIntegral();
    };

    /**
     * 加载更多
     * @private
     */
    _onLoadMore() {
        const {font1, page1} = this.props.my;
        if (font1 !== 2) {
            this.props.MyStateChange({
                page1: page1 + 1,
                font1: 1,
            });
            this.props.MyIntegral();
        }
    }

    render() {
        return (
            <View style={styles.contains}>
                {this._nav()}
                {this._list()}
                <Loading isShow={this.props.my.isLoading}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        nav: state.nav,
        my: state.my,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        goBackPage,
        goMyIntegralHistory,
        goWebView,
        MyStateChange,
        MyIntegral,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Integral);

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
        padding: ScreenUtil.scaleSizeW(30),
        borderWidth: ScreenUtil.pixelRatio(1),
        borderColor: Theme.color_8,
    },
    font1: {
        color: Theme.black,
        fontSize: ScreenUtil.setSpFont(14),
        fontWeight: '600',
    },
    font2: {
        color: Theme.color_9,
        fontSize: ScreenUtil.setSpFont(12),
        fontWeight: '400',
    },
    font3: {
        color: Theme.color_1,
        fontSize: ScreenUtil.setSpFont(12),
        fontWeight: '600',
    },

});
