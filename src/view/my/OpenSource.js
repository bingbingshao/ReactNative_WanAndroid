/**
 * @author bingPo
 * @date 2020-04-04 18:57
 * @name: OpenSource
 * @description：OpenSource
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

class OpenSource extends Component {
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

    /**
     * 页面渲染
     */
    //顶部导航渲染
    _nav() {
        const {themeColor} = this.props.theme;
        return (
            <View>
                <StatusBar barStyle={'light-content'} translucent={true} backgroundColor={themeColor}/>
                <View style={[Style.barView, Style.rowBetweenCenter, {backgroundColor: themeColor}]}>
                    <TouchableHighlight
                        underlayColor={'transparent'}
                        onPress={() => this.props.goBackPage()}>
                        <View style={Style.rowCenterCenter}>
                            <AntDesign name={'arrowleft'} color={Theme.white} size={ScreenUtil.setSpFont(20)}
                                       style={{paddingLeft: ScreenUtil.scaleSizeW(10)}}/>
                            <Text style={Style.barTitle}>{' '}{Message.MY_OPEN_SOURCE_NET}</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View>
                {this._nav()}
                <Text>{'OpenSource'}</Text>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        nav: state.nav,
        theme: state.theme,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        goBackPage
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenSource);

const styles = StyleSheet.create({});
