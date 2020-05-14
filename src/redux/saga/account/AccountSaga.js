/**
 * @author bingPo
 * @date 2020-04-05 10:24
 * @name: AccountSaga
 * @description：AccountSaga
 */
import {put, select, call, delay} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm';
import {AccountStateChange} from '../../action/account/AccountAction';
import {getData, getParamsData} from '../../../component/NetUtils';
import API from '../../../component/Api';
import Util from '../../../component/Util';
import Message from '../../../component/Message';
import * as TypeId from '../../../component/TypeId';

/**
 * 获取公众号菜单
 */
export function* getAccountMenu() {
    yield put(AccountStateChange({
        isLoading: false,
    }));
    let response = yield call(getData.bind(this, {url: API.ACCOUNT_MENU}));


    // console.log('getAccountMenu', response);

    yield put(AccountStateChange({
        isLoading: false,
    }));
    if (response == undefined) { //网络连接错误

        Util.showToast(Message.NETWORK_ERROR);
        return;
    }

    if (response.errorCode == TypeId.ERROR_CODE_1) {  //获取数据成功
        yield put(AccountStateChange({
            menuList: response.data,
            menuSelectedId: response.data[0].id,
        }));
        yield* getAccountList();
    } else {  //获取失败
        Util.showToast(response.errorMsg);

    }
}


/**
 *  根据菜单ID获取数据列表
 */
export function* getAccountList() {
    yield put(AccountStateChange({
        isLoading: true,
    }));
    const {isRefresh, page, menuSelectedId, dataList} = yield select(state => state.account);

    let response = yield call(getData.bind(this, {url: API.ACCOUNT_LIST + menuSelectedId + '/' + page + API.HOME_ARTICLE_LIST_END}));

    // console.log('getAccountList', response);
    // console.log('getAccountList', API.ACCOUNT_LIST + menuSelectedId + '/' + page + API.HOME_ARTICLE_LIST_END);

    yield put(AccountStateChange({
        isLoading: false,
    }));
    if (response == undefined) { //网络连接错误

        Util.showToast(Message.NETWORK_ERROR);
        return;
    }

    if (response.errorCode == TypeId.ERROR_CODE_1) {  //获取数据成功
        if (isRefresh) {  //是刷新
            yield put(AccountStateChange({
                dataList: response.data.datas,
            }));
        } else {
            yield put(AccountStateChange({
                dataList: dataList.concat(response.data.datas),
            }));
        }
        yield put(AccountStateChange({
            font: page + 1 < response.data.pageCount ? 0 : 2,
            isRefresh: false,
        }));
    } else {  //获取失败
        Util.showToast(response.errorMsg);

    }
}
