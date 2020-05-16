/**
 * @author Wolf
 * @Date 2020-05-06 10:31
 */
import {put, select, call, delay} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm';
import {ChangeThemeColor} from '../../action/theme/ThemeAction';
import {getThemeColor} from '../../../component/ThemeDao';

/**
 *  初始化 主题色
 */
export function* initThemeColor() {
    let color = yield call(getThemeColor);

    yield put(ChangeThemeColor({
        themeColor: color,
    }));
}


/**
 *  修改主题色
 */

