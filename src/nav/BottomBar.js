/**
 * @author Wolf
 * @Date 2020-05-06 14:56
 */

import {BottomTabBar, createBottomTabNavigator} from 'react-navigation-tabs';
import Home from '../view/home';
import {View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import My from '../view/my';
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {InitThemeColor} from '../redux/action/theme/ThemeAction';
import {getThemeColor} from '../component/ThemeDao'
import {connect} from 'react-redux';
import Message from "../component/Message";
import Project from "../view/project";
import Square from "../view/square";
import Account from "../view/account";
import ScreenUtil from "../component/ScreenUtil";

const RootTabs = createBottomTabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                tabBarLabel: Message.HOME,
                tabBarIcon: ({tintColor, focused}) => (
                    <View>
                        <FontAwesome
                            name={'home'}
                            color={tintColor}
                            size={focused ? ScreenUtil.setSpFont(24) : ScreenUtil.setSpFont(22)}/>
                    </View>
                ),
            },
        },
        Project: {
            screen: Project,
            navigationOptions: {
                tabBarLabel: Message.PROJECT,
                tabBarIcon: ({tintColor, focused}) => (
                    <View>
                        <FontAwesome
                            name={'leanpub'}
                            color={tintColor}
                            size={focused ? ScreenUtil.setSpFont(22) : ScreenUtil.setSpFont(20)}/>
                    </View>
                ),
            },
        },
        Square: {
            screen: Square,
            navigationOptions: {
                tabBarLabel: Message.SQUARE,
                tabBarIcon: ({tintColor, focused}) => (
                    <View>
                        <FontAwesome
                            name={'th-large'}
                            color={tintColor}
                            size={focused ? ScreenUtil.setSpFont(22) : ScreenUtil.setSpFont(20)}/>
                    </View>
                ),
            },
        },
        Account: {
            screen: Account,
            navigationOptions: {
                tabBarLabel: Message.ACCOUNT,
                tabBarIcon: ({tintColor, focused}) => (
                    <View>
                        <FontAwesome
                            name={'wechat'}
                            color={tintColor}
                            size={focused ? ScreenUtil.setSpFont(20) : ScreenUtil.setSpFont(18)}/>
                    </View>
                ),
            },
        },
        My: {
            screen: My,
            navigationOptions: {
                tabBarLabel: Message.MY,
                tabBarIcon: ({tintColor, focused}) => (
                    <View>
                        <FontAwesome
                            name={'user'}
                            color={tintColor}
                            size={focused ? ScreenUtil.setSpFont(22) : ScreenUtil.setSpFont(20)}/>
                    </View>
                ),
            },
        },
    },
    {
        tabBarComponent: (props) => {
            return (
                <ComponentBottom {...props}
                                 // style={{borderTopWidth: 0}}
                />
            );
        },
    },
    {
        swipeEnabled: true, // 是否允许横向滑动
        initialRouteName: 'Home', // 设置默认的页面组件
        lazy: true, // 在app打开的时候将底部标签栏全部加载，默认false,推荐改成true
        tabBarPosition: 'bottom', // 设置tabbar的位置，iOS默认在底部，安卓默认在顶部。（属性值：'top'，'bottom')
        initialRouteParams: {data: 12},
        tabBarOptions: {
            showIcon: true, // 是否显示图标，默认关闭。
            showLabel: true, //是否显示label，默认开启。
            // activeTintColor: Theme.themeColor,
            activeTintColor: '#4caf50',
            inactiveTintColor: '#888',
            // inactiveTintColor: Theme.unSelectColor,
            indicatorStyle: {height: 0},
            style: {
                // marginTop:10,
                padding: 0,
                backgroundColor: '#fff',
                height: 50,
                zIndex: 0,
                position: 'relative',
                borderTopWidth: 0,  //去掉顶部的线条
            },
            labelStyle: {
                fontSize: ScreenUtil.setSpFont(10),
                paddingVertical: 0,
                marginTop: -4,

            },
            iconStyle: {
                marginTop: 0,
            },
        },
        animationEnabled: true,
    },
);
export default RootTabs;

class TabBarComponent extends Component<Props> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.InitThemeColor();

    }

    render() {
        return (
            <BottomTabBar
                {...this.props}
                activeTintColor={this.props.theme.themeColor}/>
        );
    }
}

const mapStateToProps = state => ({
    state: state.nav,//v2
    theme: state.theme,
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({InitThemeColor}, dispatch);
}

/**
 * 3.连接 React 组件与 Redux store
 */
const ComponentBottom = connect(mapStateToProps, mapDispatchToProps)(TabBarComponent);
