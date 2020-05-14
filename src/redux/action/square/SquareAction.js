/**
 * @author bingPo
 * @date 2020-04-05 10:16
 * @name: SquareAction
 * @description：SquareAction
 */

import * as Types from '../../../component/ActionTypes';

//广场状态更改
export const SquareStateChange = (state) => {
    return {
        type: Types.SQUARE_STATE_CHANGE,
        state: state,
    };
};

//获取广场数据列表
export const SquareList = (state) => {
    return {
        type: Types.SQUARE_LIST,
        state: state,
    };
};

//获取广场体系数据
export const SquareSeries = (state) => {
    return {
        type: Types.SQUARE_SERIES,
        state: state,
    };
};

//获取广场体系数据 二级菜单
export const SquareSeriesDetails = (state) => {
    return {
        type: Types.SQUARE_SERIES_DETAILS,
        state: state,
    };
};

//获取广场导航数据
export const SquareNavigation = (state) => {
    return {
        type: Types.SQUARE_NAVIGATION,
        state: state,
    };
};
