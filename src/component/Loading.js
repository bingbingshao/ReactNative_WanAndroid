/**
 *  @author Wolf.Ma
 *  @date 2019-11-11 11:01
 *  通用加载框
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    ActivityIndicator,
    Modal,
    StatusBar,
} from 'react-native';
import ScreenUtil, {deviceHeight, deviceWidth} from './ScreenUtil';
import Message from './Message';

export default class Loading extends React.Component {
    static propTypes = {
        size: PropTypes.string,    //指示器尺寸
        isShow: PropTypes.bool,    //是否显示
    };

    //参数默认值
    static defaultProps = {
        size: 'large',
        isShow: false,
    };

    render() {
        return (
            <Modal
                animationType={'none'}
                transparent={true}
                visible={this.props.isShow}
            >
                <View style={{
                    flex: 1,
                    height: deviceHeight,
                    width: deviceWidth,
                    justifyContent: 'center',
                }}>
                    <StatusBar barStyle={'dark-content'}/>
                    <View style={{
                        width: ScreenUtil.scaleSizeW(240),
                        height: ScreenUtil.scaleSizeW(240),
                        backgroundColor: '#000000',
                        opacity: 0.8,
                        borderRadius: ScreenUtil.scaleSizeW(8),
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000,
                        alignSelf: 'center',
                    }}>
                        <ActivityIndicator
                            animating={true}
                            color="white"
                            size={this.props.size}/>
                        <Text style={{
                            fontFamily: 'Helvetica Neue',
                            fontSize: ScreenUtil.setSpText(28),
                            marginTop: ScreenUtil.scaleSizeH(20),
                            color: 'white',
                        }}>{Message.LOADING}</Text>
                    </View>
                </View>
            </Modal>
        );
    }
}
