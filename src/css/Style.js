/**
 *  @author Wolf.Ma
 *  @date 2020-04-04 15:25
 *  公用css 布局
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Platform
} from 'react-native';
import Theme from '../component/Theme';
import ScreenUtil, {deviceWidth, defaultBarHeight, statusBarHeight, iosAddPaddingTop} from '../component/ScreenUtil';

const Style = StyleSheet.create({
    /**
     * 常用布局
     */
    barView: {
        width: deviceWidth,
        height: defaultBarHeight + statusBarHeight,
        paddingTop: statusBarHeight + iosAddPaddingTop,  //使显示内容稍微向下偏移一点
        backgroundColor: Theme.themeColor,
        paddingLeft: ScreenUtil.scaleSizeW(10),
        paddingRight: ScreenUtil.scaleSizeW(10),
    },
    barView1: {
        width: deviceWidth,
        height: defaultBarHeight,
        backgroundColor: Theme.themeColor,
        paddingLeft: ScreenUtil.scaleSizeW(10),
        paddingRight: ScreenUtil.scaleSizeW(10),
    },
    barTitle: {
        color: Theme.white,
        fontWeight: '600',
        fontSize: ScreenUtil.setSpFont(15),
        padding: ScreenUtil.scaleSizeW(10),
    },
    barTitle1: {
        color: Theme.transparent,
        fontWeight: '600',
        fontSize: ScreenUtil.setSpFont(15),
        padding: ScreenUtil.scaleSizeW(10),
    },
    barIcon: {
        padding: ScreenUtil.scaleSizeW(10),
    },
    navView: {
        paddingRight: ScreenUtil.scaleSizeW(50),
        paddingLeft: ScreenUtil.scaleSizeW(20),
        height: ScreenUtil.scaleSizeH(50),
    },
    navLine: {
        width: ScreenUtil.scaleSizeW(50),
        height: ScreenUtil.scaleSizeH(4),
        backgroundColor: Theme.white,
        borderRadius: ScreenUtil.scaleSizeW(10),
        marginTop: ScreenUtil.scaleSizeH(8),
    },
    navLine1: {
        width: ScreenUtil.scaleSizeW(50),
        height: ScreenUtil.scaleSizeH(4),
        backgroundColor: Theme.transparent,
        borderRadius: ScreenUtil.scaleSizeW(10),
        marginTop: ScreenUtil.scaleSizeH(5),
    },
    font1: {
        color: Theme.white,
        fontSize: ScreenUtil.setSpFont(14),
        fontWeight: '600',
    },
    font2: {
        color: Theme.white,
        fontSize: ScreenUtil.setSpFont(12),
    },
    /**
     * flex布局
     */
    columnStartCenter: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    columnEndCenter: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    columnCenterCenter: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    columnCenter: {
        flexDirection: 'column',
        justifyContent: 'center',
        // alignItems: 'center',
    },
    columnAroundCenter: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    columnAround: {
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    columnBetweenCenter: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    columnBetween: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    columnBetweenEnd: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    columnStartEnd: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    rowCenterCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    rowBetweenCenter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowBetweenEnd: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    rowStart: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    rowStartEnd: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    rowStartCenter: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    rowAroundCenter: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    rowEndCenter: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    rowWarp: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    /**
     * FlatList
     */
    headView: {
        width: deviceWidth,
        height: 50,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerView: {
        flexDirection: 'row',
        width: deviceWidth,
        height: ScreenUtil.scaleSizeH(50 * 2),
        //backgroundColor: 'red',
        justifyContent: 'center',
        paddingTop: ScreenUtil.scaleSizeH(20 * 2),
        marginBottom: ScreenUtil.scaleSizeH(120),
    },
    itemImages: {
        width: 60,
        height: 60,
        resizeMode: 'stretch',
    },
    footerFont: {
        color: Theme.color_1,
        fontSize: ScreenUtil.setSpText(14 * 2),
    },
});
export default Style;
