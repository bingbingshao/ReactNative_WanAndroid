/**
 * @author bingPo
 * @date 2020-04-04 10:10
 * @name: ProjectSaga
 * @description：ProjectSaga
 */
import {DeviceEventEmitter} from 'react-native';
import {put, select, call, delay} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm';
import {ProjectStateChange} from '../../action/project/ProjectAction';
import {getData, getParamsData, postFormData} from '../../../component/NetUtils';
import API from '../../../component/Api';
import Util from '../../../component/Util';
import Message from '../../../component/Message';
import * as TypeId from '../../../component/TypeId';
import Store from 'react-native-simple-store';
import {goMy} from '../../action/NavigationAction';

/**
 * 获取项目菜单
 */
export function* getProjectMenu() {
    yield put(ProjectStateChange({
        isLoading: false,
    }));
    let response = yield call(getData.bind(this, {url: API.PROJECT_MENU}));


    // console.log('getProjectMenu', response);

    yield put(ProjectStateChange({
        isLoading: false,
    }));
    if (response == undefined) { //网络连接错误

        Util.showToast(Message.NETWORK_ERROR);
        return;
    }

    if (response.errorCode == TypeId.ERROR_CODE_1) {  //获取数据成功
        yield put(ProjectStateChange({
            menuList: response.data,
            menuSelectedId: response.data[0].id,
            dataList: new Array(response.data.length),
        }));
        yield* getProjectList();
    } else {  //获取失败
        Util.showToast(response.errorMsg);

    }
}


/**
 *  根据菜单ID获取数据列表
 */
export function* getProjectList() {
    yield put(ProjectStateChange({
        isLoading: true,
    }));
    const {isRefresh, page, menuSelectedId, dataList, nowChildPage} = yield select(state => state.project);

    let params = {cid: menuSelectedId};
    let response = yield call(getParamsData.bind(this, {
        requestData: params,
        url: API.PROJECT_LIST + page + API.HOME_ARTICLE_LIST_END,
    }));

    DeviceEventEmitter.emit(TypeId.PROJECT_GET_SUCCESS);

    // console.log('getProjectList', response);

    yield put(ProjectStateChange({
        isLoading: false,
    }));
    if (response == undefined) { //网络连接错误

        Util.showToast(Message.NETWORK_ERROR);
        return;
    }

    if (response.errorCode == TypeId.ERROR_CODE_1) {  //获取数据成功
        if (isRefresh) {  //是刷新
            dataList[nowChildPage] = response.data.datas;
        } else {

            let data = dataList[nowChildPage];

            dataList[nowChildPage] = data.concat(response.data.datas);
        }
        yield put(ProjectStateChange({
            dataList: dataList,
        }));
        yield put(ProjectStateChange({
            font: page + 1 < response.data.pageCount ? 0 : 2,
            isRefresh: false,
        }));
    } else {  //获取失败
        Util.showToast(response.errorMsg);

    }
}
