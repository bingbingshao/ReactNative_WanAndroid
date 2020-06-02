/**
 * @author bingPo
 * @date 2020-04-04 18:56
 * @name: Article
 * @description：Article
 */
import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    StatusBar,
    TouchableHighlight,
    FlatList,
    RefreshControl,
    Modal,
    TouchableWithoutFeedback,
    DeviceEventEmitter,
} from 'react-native';
import Theme from '../../component/Theme';
import Style from '../../css/Style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ScreenUtil, {deviceWidth} from '../../component/ScreenUtil';
import Message from '../../component/Message';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {goBackPage, goLogin, goPublishArticle, goWebView} from '../../redux/action/NavigationAction';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Util from '../../component/Util';
import {HomeStateChange} from '../../redux/action/home/HomeAction';
import {MyStateChange, MyArticle, MyArticleDelete} from '../../redux/action/my/MyAction';
import {Card} from 'react-native-shadow-cards';
import Loading from '../../component/Loading';
import * as TypeId from '../../component/TypeId';
import {LargeList} from "react-native-largelist-v3";
import {ListHeader} from "../../component/ListHeader";
import {ListFooter} from "../../component/ListFooter";

class Article extends Component {
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
        this.listener = DeviceEventEmitter.addListener(TypeId.ARTICLE_SUCCESS, (param) => {
            this._onRefresh();
        });

        this.listener = DeviceEventEmitter.addListener(TypeId.MY_ARTICLE_SUCCESS, (param) => {  //触发关闭刷新或加载
            this._list.endRefresh();
            this._list.endLoading();
        });
    }

    //卸载前调用
    componentWillUnmount() {
        this.listener.remove();
        this.props.MyStateChange({
            page4: 0,
            font4: 0,
            isRefresh4: true,
        });
    }

    /**
     * 方法处理
     */
    //点击加号
    addPlus() {
        const {userId} = this.props.login;
        if (Util.checkIsEmptyString(userId)) {
            this.props.goLogin();
            return;
        }
        this.props.goPublishArticle();
    }

    deleteArticle(item) {
        this.props.MyStateChange({
            deleteArticleId: item.id,
            deleteShow: true,
        });
    }

    cancel() {
        this.props.MyStateChange({
            deleteShow: false,
        });
    }

    sure() {
        this.props.MyStateChange({
            deleteShow: false,
        });
        this.props.MyArticleDelete();
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
                            <Text style={Style.barTitle}>{' '}{Message.MY_ARTICLE}</Text>
                        </View>
                    </TouchableHighlight>
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

    //数据列表
    _listContains() {
        const {ArticleList} = this.props.my;
        const data = [];
        data.push({items: ArticleList})

        return (
            <LargeList
                ref={ref => (this._list = ref)}
                style={styles.container}
                data={data}
                bounces={true}
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
                heightForIndexPath={() => ScreenUtil.scaleSizeH(120)}
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
        const {ArticleList} = this.props.my;
        let item = ArticleList[row];
        let title = Util.filterHTMLTag(item.title);
        title = title ?
            title.length > 35 ? title.slice(0, 35) + '..' : title : '';
        return (
            <View style={[styles.itemView, Style.rowCenterCenter]}>
                <TouchableHighlight
                    underLayColor={'transparent'}
                    onPress={() => this.jumpWeb(item)}>
                    <Card
                        cornerRadius={0}
                        opacity={0.2}
                        style={[styles.itemView1]}>
                        <View style={[Style.rowBetweenCenter, styles.itemView2]}>
                            <View>
                                <Text style={styles.font1}>
                                    {title}
                                </Text>
                                <Text style={styles.font2}>{item.niceDate}</Text>
                            </View>

                            <TouchableHighlight
                                underlayColor={'transparent'}
                                onPress={() => this.deleteArticle(item)}>
                                <AntDesign
                                    name={'close'}
                                    size={ScreenUtil.setSpFont(18)} color={Theme.color_1}/>
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
        this.props.MyStateChange({
            page4: 1,
            font4: 0,
            isRefresh4: true,
            // collectList: [],
        });
        this.props.MyArticle();
        // this.props.MyIntegralHistory();
    };

    /**
     * 加载更多
     * @private
     */
    _onLoadMore() {
        const {font4, page4} = this.props.my;
        if (font4 !== 2) {
            this.props.MyStateChange({
                page4: page4 + 1,
                font4: 1,
            });
            this.props.MyArticle();
            // this.props.MyIntegralHistory();
        }
    }

    _modal() {
        const {deleteShow} = this.props.my;
        return (
            <Modal
                visible={deleteShow}
                // visible={true}
                animationType={'slide'}       /// 显示格式  slide:从底部 none:无  fade:淡入淡出
                transparent={true}>
                <View style={styles.modalView}>
                    {Platform.OS == 'android' ? <StatusBar backgroundColor={Theme.blackTransparent}/> : null}
                    <TouchableWithoutFeedback
                        underlayColor={'transparent'}
                        onPress={() => this.props.MyStateChange({deleteShow: false})}>
                        <View style={styles.modalView1}>
                            <View style={Style.rowCenterCenter}>
                                <Text style={styles.modalFont1}>{'是否要删除这篇分享？'}</Text>
                            </View>
                            <View style={Style.rowAroundCenter}>
                                <TouchableHighlight
                                    underlayColor={'transparent'}
                                    onPress={() => this.cancel()}>
                                    <View style={[styles.buttonView1, Style.rowCenterCenter]}>
                                        <Text style={styles.modalFont2}>{'取消'}</Text>
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    underlayColor={'transparent'}
                                    onPress={() => this.sure()}>
                                    <View style={[styles.buttonView2, Style.rowCenterCenter]}>
                                        <Text style={styles.modalFont2}>{'确定'}</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

            </Modal>
        );
    }

    render() {
        return (
            <View style={styles.contains}>
                {this._nav()}
                {this._listContains()}
                {this._modal()}
                <Loading isShow={this.props.my.isLoading}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        nav: state.nav,
        login: state.login,
        my: state.my,
        theme: state.theme,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        goBackPage,
        goLogin,
        goWebView,
        goPublishArticle,
        MyStateChange,
        MyArticle,
        MyArticleDelete,
        HomeStateChange
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);

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
        padding: ScreenUtil.scaleSizeW(20),
        borderWidth: ScreenUtil.pixelRatio(1),
        borderColor: Theme.color_8,
    },
    font1: {
        color: Theme.black,
        fontSize: ScreenUtil.setSpFont(12),
    },
    font2: {
        marginTop: ScreenUtil.scaleSizeH(10),
        color: Theme.color_9,
        fontSize: ScreenUtil.setSpFont(10),
    },

    //modal
    modalView: {
        flex: 1,
        backgroundColor: Theme.blackTransparent,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView1: {
        width: deviceWidth - ScreenUtil.scaleSizeW(60),
        padding: ScreenUtil.scaleSizeW(30),
        backgroundColor: Theme.white,
        borderRadius: ScreenUtil.scaleSizeW(10),
    },
    modalView2: {
        width: deviceWidth,
        paddingTop: ScreenUtil.scaleSizeH(30),
        paddingBottom: ScreenUtil.scaleSizeH(30),
        paddingLeft: ScreenUtil.scaleSizeH(10),
        paddingRight: ScreenUtil.scaleSizeH(10),
        backgroundColor: Theme.white,
    },
    modalFont1: {
        fontSize: ScreenUtil.setSpFont(14),
        color: Theme.black,
        marginTop: ScreenUtil.scaleSizeH(25),
    },
    modalFont2: {
        fontSize: ScreenUtil.setSpFont(14),
        color: Theme.white,
    },
    buttonView1: {
        width: ScreenUtil.scaleSizeW(200),
        height: ScreenUtil.scaleSizeH(40),
        borderRadius: ScreenUtil.scaleSizeW(10),
        backgroundColor: Theme.color_1,
        marginTop: ScreenUtil.scaleSizeH(50),
        marginBottom: ScreenUtil.scaleSizeH(20),
    },
    buttonView2: {
        width: ScreenUtil.scaleSizeW(200),
        height: ScreenUtil.scaleSizeH(40),
        borderRadius: ScreenUtil.scaleSizeW(10),
        backgroundColor: Theme.themeColor,
        marginTop: ScreenUtil.scaleSizeH(50),
        marginBottom: ScreenUtil.scaleSizeH(20),
    },
});
