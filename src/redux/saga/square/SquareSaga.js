/**
 * @author bingPo
 * @date 2020-04-05 10:24
 * @name: SquareSaga
 * @description：SquareSaga
 */
import {put, select, call, delay} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm';
import {SquareStateChange} from '../../action/square/SquareAction';
import {getData, getParamsData} from '../../../component/NetUtils';
import API from '../../../component/Api';
import Util from '../../../component/Util';
import Message from '../../../component/Message';
import * as TypeId from '../../../component/TypeId';
import {getArticleTop} from '../home/HomeSaga';

/**
 * 获取广场数据列表
 */
export function* getSquareList() {
    yield put(SquareStateChange({
        isLoading: true,
    }));

    const {squareList, page, isRefresh} = yield select(state => state.square);
    let response = yield call(getData.bind(this, {url: API.SQUARE_LIST + page + API.HOME_ARTICLE_LIST_END}));


    // console.log('getSquareList', response);

    yield put(SquareStateChange({
        isLoading: false,
    }));
    if (response == undefined) { //网络连接错误

        Util.showToast(Message.NETWORK_ERROR);
        return;
    }

    if (response.errorCode == TypeId.ERROR_CODE_1) {  //获取数据成功
        if (isRefresh) { //是刷新
            yield put(SquareStateChange({
                squareList: response.data.datas,
            }));
        } else {
            yield put(SquareStateChange({
                squareList: squareList.concat(response.data.datas),
            }));
        }
        yield put(SquareStateChange({
            isRefresh: false,
            font: page + 1 < response.data.pageCount ? 0 : 2,
        }));
    } else {  //获取失败
        Util.showToast(response.errorMsg);

    }
}

/**
 * 获取体系数据列表
 */
export function* getSquareSeries() {
    yield put(SquareStateChange({
        isLoading: true,
    }));
    let response = yield call(getData.bind(this, {url: API.SQUARE_SERIES}));


    // console.log('getSquareSeries', response);

    yield put(SquareStateChange({
        isLoading: false,
    }));
    if (response == undefined) { //网络连接错误

        Util.showToast(Message.NETWORK_ERROR);
        return;
    }

    if (response.errorCode == TypeId.ERROR_CODE_1) {  //获取数据成功
        yield put(SquareStateChange({
            seriesList: response.data,
        }));
    } else {  //获取失败
        Util.showToast(response.errorMsg);

    }
}

/**
 * 获取体系数据列表 二级菜单
 */
export function* getSquareSeriesDetails() {
    yield put(SquareStateChange({
        isLoading: true,
    }));
    const {seriesMenuSelected, seriesPage, seriesFont, seriesIsRefresh, seriesArticleList} = yield select(state => state.square);

    let params = {cid: seriesMenuSelected};
    let response = yield call(getParamsData.bind(this, {
        requestData: params,
        url: API.SQUARE_SERIES_LIST + seriesPage + API.HOME_ARTICLE_LIST_END,
    }));


    console.log('getSquareSeriesDetails', response);

    yield put(SquareStateChange({
        isLoading: false,
    }));
    if (response == undefined) { //网络连接错误

        Util.showToast(Message.NETWORK_ERROR);
        return;
    }
    if (response.errorCode == TypeId.ERROR_CODE_1) {  //获取数据成功
        if (seriesIsRefresh) { //刷新
            yield put(SquareStateChange({
                seriesArticleList: response.data.datas,
            }));
        } else {
            yield put(SquareStateChange({
                seriesArticleList: seriesArticleList.concat(response.data.datas),
            }));
        }
        yield put(SquareStateChange({
            seriesFont: seriesPage + 1 < response.data.pageCount ? 0 : 2,
            seriesIsRefresh: false,
        }));

    } else {  //获取失败
        Util.showToast(response.errorMsg);

    }
}

/**
 * 获取导航数据列表
 */
export function* getSquareNavigation() {
    yield put(SquareStateChange({
        isLoading: true,
    }));
    let response = yield call(getData.bind(this, {url: API.SQUARE_NAVIGATION}));


    // console.log('getSquareNavigation', response);

    yield put(SquareStateChange({
        isLoading: false,
    }));
    if (response == undefined) { //网络连接错误

        Util.showToast(Message.NETWORK_ERROR);
        return;
    }

    if (response.errorCode == TypeId.ERROR_CODE_1) {  //获取数据成功
        yield put(SquareStateChange({
            navigationList: response.data,
        }));
    } else {  //获取失败
        Util.showToast(response.errorMsg);

    }
}




