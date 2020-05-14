/**
 * @author bingPo
 * @date 2020-04-05 10:20
 * @name: SquareReducer
 * @description：SquareReducer
 */
import * as Types from '../../../component/ActionTypes';
import * as TypeId from '../../../component/TypeId';

const initialState = {
    isLoading: false, //是否加载

    menuList: [
        {id: TypeId.SQUARE, name: '广场'},
        {id: TypeId.SERIES, name: '体系'},
        {id: TypeId.NAVIGATION, name: '导航'},
    ],
    menuSelectedId: TypeId.SQUARE,
    squareList: [],
    page: 0,
    font: 0,
    isRefresh: true,

    seriesList: [],
    seriesMenuList: [],
    seriesMenuSelected: '',
    seriesPage: 0,
    seriesFont: 0,
    seriesIsRefresh: true,
    seriesArticleList: [],

    navigationList: [],
};

const SquareReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.SQUARE_STATE_CHANGE:
            return {...state, ...action.state};
        default:
            return state;
    }
};
export default SquareReducer;
