/**
 * @author bingPo
 * @date 2020-04-05 10:16
 * @name: LoginAction
 * @description：LoginAction
 */

import * as Types from '../../../component/ActionTypes';

//首页状态更改
export const LoginStateChange = (state) => {
    return {
        type: Types.LOGIN_STATE_CHANGE,
        state: state,
    };
};


//登录
export const LoginApp = (state) => {
    return {
        type: Types.LOGIN,
        state: state,
    };
};
//注册
export const RegisterApp = (state) => {
    return {
        type: Types.REGISTER,
        state: state,
    };
};

//登出
export const LogoutApp = (state) => {
    return {
        type: Types.LOGOUT,
        state: state,
    };
};
