/**
 * @author bingPo
 * @date 2020-04-05 10:20
 * @name: LoginReducer
 * @description：LoginReducer
 */
import * as Types from '../../../component/ActionTypes';

const initialState = {
    isLoading: false, //是否加载
    userId: '',//登录用户ID 未登录 为空
    userName: '',//登录用户Name 未登录 为空
    userPassword: '',//登录用户Password 未登录 为空

    //登录
    loginAccount: '',
    loginPassword: '',

    //注册
    registerAccount: '',
    registerPassword: '',
    registerPasswordAgain: '',
};

const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.LOGIN_STATE_CHANGE:
            return {...state, ...action.state};
        default:
            return state;
    }
};
export default LoginReducer;
