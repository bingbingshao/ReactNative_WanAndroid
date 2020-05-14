/**
 * @author bingPo
 * @date 2020-04-04 09:38
 * @name: NavigationReducer
 * @description：路由跳转reducer配置
 */
import {NavigationActions} from 'react-navigation';
import RootNavigator, {rootCom} from '../../../nav/Navigation';
import * as Types from '../../../component/ActionTypes';

const navState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams(rootCom));

const NavigatorReducer = (state = navState, action) => {
    let nextState;
    switch (action.type) {
        /**
         * 返回上一页
         */
        case Types.GO_BACK_PAGE:  //返回上一页
            nextState = RootNavigator.router.getStateForAction(
                NavigationActions.back(),
                state,
            );
            break;
        /**
         * 登录相关
         */
        case Types.GO_LOGIN:   //跳转登录页面
            nextState = RootNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'Login'}),
                state,
            );
            break;
        case Types.GO_REGISTER:   //跳转注册页面
            nextState = RootNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'Register'}),
                state,
            );
            break;
        /**
         * 首页相关
         */
        case Types.GO_SEARCH:   //跳转搜索页面
            nextState = RootNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'Search'}),
                state,
            );
            break;
        case Types.GO_SEARCH_RESULT:   //跳转搜索结果页面
            nextState = RootNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'SearchResult'}),
                state,
            );
            break;
        case Types.GO_WEB_VIEW:   //跳转网页显示页面
            nextState = RootNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'WebView'}),
                state,
            );
            break;
        /**
         * 广场相关
         */
        case Types.GO_SQUARE_SERIES_DETAILS:   //跳转广场提携二级菜单页面
            nextState = RootNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'SeriesDetails'}),
                state,
            );
            break;
        /**
         * 我的相关
         */
        case Types.GO_MY:   //跳转我的页面
            nextState = RootNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'My'}),
                state,
            );
            break;
        case Types.GO_MY_INTEGRAL:   //跳转我的积分页面
            nextState = RootNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'Integral'}),
                state,
            );
            break;
        case Types.GO_MY_INTEGRAL_HISTORY:   //跳转我的积分历史页面
            nextState = RootNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'IntegralHistory'}),
                state,
            );
            break;
        case Types.GO_MY_COLLECT:   //跳转我的收藏页面
            nextState = RootNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'Collect'}),
                state,
            );
            break;
        case Types.GO_MY_ARTICLE:   //跳转我的文章页面
            nextState = RootNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'Article'}),
                state,
            );
            break;
        case Types.GO_MY_WAIT_TO_DO:   //跳转待办清单页面
            nextState = RootNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'WaitToDo'}),
                state,
            );
            break;
        case Types.GO_MY_OPEN_SOURCE_NET:   //跳转开源网站页面
            nextState = RootNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'OpenSource'}),
                state,
            );
            break;
        case Types.GO_MY_JOIN_US:   //跳转加入我们页面
            nextState = RootNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'JoinUs'}),
                state,
            );
            break;
        case Types.GO_MY_SETTING:   //跳转系统设置页面
            nextState = RootNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'Setting'}),
                state,
            );
            break;
        case Types.GO_PUBLISH_ARTICLE:   //跳转分享文章页面
            nextState = RootNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'PublishArticle'}),
                state,
            );
            break;
        default:
            nextState = RootNavigator.router.getStateForAction(action, state);
            break;
    }
    return nextState || state;
};
export default NavigatorReducer;
