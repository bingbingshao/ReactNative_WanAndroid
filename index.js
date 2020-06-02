/**
 * @format
 */
import React, {Component} from 'react';
import {AppRegistry, BackHandler, NativeModules, Platform, ToastAndroid} from 'react-native';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import configureStore from './src/redux/Store';
import {createAppContainer} from 'react-navigation';
import RootNavigator from './src/nav/Navigation';
import Index from './src/index'
import Test from './test/Test'


console.ignoredYellowBox = ['Warning: BackAndroid is deprecated. Please use BackHandler instead.', 'source.uri should not be an empty string', 'Invalid props.style key'];
console.disableYellowBox = true; // 关闭全部黄色警告
const AppNav = createAppContainer(RootNavigator);
//获取store
const store = configureStore();
let SplashScreen = NativeModules.SplashScreen;


export default class Root extends Component {

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            //安卓通过SplashScreen设置启动页
            this.timer = setTimeout(
                () => {
                    SplashScreen.hide();
                },
                0,
            );
        }
    }


    render() {
        return (
            //store覆盖整改项目
            <Provider store={store}>
                <Index/>
            </Provider>
        );
    }
}

AppRegistry.registerComponent(appName, () => Root);
