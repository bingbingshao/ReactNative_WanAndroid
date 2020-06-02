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
    StyleSheet, StatusBar,
    TouchableHighlight, FlatList, RefreshControl,
    DeviceEventEmitter,
    TouchableOpacity
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
import {LargeList} from "react-native-largelist-v3";
import {ListHeader} from "../../component/ListHeader";
import {ListFooter} from "../../component/ListFooter";
import * as TypeId from "../../component/TypeId";

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
        this.listener = DeviceEventEmitter.addListener(TypeId.INTEGRAL_GET_SUCCESS, (param) => {
            // console.log("SQUARE_GET_SUCCESS")
            this._list.endRefresh();
            this._list.endLoading();
        });
    }

    //卸载前调用
    componentWillUnmount() {
        this.props.MyStateChange({
            page1: 1,
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
    _listContains() {
        const {integralList} = this.props.my;
        const data = [];
        data.push({items: integralList})
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
                heightForIndexPath={() => ScreenUtil.scaleSizeH(110)}
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


    _renderIndexPath = ({section: section, row: row}) => {
        const {integralList} = this.props.my;
        let item = integralList[row];
        // console.log('item', item);
        return (
            <View style={[styles.itemView, Style.rowCenterCenter]}>
                <TouchableHighlight
                    underLayColor={'transparent'}
                    // onPress={() => this.jumpWeb(item)}
                >
                    <Card
                        cornerRadius={0}
                        opacity={0.2}
                        style={[styles.itemView1, Style.rowBetweenCenter]}>
                        <View style={Style.rowStartCenter}>
                            <Text style={styles.font1}>{item.rank}</Text>
                            <Text style={styles.font2}>{'    '}{item.username}</Text>
                        </View>
                        <Text style={styles.font3}>{item.coinCount}</Text>
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
        this.props.MyStateChange({
            page1: 1,
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
                {this._listContains()}
                {/*<Loading isShow={this.props.my.isLoading}/>*/}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        nav: state.nav,
        my: state.my,
        theme: state.theme,
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
