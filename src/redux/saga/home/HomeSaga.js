/**
 * @author bingPo
 * @date 2020-04-05 10:24
 * @name: HomeSaga
 * @description：HomeSaga
 */
import {put, select, call, delay} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm';
import {getData, postFormData, postFormDataToken, postJson} from '../../../component/NetUtils';
import API from '../../../component/Api';
import Util from '../../../component/Util';
import Message from '../../../component/Message';
import * as TypeId from '../../../component/TypeId';

import {HomeStateChange} from '../../action/home/HomeAction';

/**
 * 获取首页轮播
 */
export function* getHomeBanner() {
    let response = yield call(getData.bind(this, {url: API.HOME_BANNER}));

    // console.log('getHomeBanner', response);


    if (response == undefined) { //网络连接错误
        Util.showToast(Message.NETWORK_ERROR);
        return;
    }

    if (response.errorCode == TypeId.ERROR_CODE_1) {  //获取数据成功
        yield put(HomeStateChange({
            bannerList: response.data,
        }));

    } else {  //获取失败
        Util.showToast(response.errorMsg);

    }
}

/**
 * 获取首页文章列表
 */
export function* getHomeArticle() {
    yield put(HomeStateChange({
        isLoading: true,
    }));
    const {page, isRefresh, articleList} = yield select(state => state.home);

    let response = yield call(getData.bind(this, {url: API.HOME_ARTICLE_LIST + page + API.HOME_ARTICLE_LIST_END}));

    // console.log('getHomeArticle', response);

    yield put(HomeStateChange({
        isLoading: false,
    }));
    if (response == undefined) { //网络连接错误

        Util.showToast(Message.NETWORK_ERROR);
        return;
    }

    if (response.errorCode == TypeId.ERROR_CODE_1) {  //获取数据成功
        if (isRefresh) { //刷新
            yield put(HomeStateChange({
                articleList: response.data.datas,
            }));
            yield* getArticleTop();
        } else {
            yield put(HomeStateChange({
                articleList: articleList.concat(response.data.datas),
            }));
        }
        yield put(HomeStateChange({
            font: page + 1 < response.data.pageCount ? 0 : 2,
            isRefresh: false,
        }));

    } else {  //获取失败
        Util.showToast(response.errorMsg);

    }

}

/**
 * 获取置顶文章
 */
export function* getArticleTop() {

    const {articleList} = yield select(state => state.home);

    let response = yield call(getData.bind(this, {url: API.HOME_ARTICLE_LIST_TOP}));

    // console.log('getArticleTop', response);


    if (response == undefined) { //网络连接错误
        Util.showToast(Message.NETWORK_ERROR);
        return;
    }

    if (response.errorCode == TypeId.ERROR_CODE_1) {  //获取数据成功
        response.data.map((data) => {
            data.zhiding = true;
        });
        yield put(HomeStateChange({
            articleList: response.data.concat(articleList),
        }));

    } else {  //获取失败
        Util.showToast(response.errorMsg);

    }
}

/**
 * 获取目前搜索最多的关键词
 */
export function* getSearchHot() {


    let response = yield call(getData.bind(this, {url: API.SEARCH_HOT}));

    // console.log('getSearchHot', response);


    if (response == undefined) { //网络连接错误
        Util.showToast(Message.NETWORK_ERROR);
        return;
    }

    if (response.errorCode == TypeId.ERROR_CODE_1) {  //获取数据成功

        yield put(HomeStateChange({
            hotSearch: response.data,
        }));

    } else {  //获取失败
        Util.showToast(response.errorMsg);

    }
}

/**
 * 根据关键词搜索
 */
export function* getSearchData() {
    yield put(HomeStateChange({
        isLoading: true,
    }));
    const {searchText, searchPage, isRefresh, searchData} = yield select(state => state.home);

    let formData = new FormData();
    formData.append('k', searchText);
    let response = yield call(postFormData.bind(this, {
        requestData: formData,
        url: API.SEARCH_DATA + searchPage + API.HOME_ARTICLE_LIST_END,
    }));


    // console.log('getSearchData', response);
    // console.log('getSearchData', API.SEARCH_DATA + searchPage + API.HOME_ARTICLE_LIST_END);

    yield put(HomeStateChange({
        isLoading: false,
    }));
    if (response == undefined) { //网络连接错误

        Util.showToast(Message.NETWORK_ERROR);
        return;
    }

    if (response.errorCode == TypeId.ERROR_CODE_1) {  //获取数据成功
        if (isRefresh) { //刷新
            yield put(HomeStateChange({
                searchData: response.data.datas,
            }));
        } else {
            yield put(HomeStateChange({
                searchData: searchData.concat(response.data.datas),
            }));
        }
        yield put(HomeStateChange({
            searchFont: searchPage + 1 < response.data.pageCount ? 0 : 2,
            isRefresh: false,
        }));

    } else {  //获取失败
        Util.showToast(response.errorMsg);

    }

}

/**
 * 收藏文章
 */
export function* getCollectArticle() {
    yield put(HomeStateChange({
        isLoading: true,
    }));
    const {collectId, articleList} = yield select(state => state.home);


    let response = yield call(postJson.bind(this, {url: API.COLLECT_ARTICLE + collectId + API.HOME_ARTICLE_LIST_END}));

    console.log('getCollectArticle', response);

    yield put(HomeStateChange({
        isLoading: false,
    }));
    if (response == undefined) { //网络连接错误

        Util.showToast(Message.NETWORK_ERROR);
        return;
    }

    if (response.errorCode == TypeId.ERROR_CODE_1) {  //获取数据成功


    } else {  //获取失败
        // Util.showToast(response.errorMsg);

    }

}

/**
 * 删除收藏文章
 */
export function* getDeleteCollectArticle() {
    yield put(HomeStateChange({
        isLoading: true,
    }));
    const {collectId, articleList} = yield select(state => state.home);

    let response = yield call(postJson.bind(this, {url: API.DELETE_COLLECT_ARTICLE + collectId + API.HOME_ARTICLE_LIST_END}));

    console.log('getDeleteCollectArticle', response);

    yield put(HomeStateChange({
        isLoading: false,
    }));
    if (response == undefined) { //网络连接错误

        Util.showToast(Message.NETWORK_ERROR);
        return;
    }

    if (response.errorCode == TypeId.ERROR_CODE_1) {  //获取数据成功


    } else {  //获取失败
        // Util.showToast(response.errorMsg);

    }

}

/**
 * 收藏网址
 */
export function* getCollectNet() {
    yield put(HomeStateChange({
        isLoading: true,
    }));
    const {collectId, articleList, collectName, collectLink} = yield select(state => state.home);

    let formData = new FormData();
    formData.append('id', collectId);
    formData.append('name', collectName);
    formData.append('link', collectLink);
    let response = yield call(postFormData.bind(this, {requestData: formData, url: API.COLLECT_NET}));

    console.log('getCollectNet', response);
    console.log('getCollectNet', formData);

    yield put(HomeStateChange({
        isLoading: false,
    }));
    if (response == undefined) { //网络连接错误

        Util.showToast(Message.NETWORK_ERROR);
        return;
    }

    if (response.errorCode == TypeId.ERROR_CODE_1) {  //获取数据成功


    } else {  //获取失败
        // Util.showToast(response.errorMsg);

    }

}

/**
 * 删除收藏网址
 */
export function* getDeleteCollectNet() {
    yield put(HomeStateChange({
        isLoading: true,
    }));
    const {collectId, articleList} = yield select(state => state.home);

    let formData = new FormData();
    formData.append('id', collectId);
    let response = yield call(postFormData.bind(this, {requestData: formData, url: API.DELETE_COLLECT_ARTICLE}));

    console.log('getDeleteCollectNet', response);
    console.log('getDeleteCollectNet', formData);

    yield put(HomeStateChange({
        isLoading: false,
    }));
    if (response == undefined) { //网络连接错误

        Util.showToast(Message.NETWORK_ERROR);
        return;
    }

    if (response.errorCode == TypeId.ERROR_CODE_1) {  //获取数据成功


    } else {  //获取失败
        // Util.showToast(response.errorMsg);

    }

}

