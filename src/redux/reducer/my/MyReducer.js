/**
 * @author bingPo
 * @date 2020-04-05 10:20
 * @name: MyReducer
 * @description：MyReducer
 */
import * as Types from '../../../component/ActionTypes';

const initialState = {
    isLoading: false, //是否加载
    range: '--', //排名
    grade: 0, //分数,


    //分享文章
    title: '',
    link: '',
    showTip: false,

    //积分排行榜
    integralList: [],
    page1: 0,
    font1: 0,
    isRefresh1: true,
    integralHistoryList: [],
    page2: 0,
    font2: 0,
    isRefresh2: true,

    //收藏
    collectList: [],
    font3: 0,
    page3: 0,
    isRefresh3: true,
    collectNetList: [],

    //我的文章
    ArticleList: [],
    page4: 0,
    font4: 0,
    isRefresh: true,
    deleteShow: false,
    deleteArticleId:''

};

const MyReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.MY_STATE_CHANGE:
            return {...state, ...action.state};
        default:
            return state;
    }
};
export default MyReducer;
