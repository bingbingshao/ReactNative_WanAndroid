/**
 * @author bingPo
 * @date 2020-04-04 15:25
 * @name: ScreenUtil
 * @description：ScreenUtil
 */
/**
 设备的像素密度，例如：
 PixelRatio.get() === 1          mdpi Android 设备 (160 dpi)
 PixelRatio.get() === 1.5        hdpi Android 设备 (240 dpi)
 PixelRatio.get() === 2          iPhone 4, 4S,iPhone 5, 5c, 5s,iPhone 6,xhdpi Android 设备 (320 dpi)
 PixelRatio.get() === 3          iPhone 6 plus , xxhdpi Android 设备 (480 dpi)
 PixelRatio.get() === 3.5        Nexus 6
 */

import {
    Dimensions,
    PixelRatio,
    NativeModules,
    Platform
} from 'react-native';

const {StatusBarManager} = NativeModules;

export const deviceWidth = Dimensions.get('window').width;      //设备的宽度
export const deviceHeight = Dimensions.get('window').height;    //设备的高度
export const bannerHeight = deviceWidth * 2 / 5;    //轮播图高度

/**
 * 是不是iOS
 * @type {boolean}
 */
export const IsIOS = Platform.OS == 'ios';
export const iosAddPaddingTop = Platform.OS == 'ios' ? 10 : 0;

/**
 *  iPhone6 分辨率
 */
const designWidth = 750.0;
const designHeight = 1334.0;

/**
 * 顶部导航高度
 */
export const defaultBarHeight = Platform.OS === 'ios' ? deviceHeight === 812 ? 60 : 50 : 45;
export const statusBarHeight = Platform.OS === 'ios' ? deviceHeight === 812 ? 30 : 20 : StatusBarManager.HEIGHT;  //状态栏高度
let fontScale = PixelRatio.getFontScale();                      //返回字体大小缩放比例
let pixelRatio = PixelRatio.get();      //当前设备的像素密度

const screenPxW = PixelRatio.getPixelSizeForLayoutSize(deviceWidth);
const screenPxH = PixelRatio.getPixelSizeForLayoutSize(deviceHeight);

export default class ScreenUtilNew {
    /**
     * 设置text为sp
     * @param size sp
     * return number dp
     */

    //字体尺寸
    static setSpFont(size) {
        if (pixelRatio === 2) {
            // iphone 5s and older Androids
            if (deviceWidth < 360) {
                return size * 0.95;
            }
            // iphone 5
            if (deviceHeight < 667) {
                return size;
                // iphone 6-6s
            } else if (deviceHeight >= 667 && deviceHeight <= 735) {
                return size * 1.15;
            }
            // older phablets
            return size * 1.25;
        }
        if (pixelRatio === 3) {
            // catch Android font scaling on small machines
            // where pixel ratio / font scale ratio => 3:3
            if (deviceWidth <= 360) {
                return size;
            }
            // Catch other weird android width sizings
            if (deviceHeight < 667) {
                return size * 1.15;
                // catch in-between size Androids and scale font up
                // a tad but not too much
            }
            if (deviceHeight >= 667 && deviceHeight <= 735) {
                return size * 1.2;
            }
            // catch larger devices
            // ie iphone 6s plus / 7 plus / mi note 等等
            return size * 1.27;
        }
        if (pixelRatio === 3.5) {
            // catch Android font scaling on small machines
            // where pixel ratio / font scale ratio => 3:3
            if (deviceWidth <= 360) {
                return size;
                // Catch other smaller android height sizings
            }
            if (deviceHeight < 667) {
                return size * 1.2;
                // catch in-between size Androids and scale font up
                // a tad but not too much
            }
            if (deviceHeight >= 667 && deviceHeight <= 735) {
                return size * 1.25;
            }
            // catch larger phablet devices
            return size * 1.4;
        }
        // if older device ie pixelRatio !== 2 || 3 || 3.5
        return size;
    }

    static setSpText(size) {
        let scaleWidth = deviceWidth / designWidth;
        let scaleHeight = deviceHeight / designHeight;
        let scale = Math.min(scaleWidth, scaleHeight);
        size = Math.round(size * scale / fontScale + 0.5);
        return size;
    }

    /**
     * 设置高度
     * @param size  px
     * @returns {Number} dp
     */
    static scaleSizeH(size) {
        var scaleHeight = size * screenPxH / designHeight;
        size = Math.round((scaleHeight / pixelRatio + 0.5));
        return size;
    }

    /**
     * 设置宽度
     * @param size  px
     * @returns {Number} dp
     */
    static scaleSizeW(size) {
        var scaleWidth = size * screenPxW / designWidth;
        size = Math.round((scaleWidth / pixelRatio + 0.5));
        return size;
    }

    //线条尺寸
    static pixelRatio(size) {
        return size / PixelRatio.get();
    }
}
