/**
 * @format
 */
import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import configureStore from './src/redux/Store';
import {createAppContainer} from 'react-navigation';
import RootNavigator from './src/nav/Navigation';

console.ignoredYellowBox = ['Warning: BackAndroid is deprecated. Please use BackHandler instead.', 'source.uri should not be an empty string', 'Invalid props.style key'];
console.disableYellowBox = true; // 关闭全部黄色警告
const AppNav = createAppContainer(RootNavigator);
//获取store
const store = configureStore();

export default class Root extends Component {

    render() {
        return (
            //store覆盖整改项目
            <Provider store={store}>
                <AppNav/>
            </Provider>
        );
    }
}

AppRegistry.registerComponent(appName, () => Root);
