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


import RootTabs from './BottomBar';


const navHeight = Platform.OS === 'ios' ? ScreenUtil.scaleSizeH(35 * 2) : ScreenUtil.scaleSizeH(45 * 2);



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
