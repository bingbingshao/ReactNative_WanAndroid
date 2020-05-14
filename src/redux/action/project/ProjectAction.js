/**
 * @author bingPo
 * @date 2020-04-05 10:16
 * @name: ProjectAction
 * @description：ProjectAction
 */

import * as Types from '../../../component/ActionTypes';

//项目状态更改
export const ProjectStateChange = (state) => {
    return {
        type: Types.PROJECT_STATE_CHANGE,
        state: state,
    };
};

//获取项目菜单
export const ProjectMenu = (state) => {
    return {
        type: Types.PROJECT_MENU,
        state: state,
    };
};

//根据菜单ID获取数据列表
export const ProjectList = (state) => {
    return {
        type: Types.PROJECT_LIST,
        state: state,
    };
};
