/**
 * @author bingPo
 * @date 2020-04-05 10:16
 * @name: AccountAction
 * @description：AccountAction
 */

import * as Types from '../../../component/ActionTypes';

//公众号状态更改
export const AccountStateChange = (state) => {
    return {
        type: Types.ACCOUNT_STATE_CHANGE,
        state: state,
    };
};

//获取公众号菜单
export const AccountMenu = (state) => {
    return {
        type: Types.ACCOUNT_MENU,
        state: state,
    };
};

//根据菜单ID获取数据列表
export const AccountList = (state) => {
    return {
        type: Types.ACCOUNT_LIST,
        state: state,
    };
};
