/**
 * @author bingPo
 * @date 2020-04-04 09:20
 * @name: index
 * @description：index
 */
import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
} from 'react-native';

class index extends Component {
    constructor() {
        super();
        this.state = {};
    }

    //渲染前调用
    componentWillMount(){
    }

    //渲染后调用
    componentDidMount(){
    }

    //卸载前调用
    componentWillUnmount(){
    }

    /**
     * 方法处理
     */

    /**
     * 页面渲染
     */

    render() {
        return (
            <View>
                <Text>{'Home'}</Text>
            </View>
        );
    }
}

export default index;

const styles = StyleSheet.create({});
