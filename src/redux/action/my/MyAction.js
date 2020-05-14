/**
 * @author bingPo
 * @date 2020-04-05 10:16
 * @name: MyAction
 * @description：MyAction
 */

import * as Types from '../../../component/ActionTypes';

//我的状态更改
export const MyStateChange = (state) => {
    return {
        type: Types.MY_STATE_CHANGE,
        state: state,
    };
};

//获取登录用户的信息
export const MyInformation = (state) => {
    return {
        type: Types.MY_INFORMATION,
        state: state,
    };
};

//发布文章
export const PublishArticleLink = (state) => {
    return {
        type: Types.PUBLISH_ARTICLE,
        state: state,
    };
};


//获取积分排行榜
export const MyIntegral = (state) => {
    return {
        type: Types.MY_INTEGRAL,
        state: state,
    };
};

//获取我的积分历史
export const MyIntegralHistory = (state) => {
    return {
        type: Types.MY_INTEGRAL_HISTORY,
        state: state,
    };
};


//获取我的收藏的文章
export const MyCollectArticle = (state) => {
    return {
        type: Types.MY_COLLECT_ARTICLE,
        state: state,
    };
};

//获取我的收藏的网址
export const MyCollectNet = (state) => {
    return {
        type: Types.MY_COLLECT_NET,
        state: state,
    };
};

//获取我的文章
export const MyArticle = (state) => {
    return {
        type: Types.MY_ARTICLE,
        state: state,
    };
};

//获取我的文章
export const MyArticleDelete = (state) => {
    return {
        type: Types.MY_ARTICLE_DELETE,
        state: state,
    };
};
