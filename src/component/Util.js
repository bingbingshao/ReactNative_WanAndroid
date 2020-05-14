import React, {ToastAndroid, Platform} from 'react-native';
import Toast from 'react-native-root-toast';
import Store from 'react-native-simple-store';
import {deviceWidth, deviceHeight} from './ScreenUtil';
import {NavigationActions} from 'react-navigation';

let _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

//iphoneX 数据
const X_WIDTH = 375;
const X_HEIGHT = 812;
/**
 *工具的实现
 */

export default class Util {

    /**
     *
     * @param content  显示内容
     * @param duration
     */
    static showToast(content, duration) {
        //判断是否是android的，是则直接显示toast
        if (Platform.OS === 'android') {
            ToastAndroid.show(content, ToastAndroid.SHORT);
            return;
        }

        //ios判断上一个toast是否结束显示，没有则隐藏
        if (this.toast != null && this.toast !== undefined) {
            Toast.hide(this.toast);
        }

        //显示toast
        this.toast = Toast.show(content.toString(), {
            duration: duration ? duration : Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
        });
    }

    /**
     * 判断非法字符
     */
    static checkExText(str) {
        let reg = /^([\u2E80-\u9FFF]|\w|\s|[]%&-|[`~!@#$^*()-_—+=|{}'":;,\[\]\\.<>/?！￥…（）—-【】%‘’&；：”“。，、？])*$/;
        return reg.test(str);
    }

    /**
     * 判断是否只有中英文数字
     */
    static checkText(str) {
        let reg = /^([\u2E80-\u9FFF]|\w|\s|[()（）])*$/;
        return reg.test(str);
    }

    /**
     * 判断电话格式
     */
    static checkTelephone(tel) {
        let reg = /^([0-9]|[()（）]|[-]){7,18}$/;
        return reg.test(tel);
    }

    /**
     * 判断不为null，不为undefined
     */
    static checkValidValue(value) {
        if (value == null || value == undefined) {
            return false;
        }

        return true;
    }

    /**
     * 判断是否为空
     */
    static checkIsEmptyString(str) {
        if (str == null || str == undefined || str == '') {
            return true;
        }
        return false;
    }

    /**
     * 判断数组是否为空
     */
    static checkIsEmptyArray(str) {
        if (str == null || str == undefined || str.length == 0) {
            return true;
        }
        return false;
    }

    /**
     * 判断密码格式 6-20位，要求数字字母（大写或者小写）结合
     */
    static checkPassword(pwd) {
        if (pwd.length < 6 || pwd.length > 20) {
            return false;
        }
        return true;
    }

    /**
     * 去掉前后空格
     */
    static trim(str) {
        if (this.checkIsEmptyString(str)) {
            return '';
        }
        str = str + '';
        return str.replace(/(^\s*)|(\s*$)/g, '');
    }

    /**
     * 去掉字符串中的中文
     */
    static deleteChinese(str) {
        return str.replace(/[\u4e00-\u9fa5]/g, '');
    }

    /**
     * 只能输入中文
     */
    static onlyChinese(str) {
        return str.replace(!/^[\u4e00-\u9fa5]+$/gi, '');
    }

    /**
     * 过滤HTML 标签
     * @param content
     * @returns {void | boolean | NavigationReplaceAction | string}
     */
    static filterHTMLTag(content) {
        let msg = content.replace(/<\/?[^>]*>/g, ''); //去除HTML Tag
        msg = msg.replace(/[|]*\n/, ''); //去除行尾空格
        msg = msg.replace(/\ +/g, '');//去掉空格
        msg = msg.replace(/[ ]/g, '');    //去掉空格
        msg = msg.replace(/[\r\n]/g, '');//去掉回车换行
        msg = msg.replace(/[&\|\\\*@nbsp;\-]/g, '');
        // console.log('msg', msg);
        return msg;
    }
}
