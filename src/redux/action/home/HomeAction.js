/**
 * @author bingPo
 * @date 2020-04-05 10:16
 * @name: HomeAction
 * @description：HomeAction
 */

import * as Types from '../../../component/ActionTypes';

//首页状态更改
export const HomeStateChange = (state) => {
    return {
        type: Types.HOME_STATE_CHANGE,
        state: state,
    };
};
//首页获取轮播列表
export const HomeBanner = (state) => {
    return {
        type: Types.HOME_BANNER,
        state: state,
    };
};
//首页获取文章列表
export const HomeArticle = (state) => {
    return {
        type: Types.HOME_ARTICLE,
        state: state,
    };
};

//首页获取目前搜索最多的关键词
export const SearchHot = (state) => {
    return {
        type: Types.SEARCH_HOT,
        state: state,
    };
};

//首页根据关键词搜索
export const SearchData = (state) => {
    return {
        type: Types.SEARCH_DATA,
        state: state,
    };
};

//首页收藏文章
export const CollectArticle = (state) => {
    return {
        type: Types.COLLECT_ARTICLE,
        state: state,
    };
};

//首页取消收藏文章
export const CollectArticleDelete = (state) => {
    return {
        type: Types.COLLECT_ARTICLE_DELETE,
        state: state,
    };
};

//首页收藏网址
export const CollectNet = (state) => {
    return {
        type: Types.COLLECT_NET,
        state: state,
    };
};

//首页取消收藏网址
export const CollectNetDelete = (state) => {
    return {
        type: Types.COLLECT_NET_DELETE,
        state: state,
    };
};
