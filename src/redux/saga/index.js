/**
 * @author bingPo
 * @date 2020-04-04 10:10
 * @name: index
 * @description：index
 */
import {takeLatest, put, takeEvery} from 'redux-saga/effects';
import * as Types from '../../component/ActionTypes';

//登录模块
import {login, register, logout} from './login/LoginSaga';
//首页模块
import {
    getHomeBanner,
    getHomeArticle,
    getSearchHot,
    getSearchData,
    getCollectArticle,
    getDeleteCollectArticle,
    getCollectNet,
    getDeleteCollectNet,
} from './home/HomeSaga';
//项目模块
import {getProjectMenu, getProjectList} from './project/ProjectSaga';

//广场模块
import {getSquareList, getSquareNavigation, getSquareSeries, getSquareSeriesDetails} from './square/SquareSaga';

//公众号模块
import {getAccountList, getAccountMenu} from './account/AccountSaga';

//我的模块
import {
    getMyCollectArticle, getMyCollectNet,
    getMyInformation,
    getMyIntegral,
    getMyIntegralHistory,
    getPublishArticle,
    getMyArticle, getMyArticleDelete,
} from './my/MySaga';


export default function* rootSaga() {
    //登录
    yield takeLatest(Types.LOGIN, login);
    yield takeLatest(Types.REGISTER, register);
    yield takeLatest(Types.LOGOUT, logout);
    //首页
    yield takeLatest(Types.HOME_BANNER, getHomeBanner);
    yield takeLatest(Types.HOME_ARTICLE, getHomeArticle);
    yield takeLatest(Types.SEARCH_HOT, getSearchHot);
    yield takeLatest(Types.SEARCH_DATA, getSearchData);
    yield takeLatest(Types.COLLECT_ARTICLE, getCollectArticle);
    yield takeLatest(Types.COLLECT_ARTICLE_DELETE, getDeleteCollectArticle);
    yield takeLatest(Types.COLLECT_NET, getCollectNet);
    yield takeLatest(Types.COLLECT_NET_DELETE, getDeleteCollectNet);
    //项目
    yield takeLatest(Types.PROJECT_MENU, getProjectMenu);
    yield takeLatest(Types.PROJECT_LIST, getProjectList);
    //广场
    yield takeLatest(Types.SQUARE_LIST, getSquareList);
    yield takeLatest(Types.SQUARE_SERIES, getSquareSeries);
    yield takeLatest(Types.SQUARE_SERIES_DETAILS, getSquareSeriesDetails);
    yield takeLatest(Types.SQUARE_NAVIGATION, getSquareNavigation);
    //公众号
    yield takeLatest(Types.ACCOUNT_MENU, getAccountMenu);
    yield takeLatest(Types.ACCOUNT_LIST, getAccountList);
    //我的
    yield takeLatest(Types.MY_INFORMATION, getMyInformation);
    yield takeLatest(Types.PUBLISH_ARTICLE, getPublishArticle);
    yield takeLatest(Types.MY_INTEGRAL, getMyIntegral);
    yield takeLatest(Types.MY_INTEGRAL_HISTORY, getMyIntegralHistory);
    yield takeLatest(Types.MY_COLLECT_ARTICLE, getMyCollectArticle);
    yield takeLatest(Types.MY_COLLECT_NET, getMyCollectNet);
    yield takeLatest(Types.MY_ARTICLE, getMyArticle);
    yield takeLatest(Types.MY_ARTICLE_DELETE, getMyArticleDelete);
}
