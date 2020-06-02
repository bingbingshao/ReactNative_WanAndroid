/**
 * @author wolf.ma  WanAndroid
 * @date 2020-05-28 17:43
 * @name: Test
 * @description：Test
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, StatusBar, TouchableHighlight, NativeModules, Image, ScrollView} from 'react-native'
import Style from "../src/css/Style";
import Message from "../src/component/Message";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Theme from "../src/component/Theme";
import ScreenUtil, {bannerHeight, deviceWidth, statusBarHeight} from "../src/component/ScreenUtil";
import ScrollableTabView, {ScrollableTabBar} from "react-native-scrollable-tab-view";
import MyScrollBar from '../src/component/MyScrollBar'
import Swiper from 'react-native-swiper';
import {Card} from 'react-native-shadow-cards';

let SplashScreen = NativeModules.SplashScreen;
const themeColor = 'rgb(255,17,87)';

class Test extends Component {

    constructor() {
        super();
    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            //安卓通过SplashScreen设置启动页
            this.timer = setTimeout(
                () => {
                    SplashScreen.hide();
                },
                0,
            );
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }


    /**
     * 方法处理
     */

    /**
     *  界面渲染
     */

    _nav() {
        return (
            <View>
                <StatusBar barStyle={'light-content'} translucent={true} backgroundColor={themeColor}/>
                <View style={[Style.barView, Style.rowBetweenCenter, {backgroundColor: themeColor}]}>
                    <Image style={[{
                        padding: ScreenUtil.scaleSizeW(15),
                        width: ScreenUtil.scaleSizeW(38),
                        height: ScreenUtil.scaleSizeW(38),
                        resizeMode: 'contain',
                    }]} source={require('./left.png')}/>
                    <Text style={[Style.barTitle, {fontSize: ScreenUtil.setSpFont(18)}]}>{'限量拼团'}</Text>
                    <Image style={[{
                        padding: ScreenUtil.scaleSizeW(15),
                        width: ScreenUtil.scaleSizeW(38),
                        height: ScreenUtil.scaleSizeW(38),
                        resizeMode: 'contain',
                    }]}/>
                </View>
            </View>
        );
    }

    _contains() {
        return (
            <View style={{flex: 1}}>
                <ScrollableTabView
                    renderTabBar={() =>
                        <MyScrollBar
                            style={[{borderBottomWidth: 0, backgroundColor: '#fff'}]}
                            tabStyle={{paddingLeft: 10, paddingRight: 10}}
                            inactiveTextColor={'#333'}
                            activeTextColor={themeColor}
                            textStyle={{fontSize: ScreenUtil.setSpFont(14)}}
                            underlineStyle={{
                                height: 0
                            }}
                        />
                    }
                >
                    <View style={{flex: 1}} tabLabel={'精选'}>
                        <ScrollView>
                            {this._barContent1()}
                        </ScrollView>
                    </View>
                    <View style={{flex: 1}} tabLabel={'休闲食品'}>
                        <ScrollView>
                            {this._list()}
                            {this._list()}
                        </ScrollView>
                    </View>
                    <View style={{flex: 1}} tabLabel={'天下粮仓'}>
                        <ScrollView>
                            {this._list()}
                            {this._list()}
                            {this._list()}
                        </ScrollView>
                    </View>
                    <View style={{flex: 1}} tabLabel={'健康保健'}>
                        <ScrollView>
                            {this._list()}
                            {this._list()}
                            {this._list()}
                            {this._list()}
                        </ScrollView>
                    </View>
                    <View style={{flex: 1}} tabLabel={'美妆母婴'}>
                        <ScrollView>
                            {this._list()}
                            {this._list()}
                        </ScrollView>
                    </View>

                </ScrollableTabView>
            </View>
        )
    }


    _barContent1() {
        return (
            <View style={{
                marginBottom: ScreenUtil.scaleSizeW(30)
            }}>
                {this._banner1()}
                {this._cardToDay()}
                {this._list()}
            </View>
        )
    }

    _banner1() {
        const bannerList = [
            {
                id: '1',
                imagePath: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590715471946&di=0da286825535b2a0cac60c8682ce237b&imgtype=0&src=http%3A%2F%2Fyouimg1.c-ctrip.com%2Ftarget%2Ftg%2F041%2F083%2F236%2Ffaa7507cf93245f6b7af5988d2530b56.jpg'
            },
            {
                id: '2',
                imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590715471945&di=7c59700d244ccfb42044561caaf33de3&imgtype=0&src=http%3A%2F%2Fstc.zjol.com.cn%2Fg1%2FM00036BCggSA1T3joKAYIe_AAGVwSAToug665.jpg%3Fwidth%3D720%26height%3D481"
            },
            {
                id: '3',
                imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590715471944&di=c3b833013ee081c62ed4fa8a1eb818b1&imgtype=0&src=http%3A%2F%2Ff.expoon.com%2Fnews%2F2014%2F09%2F11%2F689044.jpg"
            },
            {
                id: '4',
                imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590715471944&di=9ecbf973fefcee219cde517a25186418&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fphotoblog%2F4%2F4%2F3%2F6%2F4436387%2F200911%2F8%2F1257687527836_mthumb.jpg"
            },
        ];

        return (
            <View>
                <View style={[styles.bannerView, {height: bannerHeight}]}>
                    <Swiper
                        width={deviceWidth}
                        height={bannerHeight}
                        showsButtons={false}
                        removeClippedSubviews={false} //这个很主要啊，解决白屏问题
                        autoplay={true}
                        swipeEnabled={true}
                        horizontal={true}
                        showsPagination={true}
                        paginationStyle={styles.paginationStyle}
                        dotStyle={[styles.dotStyle]}
                        activeDotStyle={[styles.activeDotStyle]}
                    >
                        {
                            bannerList.map((data) => {
                                return (
                                    <TouchableHighlight
                                        underlayColor={'transparent'}
                                        onPress={() => this.bannerClick(data)}>
                                        <Image source={{uri: data.imagePath}}
                                               style={[styles.bannerViewImage, {height: bannerHeight}]}/>
                                    </TouchableHighlight>
                                );
                            })
                        }
                    </Swiper>
                </View>
                <View style={[styles.bannerBottom, Style.rowAroundCenter]}>
                    <View style={Style.rowCenterCenter}>
                        <Image style={styles.image1} source={require('./dom.png')}/>
                        <Text style={styles.font1}>{'正品好货'}</Text>
                    </View>
                    <View style={Style.rowCenterCenter}>
                        <Image style={styles.image1} source={require('./protect.png')}/>
                        <Text style={styles.font1}>{'全场包邮'}</Text>
                    </View>
                    <View style={Style.rowCenterCenter}>
                        <Image style={styles.image1} source={require('./love.png')}/>
                        <Text style={styles.font1}>{'大牌直供'}</Text>
                    </View>
                    <View style={Style.rowCenterCenter}>
                        <Image style={styles.image1} source={require('./pay.png')}/>
                        <Text style={styles.font1}>{'售后无忧'}</Text>
                    </View>
                </View>
            </View>
        )
    }

    _banner2() {
        return (
            <View style={[styles.bannerView, {height: ScreenUtil.scaleSizeW(520)}]}>
                <Swiper
                    width={deviceWidth}
                    height={bannerHeight}
                    showsButtons={false}
                    removeClippedSubviews={false} //这个很主要啊，解决白屏问题
                    autoplay={false}
                    swipeEnabled={true}
                    horizontal={true}
                    showsPagination={true}
                    paginationStyle={styles.paginationStyle1}
                    dotStyle={[styles.dotStyle, {backgroundColor: "#555"}]}
                    activeDotStyle={[styles.activeDotStyle, {backgroundColor: "#555"}]}
                >
                    {this._swpierChild()}
                    {this._swpierChild()}
                    {this._swpierChild()}
                </Swiper>
            </View>
        )
    }

    _swpierChild() {

        const data = [
            {
                id: '1',
                imagePath: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590715471946&di=0da286825535b2a0cac60c8682ce237b&imgtype=0&src=http%3A%2F%2Fyouimg1.c-ctrip.com%2Ftarget%2Ftg%2F041%2F083%2F236%2Ffaa7507cf93245f6b7af5988d2530b56.jpg',
                title: '精品荞麦粥品【精品礼盒】',
                number: 91411,
                price: 39,
            },
            {
                id: '2',
                imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590715471945&di=7c59700d244ccfb42044561caaf33de3&imgtype=0&src=http%3A%2F%2Fstc.zjol.com.cn%2Fg1%2FM00036BCggSA1T3joKAYIe_AAGVwSAToug665.jpg%3Fwidth%3D720%26height%3D481",
                title: '白藜麦【精品礼盒】',
                number: 550,
                price: 119,
            },
            {
                id: '3',
                imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590715471944&di=c3b833013ee081c62ed4fa8a1eb818b1&imgtype=0&src=http%3A%2F%2Ff.expoon.com%2Fnews%2F2014%2F09%2F11%2F689044.jpg",
                title: '精品藜麦粥品【精品礼盒】',
                number: 2432,
                price: 19,
            },
        ];

        return (
            <View style={[styles.bannerView2, Style.rowWarp]}>
                {
                    data.map((data) => {
                        return (
                            <View style={styles.childView}>
                                <Image style={styles.childView1} source={{uri: data.imagePath}}/>
                                <Text style={styles.font3}>
                                    {
                                        data.title ?
                                            data.title.length > 6 ?
                                                data.title.slice(0, 6) + '..' : data.title
                                            : ''
                                    }
                                </Text>
                                <Text style={styles.font4}>{'已拼'}{data.number}{'单'}</Text>
                                <View style={Style.rowBetweenCenter}>
                                    <Text style={styles.font2}>{'￥'}{data.price}</Text>
                                    <View style={[styles.buttonView, Style.rowCenterCenter]}>
                                        <Text style={styles.font6}>{'开团'}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }

            </View>
        )
    }

    _cardToDay() {
        return (
            <View style={[{width: deviceWidth}, Style.rowCenterCenter]}>
                <Card
                    cornerRadius={0}
                    opacity={0.1}
                    style={[styles.card]}>
                    <View style={styles.card1}>
                        <View style={[Style.rowCenterCenter, {height: ScreenUtil.scaleSizeW(80)}]}>
                            <View style={styles.line1}/>
                            <Text style={styles.font2}>{'今日必拼'}</Text>
                            <View style={styles.line2}/>
                        </View>
                        <View>
                            {this._banner2()}
                        </View>
                    </View>
                </Card>
            </View>
        )
    }

    _list() {
        const data = [
            {
                id: '1',
                imagePath: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590715471946&di=0da286825535b2a0cac60c8682ce237b&imgtype=0&src=http%3A%2F%2Fyouimg1.c-ctrip.com%2Ftarget%2Ftg%2F041%2F083%2F236%2Ffaa7507cf93245f6b7af5988d2530b56.jpg',
                title: '精品荞麦粥品【精品礼盒】',
                number: 2,
                priceOne: 39,
                priceTwo: 29,
                tips: ['包邮', '低脂肪', '天然']
            },
            {
                id: '2',
                imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590715471945&di=7c59700d244ccfb42044561caaf33de3&imgtype=0&src=http%3A%2F%2Fstc.zjol.com.cn%2Fg1%2FM00036BCggSA1T3joKAYIe_AAGVwSAToug665.jpg%3Fwidth%3D720%26height%3D481",
                title: '白藜麦【精品礼盒】',
                number: 2,
                priceOne: 19,
                priceTwo: 19,
                tips: ['包邮', '低脂肪', '天然']
            },
            {
                id: '3',
                imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590715471944&di=c3b833013ee081c62ed4fa8a1eb818b1&imgtype=0&src=http%3A%2F%2Ff.expoon.com%2Fnews%2F2014%2F09%2F11%2F689044.jpg",
                title: '精品藜麦粥品【精品礼盒】',
                number: 3,
                priceOne: 119,
                priceTwo: 109,
                tips: ['包邮', '低脂肪', '天然']
            },
        ];
        return (
            <View style={[Style.columnStartCenter, {width: deviceWidth, marginTop: ScreenUtil.scaleSizeW(0)}]}>
                {
                    data.map((info, i) => {
                        return (
                            <Card
                                cornerRadius={0}
                                opacity={0.1}
                                style={[styles.card2]}>
                                <View style={[styles.card1, Style.rowStartCenter]}>
                                    <Image style={styles.childView2} source={{uri: info.imagePath}}/>
                                    <View style={[{
                                        height: ScreenUtil.scaleSizeW(200),
                                        marginLeft: ScreenUtil.scaleSizeW(20)
                                    }, Style.columnBetween]}>
                                        <View>
                                            <Text style={styles.font7}>{info.title}</Text>
                                            <View style={Style.rowStartCenter}>
                                                {
                                                    info.tips.map((tip, j) => {
                                                        if (j == 1) {
                                                            return (
                                                                <View style={[styles.tipView, Style.rowCenterCenter]}>
                                                                    <Text style={styles.font5}>{tip}</Text>
                                                                </View>
                                                            )
                                                        } else {
                                                            return (
                                                                <View style={[styles.tipView1, Style.rowCenterCenter]}>
                                                                    <Text style={styles.font4}>{tip}</Text>
                                                                </View>
                                                            )
                                                        }
                                                    })
                                                }
                                            </View>
                                        </View>
                                        <View style={[Style.rowBetweenCenter, {width: ScreenUtil.scaleSizeW(440)}]}>
                                            <View>
                                                <Text style={styles.font4}>{'单人价'}{info.priceOne}</Text>
                                                <Text style={styles.font2}>
                                                    {info.number}{'人团'}
                                                    <Text style={styles.font8}>{' ￥'}{info.priceOne}</Text>
                                                </Text>
                                            </View>
                                            <View style={[styles.buttonView2, Style.rowCenterCenter]}>
                                                <Text style={styles.font6}>{'去拼团'}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </Card>
                        )
                    })
                }
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this._nav()}
                {this._contains()}
            </View>
        )
    }
}

export default Test;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(238,238,238)',
    },
    bannerView: {
        width: deviceWidth,
        marginTop: ScreenUtil.scaleSizeW(20)
    },
    bannerViewImage: {
        width: deviceWidth - ScreenUtil.scaleSizeW(30),
        marginLeft: ScreenUtil.scaleSizeW(15),
        marginRight: ScreenUtil.scaleSizeW(15),
        backgroundColor: Theme.color_3,
        borderRadius: ScreenUtil.scaleSizeW(10)
    },
    paginationStyle: {
        bottom: ScreenUtil.scaleSizeW(6 * 2),
        right: ScreenUtil.scaleSizeW(10 * 2),
        // left: null,
    },
    paginationStyle1: {
        bottom: ScreenUtil.scaleSizeW(10 * 2),
        right: ScreenUtil.scaleSizeW(10 * 2),
        // left: null,
    },
    dotStyle: {
        width: ScreenUtil.scaleSizeW(5 * 2),
        height: ScreenUtil.scaleSizeW(5 * 2),
        backgroundColor: '#fff',
        borderRadius: ScreenUtil.scaleSizeW(5),
        opacity: 0.5,
    },
    activeDotStyle: {
        width: ScreenUtil.scaleSizeW(6 * 2),
        height: ScreenUtil.scaleSizeW(6 * 2),
        backgroundColor: '#fff',
        borderRadius: ScreenUtil.scaleSizeW(6),
    },
    bannerBottom: {
        width: deviceWidth - ScreenUtil.scaleSizeW(30),
        marginLeft: ScreenUtil.scaleSizeW(15),
        marginRight: ScreenUtil.scaleSizeW(15),
        height: ScreenUtil.scaleSizeW(70)
    },
    image1: {
        width: ScreenUtil.scaleSizeW(23),
        height: ScreenUtil.scaleSizeW(23),
        resizeMode: 'contain'
    },
    font1: {
        color: '#bbb',
        fontSize: ScreenUtil.setSpFont(10),
        paddingLeft: ScreenUtil.scaleSizeW(10)
    },
    font2: {
        color: themeColor,
        fontSize: ScreenUtil.setSpFont(14),
        // paddingLeft: ScreenUtil.scaleSizeW(30),
        // paddingRight: ScreenUtil.scaleSizeW(30)
    },
    font3: {
        color: '#000',
        fontSize: ScreenUtil.setSpFont(12),
        // paddingLeft: ScreenUtil.scaleSizeW(30),
        // paddingRight: ScreenUtil.scaleSizeW(30)
        lineHeight: ScreenUtil.scaleSizeW(60)
    },
    font4: {
        color: '#aaa',
        fontSize: ScreenUtil.setSpFont(10),
    },
    font5: {
        color: themeColor,
        fontSize: ScreenUtil.setSpFont(10),
    },
    font6: {
        color: '#fff',
        fontSize: ScreenUtil.setSpFont(10),
    },
    font7: {
        color: '#000',
        fontSize: ScreenUtil.setSpFont(14),
        // paddingLeft: ScreenUtil.scaleSizeW(30),
        // paddingRight: ScreenUtil.scaleSizeW(30)
    },
    font8: {
        color: themeColor,
        fontSize: ScreenUtil.setSpFont(18),
        // paddingLeft: ScreenUtil.scaleSizeW(30),
        // paddingRight: ScreenUtil.scaleSizeW(30)
    },
    card: {
        width: deviceWidth - ScreenUtil.scaleSizeW(30),
        // height: ScreenUtil.scaleSizeH(180),
        backgroundColor: Theme.white,
        borderRadius: ScreenUtil.scaleSizeW(5),
        // padding: ScreenUtil.scaleSizeW(20),
        // borderWidth: ScreenUtil.pixelRatio(1),
        // borderColor: Theme.color_8,
    },
    card2: {
        width: deviceWidth - ScreenUtil.scaleSizeW(30),
        // height: ScreenUtil.scaleSizeH(180),
        backgroundColor: Theme.white,
        borderRadius: ScreenUtil.scaleSizeW(5),
        padding: ScreenUtil.scaleSizeW(20),
        // borderWidth: ScreenUtil.pixelRatio(1),
        // borderColor: Theme.color_8,
        marginTop: ScreenUtil.scaleSizeW(20)
    },
    card1: {
        width: deviceWidth - ScreenUtil.scaleSizeW(30),
    },
    line1: {
        width: ScreenUtil.scaleSizeW(140),
        height: ScreenUtil.pixelRatio(4),
        backgroundColor: "#ccc",
        marginRight: ScreenUtil.scaleSizeW(30),
        borderRadius: ScreenUtil.scaleSizeW(10),
    },
    line2: {
        width: ScreenUtil.scaleSizeW(140),
        height: ScreenUtil.pixelRatio(4),
        backgroundColor: "#ccc",
        marginLeft: ScreenUtil.scaleSizeW(30),
        borderRadius: ScreenUtil.scaleSizeW(10),
    },
    bannerView2: {
        width: deviceWidth - ScreenUtil.scaleSizeW(30),
    },
    childView: {
        width: (deviceWidth - ScreenUtil.scaleSizeW(30)) / 3 - ScreenUtil.scaleSizeW(21),
        height: ScreenUtil.scaleSizeW(300),
        backgroundColor: "rgb(238,238,238)",
        marginLeft: ScreenUtil.scaleSizeW(15),

    },
    childView1: {
        width: (deviceWidth - ScreenUtil.scaleSizeW(30)) / 3 - ScreenUtil.scaleSizeW(21),
        height: ScreenUtil.scaleSizeW(300),
        backgroundColor: "rgb(238,238,238)",
        resizeMode: "contain"
    },
    childView2: {
        width: ScreenUtil.scaleSizeW(200),
        height: ScreenUtil.scaleSizeW(200),
        resizeMode: "contain",
        backgroundColor: "rgb(238,238,238)",
    },
    buttonView: {
        height: ScreenUtil.scaleSizeW(40),
        paddingRight: ScreenUtil.scaleSizeW(10),
        paddingLeft: ScreenUtil.scaleSizeW(10),
        backgroundColor: themeColor,
        borderRadius: ScreenUtil.scaleSizeW(20)
    },
    buttonView2: {
        height: ScreenUtil.scaleSizeW(50),
        paddingRight: ScreenUtil.scaleSizeW(20),
        paddingLeft: ScreenUtil.scaleSizeW(20),
        backgroundColor: themeColor,
        borderRadius: ScreenUtil.scaleSizeW(40)
    },
    tipView: {
        height: ScreenUtil.scaleSizeW(30),
        paddingRight: ScreenUtil.scaleSizeW(15),
        paddingLeft: ScreenUtil.scaleSizeW(15),
        borderRadius: ScreenUtil.scaleSizeW(20),
        borderWidth: ScreenUtil.pixelRatio(2),
        borderColor: themeColor,
        marginRight: ScreenUtil.scaleSizeW(20),
        marginTop: ScreenUtil.scaleSizeW(10),
    },
    tipView1: {
        height: ScreenUtil.scaleSizeW(30),
        paddingRight: ScreenUtil.scaleSizeW(15),
        paddingLeft: ScreenUtil.scaleSizeW(15),
        borderRadius: ScreenUtil.scaleSizeW(20),
        borderWidth: ScreenUtil.pixelRatio(2),
        borderColor: '#ccc',
        marginRight: ScreenUtil.scaleSizeW(20),
        marginTop: ScreenUtil.scaleSizeW(10)
    }
});