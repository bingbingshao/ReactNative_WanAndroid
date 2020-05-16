import * as Types from '../../../component/ActionTypes';
import AllThemeColor from '../../../component/AllTheme';

const defaultState = {
    themeColor: AllThemeColor.Default,
};

const themeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case Types.CHANGE_THEME_COLOR:
            return {...state, ...action.state};
        case Types.INIT_THEME_COLOR:
            return {...state, ...action.state};
        default:
            return state;
    }
};
export default themeReducer;
