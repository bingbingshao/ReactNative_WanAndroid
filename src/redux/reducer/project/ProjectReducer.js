/**
 * @author bingPo
 * @date 2020-04-05 10:20
 * @name: ProjectReducer
 * @description：ProjectReducer
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
};

const ProjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.PROJECT_STATE_CHANGE:
            return {...state, ...action.state};
        default:
            return state;
    }
};
export default ProjectReducer;
