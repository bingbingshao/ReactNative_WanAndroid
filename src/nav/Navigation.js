/**
 * @author bingPo
 * @date 2020-04-04 09:23
 * @name: Navigation
 * @description：Navigation
 */
import React from 'react';
import {
    View,
    Text,
    Platform
} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {connect} from 'react-redux';
import {createStackNavigator, CardStyleInterpolators} from 'react-navigation-stack';
import {createSwitchNavigator} from 'react-navigation';
import {createReactNavigationReduxMiddleware, createReduxContainer} from 'react-navigation-redux-helpers';
import ScreenUtil from '../component/ScreenUtil';
import Theme from '../component/Theme';
import Message from '../component/Message';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Home from '../view/home';
import Search from '../view/home/Search';
import SearchResult from '../view/home/SearchResult';
import WebView from '../view/home/WebView';

import Project from '../view/project';

import Square from '../view/square';
import SeriesDetails from '../view/square/SeriesDetails';

import Account from '../view/account';

import My from '../view/my';
import Integral from '../view/my/Integral';
import IntegralHistory from '../view/my/IntegralHistory';
import Collect from '../view/my/Collect';
import Article from '../view/my/Article';
import WaitToDo from '../view/my/WaitToDo';
import OpenSource from '../view/my/OpenSource';
import JoinUs from '../view/my/JoinUs';
import Setting from '../view/my/Setting';
import PublishArticle from '../view/my/PublishArticle';

import Login from '../view/login/Login';
import Register from '../view/login/Register';


const navHeight = Platform.OS === 'ios' ? ScreenUtil.scaleSizeH(35 * 2) : ScreenUtil.scaleSizeH(45 * 2);


const RootTabs = createBottomTabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                tabBarLabel: Message.HOME,
                tabBarIcon: ({tintColor, focused}) => (
                    <View>
                        <FontAwesome
                            name={'home'}
                            color={tintColor}
                            size={focused ? ScreenUtil.setSpFont(24) : ScreenUtil.setSpFont(22)}/>
                    </View>
                ),
            },
        },
        Project: {
            screen: Project,
            navigationOptions: {
                tabBarLabel: Message.PROJECT,
                tabBarIcon: ({tintColor, focused}) => (
                    <View>
                        <FontAwesome
                            name={'leanpub'}
                            color={tintColor}
                            size={focused ? ScreenUtil.setSpFont(22) : ScreenUtil.setSpFont(20)}/>
                    </View>
                ),
            },
        },
        Square: {
            screen: Square,
            navigationOptions: {
                tabBarLabel: Message.SQUARE,
                tabBarIcon: ({tintColor, focused}) => (
                    <View>
                        <FontAwesome
                            name={'th-large'}
                            color={tintColor}
                            size={focused ? ScreenUtil.setSpFont(22) : ScreenUtil.setSpFont(20)}/>
                    </View>
                ),
            },
        },
        Account: {
            screen: Account,
            navigationOptions: {
                tabBarLabel: Message.ACCOUNT,
                tabBarIcon: ({tintColor, focused}) => (
                    <View>
                        <FontAwesome
                            name={'wechat'}
                            color={tintColor}
                            size={focused ? ScreenUtil.setSpFont(20) : ScreenUtil.setSpFont(18)}/>
                    </View>
                ),
            },
        },
        My: {
            screen: My,
            navigationOptions: {
                tabBarLabel: Message.MY,
                tabBarIcon: ({tintColor, focused}) => (
                    <View>
                        <FontAwesome
                            name={'user'}
                            color={tintColor}
                            size={focused ? ScreenUtil.setSpFont(22) : ScreenUtil.setSpFont(20)}/>
                    </View>
                ),
            },
        },
    },
    {
        swipeEnabled: true, // 是否允许横向滑动
        initialRouteName: 'Home', // 设置默认的页面组件
        lazy: true, // 在app打开的时候将底部标签栏全部加载，默认false,推荐改成true
        tabBarPosition: 'bottom', // 设置tabbar的位置，iOS默认在底部，安卓默认在顶部。（属性值：'top'，'bottom')
        initialRouteParams: {data: 12},
        tabBarOptions: {
            showIcon: true, // 是否显示图标，默认关闭。
            showLabel: true, //是否显示label，默认开启。
            // activeTintColor: Theme.themeColor,
            activeTintColor: Theme.themeColor,
            inactiveTintColor: Theme.unSelectColor,
            // inactiveTintColor: Theme.unSelectColor,
            indicatorStyle: {height: 0},
            style: {
                // marginTop:10,
                padding: 0,
                backgroundColor: '#fff',
                height: navHeight,
                zIndex: 0,
                position: 'relative',
                // borderTopWidth: 0,
            },
            labelStyle: {
                fontSize: ScreenUtil.setSpFont(10),
                paddingVertical: 0,
                marginTop: -4,
            },
            iconStyle: {
                marginTop: 0,
            },
        },
        animationEnabled: true,
    },
);
const Navigator = createStackNavigator(
    {
        /**
         * 导航模块
         */
        BottomNav: {screen: RootTabs},
        Login: {screen: Login},
        Register: {screen: Register},

        Search: {screen: Search},
        SearchResult: {screen: SearchResult},
        WebView: {screen: WebView},

        SeriesDetails: {screen: SeriesDetails},

        Integral: {screen: Integral},
        IntegralHistory: {screen: IntegralHistory},
        Collect: {screen: Collect},
        Article: {screen: Article},
        WaitToDo: {screen: WaitToDo},
        OpenSource: {screen: OpenSource},
        JoinUs: {screen: JoinUs},
        Setting: {screen: Setting},
        PublishArticle: {screen: PublishArticle},
    }, {
        // initialRouteName: 'PublishArticle',
        initialRouteName: 'BottomNav',
        defaultNavigationOptions: {
            headerShown: false,
            cardStyleInterpolator: (props) => CardStyleInterpolators.forHorizontalIOS(props),
        },
    },
);
/**
 *  设置根路由
 */
export const rootCom = 'Init';
export const RootNavigator = createSwitchNavigator(
    {
        Init: Navigator,
    }, {
        navigationOptions: {
            header: null,
        },
    },
);
/**
 * 1.初始化react-navigation与redux的中间件，
 * 该方法的一个很大的作用就是为reduxifyNavigator的key设置actionSubscribers(行为订阅者)
 * 设置订阅者@https://github.com/react-navigation/react-navigation-redux-helpers/blob/master/src/middleware.js#L29
 * 检测订阅者是否存在@https://github.com/react-navigation/react-navigation-redux-helpers/blob/master/src/middleware.js#L97
 * @type {Middleware}
 */
export const middleware = createReactNavigationReduxMiddleware(
    state => state.nav,
    'root',
);
/**
 * 2.将根导航器组件传递给 reduxifyNavigator 函数,
 * 并返回一个将navigation state 和 dispatch 函数作为 props的新组件；
 * 注意：要在createReactNavigationReduxMiddleware之后执行
 */
const AppWithNavigationState = createReduxContainer(RootNavigator, 'root');

/**
 * State到Props的映射关系
 * @param state
 */
const mapStateToProps = state => ({
    state: state.nav,//v2
});
/**
 * 3.连接 React 组件与 Redux store
 */
export default connect(mapStateToProps)(AppWithNavigationState);
