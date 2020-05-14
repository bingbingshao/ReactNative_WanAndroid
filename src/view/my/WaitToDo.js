/**
 * @author bingPo
 * @date 2020-04-04 18:56
 * @name: WaitToDo
 * @description：WaitToDo
 */
import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet, StatusBar, TouchableHighlight,
} from 'react-native';
import Theme from '../../component/Theme';
import Style from '../../css/Style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ScreenUtil from '../../component/ScreenUtil';
import Message from '../../component/Message';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {goBackPage} from '../../redux/action/NavigationAction';
import Ionicons from 'react-native-vector-icons/Ionicons';

class WaitToDo extends Component {
    constructor() {
        super();
        this.state = {};
    }

    //渲染前调用
    componentWillMount() {
    }

    //渲染后调用
    componentDidMount() {
    }

    //卸载前调用
    componentWillUnmount() {
    }

    /**
     * 方法处理
     */
    //点击加号
    addPlus() {
        alert('add');
    }

    /**
     * 页面渲染
     */
    //顶部导航渲染
    _nav() {
        return (
            <View>
                <StatusBar barStyle={'light-content'} translucent={true} backgroundColor={Theme.themeColor}/>
                <View style={[Style.barView, Style.rowBetweenCenter]}>
                    <TouchableHighlight
                        underlayColor={'transparent'}
                        onPress={() => this.props.goBackPage()}>
                        <View style={Style.rowCenterCenter}>
          <AntDesign name={'arrowleft'} color={Theme.white} size={ScreenUtil.setSpFont(20)}
                                       style={{paddingLeft: ScreenUtil.scaleSizeW(10)}}/>
                            <Text style={Style.barTitle}>{' '}{Message.MY_WAIT_TO_DO}</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'transparent'}
                        onPress={() => this.addPlus()}>
                        <Ionicons name={'ios-add'} color={Theme.white}
                                  size={ScreenUtil.setSpFont(28)} style={Style.barIcon}/>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View>
                {this._nav()}
                <Text>{'WaitToDo'}</Text>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        nav: state.nav,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        goBackPage,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WaitToDo);

const styles = StyleSheet.create({});
