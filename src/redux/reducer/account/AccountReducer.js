/**
 * @author bingPo
 * @date 2020-04-05 10:20
 * @name: AccountReducer
 * @description：AccountReducer
 */
import * as Types from '../../../component/ActionTypes';

const initialState = {
    isLoading: false, //是否加载

    menuList: [],
    menuSelectedId: '',
    dataList: [],
    page: 0,
    font: 0,
    isRefresh: true,
    nowChildPage: 0,
};

const AccountReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.ACCOUNT_STATE_CHANGE:
            return {...state, ...action.state};
        default:
            return state;
    }
};
export default AccountReducer;
