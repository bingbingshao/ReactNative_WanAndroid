/**
 * @author bingPo
 * @date 2020-04-04 10:10
 * @name: MySaga
 * @description：MySaga
 */

import {put, select, call, delay} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm';
import {MyStateChange} from '../../action/my/MyAction.js';
import {getData, postFormData, postJson} from '../../../component/NetUtils';
import API from '../../../component/Api';
import Util from '../../../component/Util';
import Message from '../../../component/Message';
import * as TypeId from '../../../component/TypeId';
import Store from 'react-native-simple-store';
import {DeviceEventEmitter} from 'react-native';
import {goMy, goBackPage} from '../../action/NavigationAction';
import {SquareStateChange} from '../../action/square/SquareAction';
import {HomeStateChange} from '../../action/home/HomeAction';

/**
 * 获取登录用户的信息
 */
export function* getMyInformation() {
    yield put(MyStateChange({
        isLoading: true,
    }));
    let response = yield call(getData.bind(this, {url: API.MY_RANG_INFO}));


    // console.log('getMyInformation', response);

    yield put(MyStateChange({
        isLoading: false,
    }));
    if (response == undefined) { //网络连接错误

        Util.showToast(Message.NETWORK_ERROR);
        return;
    }

    if (response.errorCode == TypeId.ERROR_CODE_1) {  //获取数据成功
        yield put(MyStateChange({
            range: response.data.rank, //排名
            grade: response.data.coinCount, //分数,
        }));
    } else {  //获取失败
        Util.showToast(response.errorMsg);

    }


}


/**
 * 发布文章
 */
export function* getPublishArticle() {
    yield put(MyStateChange({
        isLoading: true,
    }));
    const {title, link} = yield select(state => state.my);

    let formData = new FormData();
    formData.append('title', title);
    formData.append('link', link);
    let response = yield call(postFormData.bind(this, {requestData: formData, url: API.PUBLISH_ARTICLE}));


    console.log('getPublishArticle', response);

    yield put(MyStateChange({
        isLoading: false,
    }));
    if (response == undefined) { //网络连接错误

        Util.showToast(Message.NETWORK_ERROR);
        return;
    }

    if (response.errorCode == TypeId.ERROR_CODE_1) {  //获取数据成功
        Util.showToast('分享成功');
        DeviceEventEmitter.emit(TypeId.ARTICLE_SUCCESS);
        yield put(goBackPage());
    } else {  //获取失败
        Util.showToast(response.errorMsg);
    }


}


/**
 * 获取积分排行榜
 */
export function* getMyIntegral() {
    yield put(MyStateChange({
        isLoading: true,
    }));
    const {page1, isRefresh1, integralList} = yield select(state => state.my);

    let response = yield call(getData.bind(this, {url: API.MY_INTEGRAL + page1 + API.HOME_ARTICLE_LIST_END}));


    // console.log('getMyIntegral', response);
    DeviceEventEmitter.emit(TypeId.INTEGRAL_GET_SUCCESS); //积分列表数据获取成功

    yield put(MyStateChange({
        isLoading: false,
    }));
    if (response == undefined) { //网络连接错误

        Util.showToast(Message.NETWORK_ERROR);
        return;
    }

    if (response.errorCode == TypeId.ERROR_CODE_1) {  //获取数据成功
        if (isRefresh1) { //是刷新
            yield put(MyStateChange({
                integralList: response.data.datas,
            }));
        } else {
            yield put(MyStateChange({
                integralList: integralList.concat(response.data.datas),
            }));
        }
        yield put(MyStateChange({
            isRefresh1: false,
            font1: page1 + 1 < response.data.pageCount ? 0 : 2,
        }));
    } else {  //获取失败
        Util.showToast(response.errorMsg);
    }


}

/**
 * 获取我的积分历史
 */
export function* getMyIntegralHistory() {
    yield put(MyStateChange({
        isLoading: true,
    }));
    const {page2, isRefresh2, integralHistoryList} = yield select(state => state.my);

    let response = yield call(getData.bind(this, {url: API.MY_INTEGRAL_HISTORY + page2 + API.HOME_ARTICLE_LIST_END}));


    DeviceEventEmitter.emit(TypeId.INTEGRAL_HISTORY_GET_SUCCESS); //积分历史列表数据获取成功


    // console.log('getMyIntegral', response);

    yield put(MyStateChange({
        isLoading: false,
    }));
    if (response == undefined) { //网络连接错误

        Util.showToast(Message.NETWORK_ERROR);
        return;
    }

    if (response.errorCode == TypeId.ERROR_CODE_1) {  //获取数据成功
        if (isRefresh2) { //是刷新
            yield put(MyStateChange({
                integralHistoryList: response.data.datas,
            }));
        } else {
            yield put(MyStateChange({
                integralHistoryList: integralHistoryList.concat(response.data.datas),
            }));
        }
        yield put(MyStateChange({
            isRefresh2: false,
            font2: page2 + 1 < response.data.pageCount ? 0 : 2,
        }));
    } else {  //获取失败
        Util.showToast(response.errorMsg);
    }


}

/**
 * 获取我的收藏的文章
 */
export function* getMyCollectArticle() {
    yield put(MyStateChange({
        isLoading: true,
    }));
    const {page3, isRefresh3, collectList} = yield select(state => state.my);

    let response = yield call(getData.bind(this, {url: API.MY_ARTICLE_COLLECT_LIST + page3 + API.HOME_ARTICLE_LIST_END}));


    // console.log('getMyCollectArticle', response);

    yield put(MyStateChange({
        isLoading: false,
    }));
    if (response == undefined) { //网络连接错误

        Util.showToast(Message.NETWORK_ERROR);
        return;
    }

    if (response.errorCode == TypeId.ERROR_CODE_1) {  //获取数据成功
        if (isRefresh3) { //是刷新
            yield put(MyStateChange({
                collectList: response.data.datas,
            }));
        } else {
            yield put(MyStateChange({
                collectList: collectList.concat(response.data.datas),
            }));
        }
        yield put(MyStateChange({
            isRefresh3: false,
            font3: page3 + 1 < response.data.pageCount ? 0 : 2,
        }));
    } else {  //获取失败
        Util.showToast(response.errorMsg);
    }


}


/**
 * 获取我的收藏的网址
 */
export function* getMyCollectNet() {
    yield put(MyStateChange({
        isLoading: true,
    }));

    let response = yield call(getData.bind(this, {url: API.MY_NET_COLLECT_LIST}));


    // console.log('getMyCollectNet', response);

    yield put(MyStateChange({
        isLoading: false,
    }));
    if (response == undefined) { //网络连接错误

        Util.showToast(Message.NETWORK_ERROR);
        return;
    }

    if (response.errorCode == TypeId.ERROR_CODE_1) {  //获取数据成功
        yield put(MyStateChange({
            isRefresh3: false,
            collectNetList: response.data,
        }));
    } else {  //获取失败
        Util.showToast(response.errorMsg);
    }


}

/**
 * 获取我的文章
 */
export function* getMyArticle() {
    yield put(MyStateChange({
        isLoading: true,
    }));
    const {page4, isRefresh4, ArticleList} = yield select(state => state.my);

    let response = yield call(getData.bind(this, {url: API.MY_ARTICLE + page4 + API.HOME_ARTICLE_LIST_END}));


    DeviceEventEmitter.emit(TypeId.MY_ARTICLE_SUCCESS); //积分历史列表数据获取成功
    //
    // console.log('getMyArticle', response);

    yield put(MyStateChange({
        isLoading: false,
    }));
    if (response == undefined) { //网络连接错误

        Util.showToast(Message.NETWORK_ERROR);
        return;
    }

    if (response.errorCode == TypeId.ERROR_CODE_1) {  //获取数据成功
        if (!Util.checkIsEmptyString(response.data.shareArticles)) {
            if (isRefresh4) { //是刷新
                yield put(MyStateChange({
                    ArticleList: response.data.shareArticles.datas,
                }));
            } else {
                yield put(MyStateChange({
                    ArticleList: ArticleList.concat(response.data.shareArticles.datas),
                }));
            }
            yield put(MyStateChange({
                isRefresh4: false,
                font4: page4 + 1 < response.data.shareArticles.pageCount ? 0 : 2,
            }));
        }
    } else {  //获取失败
        Util.showToast(response.errorMsg);
    }

}


/**
 * 删除我的文章
 */
export function* getMyArticleDelete() {
    yield put(MyStateChange({
        isLoading: false,
    }));

    const {deleteArticleId} = yield select(state => state.my);
    let response = yield call(postJson.bind(this, {url: API.MY_ARTICLE_DELETE + deleteArticleId + API.HOME_ARTICLE_LIST_END}));


    console.log('getMyArticleDelete', response);
    console.log('getMyArticleDelete', API.MY_ARTICLE_DELETE + deleteArticleId + API.HOME_ARTICLE_LIST_END);

    yield put(MyStateChange({
        isLoading: false,
    }));
    if (response == undefined) { //网络连接错误

        Util.showToast(Message.NETWORK_ERROR);
        return;
    }

    if (response.errorCode == TypeId.ERROR_CODE_1) {  //获取数据成功
        DeviceEventEmitter.emit(TypeId.ARTICLE_SUCCESS);
    } else {  //获取失败
        Util.showToast(response.errorMsg);
    }

}
