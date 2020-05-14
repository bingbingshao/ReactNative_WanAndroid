/**
 * @author bingPo
 * @date 2020-04-04 09:37
 * @name: NavigationAction
 * @description：路由跳转action配置
 */
import * as Types from '../../component/ActionTypes';

export const goBackPage = () => { //返回上一页
    return {
        type: Types.GO_BACK_PAGE,
    };
};

export const goLogin = () => { //跳转登录
    return {
        type: Types.GO_LOGIN,
    };
};
export const goRegister = () => { //跳转注册页面
    return {
        type: Types.GO_REGISTER,
    };
};


export const goSearch = () => { //跳转搜索
    return {
        type: Types.GO_SEARCH,
    };
};
export const goSearchResult = () => { //跳转搜索结果
    return {
        type: Types.GO_SEARCH_RESULT,
    };
};
export const goWebView = () => { //跳转webview显示页面
    return {
        type: Types.GO_WEB_VIEW,
    };
};

export const goSquareSeriesDetails = () => { //跳转广场提携二级菜单页面
    return {
        type: Types.GO_SQUARE_SERIES_DETAILS,
    };
};

export const goMy = () => { //跳转我的页面
    return {
        type: Types.GO_MY,
    };
};
export const goMyIntegral = () => { //跳转我的积分
    return {
        type: Types.GO_MY_INTEGRAL,
    };
};
export const goMyIntegralHistory = () => { //跳转我的积分历史
    return {
        type: Types.GO_MY_INTEGRAL_HISTORY,
    };
};
export const goMyCollect = () => { //跳转我的收藏
    return {
        type: Types.GO_MY_COLLECT,
    };
};
export const goMyArticle = () => { //跳转我的文章
    return {
        type: Types.GO_MY_ARTICLE,
    };
};
export const goMyWaitToDo = () => { //跳转待办清单
    return {
        type: Types.GO_MY_WAIT_TO_DO,
    };
};
export const goMyOpenSourceNet = () => { //跳转开源网站
    return {
        type: Types.GO_MY_OPEN_SOURCE_NET,
    };
};
export const goMyJoinUs = () => { //跳转加入我们
    return {
        type: Types.GO_MY_JOIN_US,
    };
};
export const goMySetting = () => { //跳转系统设置
    return {
        type: Types.GO_MY_SETTING,
    };
};
export const goPublishArticle = () => { //跳转分享文章页面
    return {
        type: Types.GO_PUBLISH_ARTICLE,
    };
};
