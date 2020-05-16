/**
 * @author Wolf
 * @Date 2020-04-30 16:28
 */
import * as Types from './../../../component/ActionTypes';


export const InitThemeColor = (state) => {
    return {
        type: Types.INIT_THEME_COLOR,
        state: state,
    };
};

export const ChangeThemeColor = (state) => {
    return {
        type: Types.CHANGE_THEME_COLOR,
        state: state,
    };
};
export const SaveThemeColor = (state) =>{
    return {
        type: Types.SAVE_THEME_COLOR,
        state: state,
    };
}

