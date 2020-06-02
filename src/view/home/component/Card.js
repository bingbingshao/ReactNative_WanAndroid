/**
 * @author wolf.ma  WanAndroid
 * @date 2020-05-24 22:19
 * @name: Card
 * @description：Card
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native'

class Card extends Component {

    constructor() {
        super()
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }


    /**
     * 方法处理
     */

    /**
     *  界面渲染
     */

    render() {
        return (
            <View style={styles.container}>
                <Text></Text>
            </View>
        )
    }
}

export default Card;

const styles = StyleSheet({
    container: {
        flex: 1
    }
});

