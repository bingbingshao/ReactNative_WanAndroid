/**
 * @author bingPo
 * @date 2020-04-04 09:36
 * @name: index
 * @description：reducer 汇总
 */
import {combineReducers} from 'redux';
import {rootCom, RootNavigator} from '../../nav/Navigation';

//导航
import NavigationReducer from './nav/NavigationReducer';

//主题
import ThemeReducer from './theme/ThemeReducer';

//首页
import HomeReducer from './home/HomeReducer';

//项目
import ProjectReducer from './project/ProjectReducer';

//广场
import SquareReducer from './square/SquareReducer';

//公众号
import AccountReducer from './account/AccountReducer';

//登录
import LoginReducer from './login/LoginReducer';

//我的
import MyReducer from './my/MyReducer';

//1.指定默认state
const navState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams(rootCom));

/**
 * 2.创建自己的 navigation reducer，
 */
const navReducer = (state = navState, action) => {
    const nextState = RootNavigator.router.getStateForAction(action, state);
    // 如果`nextState`为null或未定义，只需返回原始`state`
    return nextState || state;
};

/**
 * 3.合并reducer
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */
const index = combineReducers({
    nav: NavigationReducer,
    theme: ThemeReducer,
    home: HomeReducer,
    project: ProjectReducer,
    square: SquareReducer,
    account: AccountReducer,
    login: LoginReducer,
    my: MyReducer,
});
export default index;
