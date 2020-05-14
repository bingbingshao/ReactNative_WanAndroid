/**
 * @author bingPo
 * @date 2020-04-06 15:50
 * @name: PublishArticle
 * @description：PublishArticle
 */
import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet, StatusBar, TouchableHighlight,
    Modal,
    TouchableWithoutFeedback,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {goSquareSeriesDetails, goWebView, goBackPage} from '../../redux/action/NavigationAction';
import {SquareList, SquareNavigation, SquareSeries, SquareStateChange} from '../../redux/action/square/SquareAction';
import {CollectArticle, CollectArticleDelete, HomeStateChange} from '../../redux/action/home/HomeAction';
import {MyStateChange, PublishArticleLink} from '../../redux/action/my/MyAction';
import {connect} from 'react-redux';
import Theme from '../../component/Theme';
import Style from '../../css/Style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ScreenUtil, {deviceWidth} from '../../component/ScreenUtil';
import Message from '../../component/Message';
import Loading from '../../component/Loading';
import ClearTextInput from '../../component/ClearTextInput';
import Util from '../../component/Util';

class PublishArticle extends Component {
    constructor() {
        super();
        this.state = {};
    }

    //渲染前调用
    componentWillMount() {
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
    illustrate() {
        this.props.MyStateChange({
            showTip: true,
        });
    }

    //分享文章
    shareArticle() {
        const {title, link} = this.props.my;

        if (Util.checkIsEmptyString(title)) {
            Util.showToast('请填写文章标题');
            return;
        }
        if (Util.checkIsEmptyString(link)) {
            Util.showToast('请填写文章连接');
            return;
        }

        this.props.PublishArticleLink();
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
                            <Text style={Style.barTitle}>{' '}{Message.MY_ARTICLE_SHARE}</Text>
                        </View>
                    </TouchableHighlight>
                    <View style={Style.rowCenterCenter}>
                        <TouchableHighlight
                            underlayColor={'transparent'}
                            onPress={() => this.illustrate()}>
                            <Ionicons name={'ios-help-circle-outline'} color={Theme.white}
                                      size={ScreenUtil.setSpFont(20)}
                                      style={{paddingRight: ScreenUtil.scaleSizeW(20)}}/>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }

    _contain() {
        const {userName} = this.props.login;
        const {title, link} = this.props.my;
        return (
            <View style={Style.columnStartCenter}>
                <View style={styles.containView}>
                    <Text style={styles.containFont1}>{'标题'}</Text>
                    <View style={styles.containView1}>
                        <ClearTextInput
                            style={styles.input}
                            placeholder={'文章标题'}
                            placeholderTextColor={Theme.color_1}
                            value={title}
                            onChangeText={(text) => {
                                this.props.MyStateChange({
                                    title: text.trim(),
                                });
                            }}
                        />
                    </View>
                </View>
                <View style={styles.containView}>
                    <Text style={styles.containFont1}>{'连接'}</Text>
                    <View style={styles.containView2}>
                        <ClearTextInput
                            style={styles.input1}
                            placeholder={'文章连接'}
                            placeholderTextColor={Theme.color_1}
                            value={link}
                            multiline={true}
                            onChangeText={(text) => {
                                this.props.MyStateChange({
                                    link: text.trim(),
                                });
                            }}
                        />
                    </View>
                </View>
                <View style={styles.containView}>
                    <Text style={styles.containFont1}>{'分享人'}</Text>
                    <View style={[styles.containView1, Style.rowStartCenter]}>
                        <Text style={styles.containFont2}>{userName}</Text>
                    </View>
                </View>
                <View style={styles.containView}>
                    <TouchableHighlight
                        underlayColor={'transparent'}
                        onPress={() => this.shareArticle()}>
                        <View style={[styles.button, Style.rowCenterCenter]}>
                            <Text style={styles.buttonFont}>{'分享'}</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

    _modal() {
        const {showTip} = this.props.my;
        return (
            <Modal
                visible={showTip}
                // visible={true}
                animationType={'slide'}       /// 显示格式  slide:从底部 none:无  fade:淡入淡出
                transparent={true}>
                <View style={styles.modalView}>
                    {Platform.OS == 'android' ? <StatusBar backgroundColor={Theme.blackTransparent}/> : null}
                    <TouchableWithoutFeedback
                        underlayColor={'transparent'}
                        onPress={() => this.props.MyStateChange({showTip: false})}>
                        <View style={styles.modalView1}>
                            <Text style={styles.modalFont1}>
                                {'1. 只要是任何好文都可以分享哈，并不一定要是原创！投递的文章会进入广场 tab;'}
                            </Text>
                            <Text style={styles.modalFont1}>
                                {'2. CSDN，掘金，简书等官方博客站点会直接通过，不需要审核;'}
                            </Text>
                            <Text style={styles.modalFont1}>
                                {'3. 其他个人站点会进入审核阶段，不要投递任何无效链接，测试的请尽快删除，否则可能会对你的账号产生一定影响;'}
                            </Text>
                            <Text style={styles.modalFont1}>
                                {'4. 目前处于测试阶段，如果你发现500等错误，可以向我提交日志，让我们一起使网站变得更好。'}
                            </Text>
                            <Text style={styles.modalFont1}>
                                {'5. 由于本站只有我一个人开发与维护，会尽力保证24小时内审核，当然有可能哪天太累，会延期，请保持佛系...'}
                            </Text>
                            <View style={[Style.rowEndCenter, {marginTop: ScreenUtil.scaleSizeW(40)}]}>
                                <TouchableHighlight
                                    underlayColor={'transparent'}
                                    onPress={() => this.props.MyStateChange({showTip: false})}>
                                    <Text style={styles.modalFont2}>{'了解'}</Text>
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
                {this._contain()}
                {this._modal()}
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
        goSquareSeriesDetails,
        SquareStateChange,
        SquareList,
        SquareNavigation,
        SquareSeries,
        CollectArticle,
        CollectArticleDelete,
        HomeStateChange,
        MyStateChange,
        PublishArticleLink,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PublishArticle);

const styles = StyleSheet.create({
    contains: {
        flex: 1,
        backgroundColor: Theme.white,
    },
    containView: {
        width: deviceWidth - ScreenUtil.scaleSizeW(40),
        marginTop: ScreenUtil.scaleSizeH(40),
    },
    containView1: {
        width: deviceWidth - ScreenUtil.scaleSizeW(40),
        marginTop: ScreenUtil.scaleSizeH(10),
        backgroundColor: Theme.color_16,
        height: ScreenUtil.scaleSizeH(70),
        borderRadius: ScreenUtil.scaleSizeW(5),
        padding: ScreenUtil.scaleSizeW(8),
    },
    containView2: {
        width: deviceWidth - ScreenUtil.scaleSizeW(40),
        marginTop: ScreenUtil.scaleSizeH(10),
        backgroundColor: Theme.color_16,
        height: ScreenUtil.scaleSizeH(160),
        borderRadius: ScreenUtil.scaleSizeW(5),
        padding: ScreenUtil.scaleSizeW(8),
    },
    containFont1: {
        color: Theme.color_1,
        fontSize: ScreenUtil.setSpFont(10),
    },
    containFont2: {
        color: Theme.color_1,
        fontSize: ScreenUtil.setSpFont(13),
    },
    input: {
        flex: 1,
        fontSize: ScreenUtil.setSpFont(13),
        color: Theme.black,
        padding: 0
    },
    input1: {
        width: deviceWidth - ScreenUtil.scaleSizeW(100),
        height: ScreenUtil.scaleSizeH(140),
        fontSize: ScreenUtil.setSpFont(13),
        color: Theme.black,
        textAlignVertical: 'top',
        padding: 0
    },
    button: {
        width: deviceWidth - ScreenUtil.scaleSizeW(40),
        backgroundColor: Theme.themeColor,
        height: ScreenUtil.scaleSizeH(70),
        borderRadius: ScreenUtil.scaleSizeW(5),
    },
    buttonFont: {
        color: Theme.white,
        fontSize: ScreenUtil.setSpFont(14),
    },


    //modal
    modalView: {
        flex: 1,
        backgroundColor: Theme.blackTransparent,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalView1: {
        width: deviceWidth,
        paddingTop: ScreenUtil.scaleSizeH(50),
        paddingBottom: ScreenUtil.scaleSizeH(120),
        paddingLeft: ScreenUtil.scaleSizeH(10),
        paddingRight: ScreenUtil.scaleSizeH(10),
        backgroundColor: Theme.white,
        borderTopLeftRadius: ScreenUtil.scaleSizeW(10),
        borderTopRightRadius: ScreenUtil.scaleSizeW(10),
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
        fontSize: ScreenUtil.setSpFont(13),
        color: Theme.color_9,
        lineHeight: ScreenUtil.scaleSizeH(34),
        marginTop: ScreenUtil.scaleSizeH(15),
    },
    modalFont2: {
        fontSize: ScreenUtil.setSpFont(13),
        color: Theme.themeColor,
        paddingRight: ScreenUtil.scaleSizeW(15),
    },
});
