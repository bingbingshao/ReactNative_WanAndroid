/**
 * @author bingPo
 * @date 2020-04-04 10:10
 * @name: LoginSaga
 * @description：LoginSaga
 */
import {DeviceEventEmitter} from 'react-native';
import {put, select, call, delay} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm';
import {LoginStateChange} from '../../action/login/LoginAction';
import {goMy} from '../../action/NavigationAction';
import {getData, postFormData} from '../../../component/NetUtils';
import API from '../../../component/Api';
import Util from '../../../component/Util';
import Message from '../../../component/Message';
import * as TypeId from '../../../component/TypeId';
import Store from 'react-native-simple-store';

/**
 * 登录
 */
export function* login() {
    yield put(LoginStateChange({
        isLoading: true,
    }));
    const {loginAccount, loginPassword} = yield select(state => state.login);

    let formData = new FormData();
    formData.append('username', loginAccount);
    formData.append('password', loginPassword);
    let response = yield call(postFormData.bind(this, {requestData: formData, url: API.LOGIN}));


    // console.log('login', response);

    yield put(LoginStateChange({
        isLoading: false,
    }));
    if (response == undefined) { //网络连接错误

        Util.showToast(Message.NETWORK_ERROR);
        return;
    }

    if (response.errorCode == TypeId.ERROR_CODE_1) {  //获取数据成功

        /**
         * 登陆成功
         */
        yield put(LoginStateChange({
            userId: response.data.id,//登录用户ID 未登录 为空
            userName: response.data.username,//登录用户Name 未登录 为空
        }));
        Store.save(TypeId.USER_ID, response.data.id);
        Store.save(TypeId.USER_NAME, loginAccount);
        Store.save(TypeId.USER_PASSWORD, loginPassword);
        DeviceEventEmitter.emit(TypeId.LOGIN_SUCCESS);
        yield put(goMy());

    } else {  //获取失败
        Util.showToast(response.errorMsg);

    }
}


/**
 * 注册
 */
export function* register() {
    yield put(LoginStateChange({
        isLoading: true,
    }));
    const {registerAccount, registerPassword, registerPasswordAgain} = yield select(state => state.login);

    let formData = new FormData();
    formData.append('username', registerAccount);
    formData.append('password', registerPassword);
    formData.append('repassword', registerPasswordAgain);
    let response = yield call(postFormData.bind(this, {requestData: formData, url: API.REGISTER}));


    // console.log('register', response);

    yield put(LoginStateChange({
        isLoading: false,
    }));
    if (response == undefined) { //网络连接错误

        Util.showToast(Message.NETWORK_ERROR);
        return;
    }

    if (response.errorCode == TypeId.ERROR_CODE_1) {  //获取数据成功

        /**
         * 注册成功
         */
        yield put(LoginStateChange({
            userId: response.data.id,//登录用户ID 未登录 为空
            userName: response.data.username,//登录用户Name 未登录 为空
        }));
        Store.save(TypeId.USER_ID, response.data.id);
        Store.save(TypeId.USER_NAME, response.data.username);
        DeviceEventEmitter.emit(TypeId.LOGIN_SUCCESS);
        yield put(goMy());

    } else {  //获取失败
        Util.showToast(response.errorMsg);

    }
}

/**
 * 登出
 */
export function* logout() {
    yield put(LoginStateChange({
        isLoading: true,
    }));

    let response = yield call(getData.bind(this, {url: API.LOGOUT}));


    console.log('logout', response);

    yield put(LoginStateChange({
        isLoading: false,
    }));
    if (response == undefined) { //网络连接错误

        Util.showToast(Message.NETWORK_ERROR);
        return;
    }

    if (response.errorCode == TypeId.ERROR_CODE_1) {  //获取数据成功

        /**
         * 登陆成功
         */
        yield put(LoginStateChange({
            userId: '',//登录用户ID 未登录 为空
            userName: '',//登录用户Name 未登录 为空
        }));
        Store.delete(TypeId.USER_ID);
        Store.delete(TypeId.USER_NAME);
        Store.delete(TypeId.USER_PASSWORD);
        DeviceEventEmitter.emit(TypeId.LOGIN_SUCCESS);
        yield put(goMy());

    } else {  //获取失败
        Util.showToast(response.errorMsg);

    }
}
