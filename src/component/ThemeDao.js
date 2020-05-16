/**
 * @author Wolf
 * @Date 2020-05-06 10:04
 */
/**
 * AsyncStorage和NSUserDefaults是一样的，它们的写入和读取操作都是异步的
 */

import {AsyncStorage} from 'react-native';
import AllThemeColor from './AllTheme';
import Store from 'react-native-simple-store';
import * as TypeId from './TypeId';

/**
 * 存储主题色
 * @param themeColor 本身就是个颜色字符串，所以可以直接存储
 */
export function saveThemeColor(themeColor) {
    Store.save(TypeId.THEME_COLOR, themeColor);
}

/**
 * 读取主题色：因为读取主题色是异步操作，所以我们得用Promise把读取结果给它传出去
 * @returns {Promise<any> | Promise}
 */
export async function getThemeColor() {
    let color = await Store.get(TypeId.THEME_COLOR)
        .then((res) => {
            console.log('res', res);
            if (res == null || res == undefined) {
                return AllThemeColor.Default;
            }
            return res;
        });
    return color;
}
