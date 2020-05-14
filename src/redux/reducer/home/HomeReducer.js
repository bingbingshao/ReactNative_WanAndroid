/**
 * @author bingPo
 * @date 2020-04-05 10:20
 * @name: HomeReducer
 * @description：HomeReducer
 */
import * as Types from '../../../component/ActionTypes';

const initialState = {
    isLoading: false, //是否加载

    bannerList: [], //轮播图列表
    articleList: [],//文章列表
    page: 0, //获取页
    font: 0,
    isRefresh: true,

    //search
    hotSearch: [],
    historySearch: [],
    searchText: '',
    searchData: [],
    searchPage: 0,
    searchFont: 0,

    //collect
    collectId: '',  //文章ID
    collectName: '',  //文章ID
    collectLink: '',  //文章ID

    //webView
    webData: [],
};

const HomeReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.HOME_STATE_CHANGE:
            return {...state, ...action.state};
        default:
            return state;
    }
};
export default HomeReducer;
