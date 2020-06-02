/**
 * @author bingPo
 * @date 2020-04-04 18:57
 * @name: IntegralHistory
 * @description：IntegralHistory
 */
import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    StatusBar, TouchableHighlight, FlatList, RefreshControl,
    DeviceEventEmitter,
    TouchableOpacity
} from 'react-native';
import Theme from '../../component/Theme';
import Style from '../../css/Style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ScreenUtil, {deviceWidth} from '../../component/ScreenUtil';
import Message from '../../component/Message';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {goBackPage} from '../../redux/action/NavigationAction';
import {Card} from 'react-native-shadow-cards';
import Loading from '../../component/Loading';
import {MyStateChange, MyIntegralHistory} from '../../redux/action/my/MyAction';
import * as TypeId from "../../component/TypeId";
import {LargeList} from "react-native-largelist-v3";
import {ListHeader} from "../../component/ListHeader";
import {ListFooter} from "../../component/ListFooter";

class IntegralHistory extends Component {
    constructor() {
        super();
        this.state = {};
    }

    //渲染前调用
    componentWillMount() {
        this.props.MyIntegralHistory();
    }

    //渲染后调用
    componentDidMount() {
        this.listener = DeviceEventEmitter.addListener(TypeId.INTEGRAL_HISTORY_GET_SUCCESS, (param) => {
            // console.log("SQUARE_GET_SUCCESS")
            this._list.endRefresh();
            this._list.endLoading();
        });
    }

    //卸载前调用
    componentWillUnmount() {
        this.props.MyStateChange({
            page2: 1,
            font2: 0,
            isRefresh2: true,
            integralHistoryList: [],
        });
    }

    /**
     * 方法处理
     */

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
                            <Text style={Style.barTitle}>{' '}{Message.MY_INTEGRAL_HISTORY}</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

    //数据列表
    _listContians() {
        const {integralHistoryList} = this.props.my;
        const data = [];
        data.push({items: integralHistoryList})
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
                heightForIndexPath={() => ScreenUtil.scaleSizeH(140)}
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
        const {integralHistoryList} = this.props.my;
        let item = integralHistoryList[row];
        let tempArray = item.desc.split(',');
        let grade = tempArray[1];
        let tempTime = tempArray[0].split(' ');
        return (
            <View style={[styles.itemView, Style.rowCenterCenter]}>
                <TouchableHighlight
                    underLayColor={'transparent'}
                >
                    <Card
                        cornerRadius={0}
                        opacity={0.2}
                        style={[styles.itemView1, Style.rowBetweenCenter]}>
                        <View>
                            <Text style={styles.font1}>
                                {item.reason}{grade}
                            </Text>
                            <Text style={styles.font2}>
                                {tempTime[0]}{' '} {tempTime[1]}
                            </Text>
                        </View>
                        <Text style={styles.font3}>{'+'}{item.coinCount}</Text>
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
            page2: 0,
            font2: 0,
            isRefresh2: true,
        });
        this.props.MyIntegralHistory();
    };

    /**
     * 加载更多
     * @private
     */
    _onLoadMore() {
        const {font2, page2} = this.props.my;
        if (font2 !== 2) {
            this.props.MyStateChange({
                page2: page2 + 1,
                font2: 1,
            });
            this.props.MyIntegralHistory();
        }
    }

    render() {
        return (
            <View style={styles.contains}>
                {this._nav()}
                {this._listContians()}
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
        MyStateChange,
        MyIntegralHistory,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(IntegralHistory);

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
        color: Theme.color_9,
        fontSize: ScreenUtil.setSpFont(12),
        fontWeight: '400',
    },
    font2: {
        marginTop: ScreenUtil.scaleSizeH(10),
        color: Theme.color_9,
        fontSize: ScreenUtil.setSpFont(10),
    },
    font3: {
        color: Theme.themeColor,
        fontSize: ScreenUtil.setSpFont(14),
        fontWeight: '600',
    },
});
