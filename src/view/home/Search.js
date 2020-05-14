/**
 * @author bingPo
 * @date 2020-04-04 09:38
 * @name: Search
 * @description：Search
 */
import React, {Component} from 'react';
import {
    View,
    Image,
    StatusBar,
    Text,
    StyleSheet,
    TouchableHighlight,
    ScrollView,
    TextInput,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ScreenUtil, {deviceWidth} from '../../component/ScreenUtil';
import Theme from '../../component/Theme';
import Style from '../../css/Style';
import Message from '../../component/Message';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {goSearchResult, goBackPage} from '../../redux/action/NavigationAction';
import {SearchHot, HomeStateChange} from '../../redux/action/home/HomeAction';
import Util from '../../component/Util';
import * as TypeId from '../../component/TypeId';
import Store from 'react-native-simple-store';

class Search extends Component {
    constructor() {
        super();
        this.state = {};
    }

    //渲染前调用
    componentWillMount() {
        let that = this;
        Store.get(TypeId.HISTORY_SEARCH)
            .then((res) => {
                // console.log('res', res);
                if (Util.checkIsEmptyString(res)) {

                } else {
                    that.props.HomeStateChange({
                        historySearch: res,
                    });
                }
            })
            .catch((e) => console.log(e));
        this.props.SearchHot();
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
    onSubmitEditing() {
        const {searchText} = this.props.home;
        if (Util.checkIsEmptyString(searchText)) {
            return;
        }

        this.addStore(searchText);
        this.props.goSearchResult();
    }

    clickSearch(data) {
        let that = this;
        this.addStore(data.name);
        this.props.HomeStateChange({
            searchText: data.name,
        }, that.props.goSearchResult());
    }

    //把搜索的元素 添加到store
    addStore(searchText) {
        const {historySearch} = this.props.home;
        /**
         * 把搜索历史添加到store里面
         */
        let tempArray = historySearch;
        if (tempArray.length > 8) {
            tempArray = tempArray.slice(1);
        }
        tempArray.push(searchText);
        Store.save(TypeId.HISTORY_SEARCH, Array.from(new Set(tempArray)));
    }

    //删除搜索历史
    clearStore(index) {
        const {historySearch} = this.props.home;
        let tempArray = historySearch;
        if (index == null) {  //删除全部
            Store.delete(TypeId.HISTORY_SEARCH);
            this.props.HomeStateChange({
                historySearch: [],
            });
        } else {
            tempArray.splice(index, 1); //删除指定位置的元素
            this.props.HomeStateChange({
                historySearch: tempArray,
            });
            Store.save(TypeId.HISTORY_SEARCH, tempArray);
        }
    }

    /**
     * 页面渲染
     */
    //顶部导航渲染
    _nav() {
        const {searchText} = this.props.home;
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
                        </View>
                    </TouchableHighlight>
                    <TextInput
                        ref={(e) => this.searchInput = e}
                        style={styles.input}
                        placeholder={Message.SEARCH_TIP}
                        placeholderTextColor={Theme.white}
                        autoFocus={true}
                        value={searchText}
                        returnKeyType='search'
                        onSubmitEditing={() => this.onSubmitEditing()}
                        onChangeText={(text) => {
                            this.props.HomeStateChange({
                                searchText: text.trim(),
                            });
                        }}

                    />
                    <TouchableHighlight
                        underlayColor={'transparent'}
                        onPress={() => this.onSubmitEditing()}>
                        <AntDesign name={'search1'} color={Theme.white}
                                   size={ScreenUtil.setSpFont(18)} style={Style.barIcon}/>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

    //热门搜索
    _hotSearch() {

        const {hotSearch} = this.props.home;

        return (
            <View style={styles.view1}>
                <View style={[Style.rowBetweenCenter, {marginBottom: ScreenUtil.scaleSizeH(10)}]}>
                    <Text style={styles.font1}>{Message.SEARCH_HOT}</Text>
                </View>
                <View style={Style.rowWarp}>
                    {
                        hotSearch.map((data, i) => {
                            let fontStyle = styles.searchFont1;
                            let type = i % 5;
                            switch (type) {
                                case 0:
                                    fontStyle = styles.searchFont1;
                                    break;
                                case 1:
                                    fontStyle = styles.searchFont2;
                                    break;
                                case 2:
                                    fontStyle = styles.searchFont3;
                                    break;
                                case 3:
                                    fontStyle = styles.searchFont4;
                                    break;
                                case 4:
                                    fontStyle = styles.searchFont4;
                                    break;
                                default:
                                    break;
                            }
                            return (
                                <TouchableHighlight
                                    underlayColor={'transparent'}
                                    onPress={() => this.clickSearch(data)}>
                                    <View style={[Style.rowCenterCenter, styles.searchView]}>
                                        <Text style={fontStyle}>{data.name}</Text>
                                    </View>
                                </TouchableHighlight>
                            );
                        })
                    }
                </View>
            </View>
        );
    }

    //历史搜索
    _historySearch() {

        const {historySearch} = this.props.home;

        return (
            <View style={styles.view1}>
                <View style={[Style.rowBetweenCenter, styles.view2]}>
                    <Text style={styles.font1}>{Message.SEARCH_HISTORY}</Text>
                    <TouchableHighlight
                        underlayColor={'transparent'}
                        onPress={() => this.clearStore(null)}>
                        <Text style={styles.font2}>{Message.CLEAR}</Text>
                    </TouchableHighlight>
                </View>
                {
                    historySearch.length == 0 ?
                        <View style={Style.rowCenterCenter}>
                            <Text style={styles.historyFont1}>{Message.SEARCH_HISTORY_NO_DATA}</Text>
                        </View>
                        :
                        historySearch.map((data, i) => {
                            return (
                                <View style={[Style.rowBetweenCenter, styles.view2]}>
                                    <Text style={styles.font2}>{data}</Text>
                                    <TouchableHighlight
                                        underlayColor={'transparent'}
                                        onPress={() => this.clearStore(i)}>
                                        <AntDesign name={'close'} size={ScreenUtil.setSpFont(14)}
                                                   color={Theme.color_1}/>
                                    </TouchableHighlight>
                                </View>
                            );
                        })
                }
            </View>
        );
    }

    render() {
        return (
            <View style={styles.contains}>
                {this._nav()}
                {this._hotSearch()}
                {this._historySearch()}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        nav: state.nav,
        home: state.home,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        goSearchResult,
        goBackPage,
        SearchHot,
        HomeStateChange,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);

const styles = StyleSheet.create({
    contains: {
        flex: 1,
        backgroundColor: Theme.white,
    },
    input: {
        flex: 1,
        paddingRight: ScreenUtil.scaleSizeW(20),
        fontSize: ScreenUtil.setSpFont(12),
        color: Theme.white,
        marginLeft: ScreenUtil.scaleSizeW(50),
    },
    view1: {
        width: deviceWidth,
        padding: ScreenUtil.scaleSizeW(20),
        marginTop: ScreenUtil.scaleSizeW(10),
    },
    view2: {
        marginBottom: ScreenUtil.scaleSizeW(40),
    },
    font1: {
        color: Theme.themeColor,
        fontSize: ScreenUtil.setSpFont(14),
        fontWeight: '400',
    },
    font2: {
        color: Theme.color_1,
        fontSize: ScreenUtil.setSpFont(12),
        fontWeight: '400',
    },
    searchView: {
        paddingLeft: ScreenUtil.scaleSizeW(8),
        paddingRight: ScreenUtil.scaleSizeW(8),
        height: ScreenUtil.scaleSizeH(40),
        backgroundColor: Theme.color_3,
        marginRight: ScreenUtil.scaleSizeW(25),
        marginTop: ScreenUtil.scaleSizeW(25),
    },
    searchFont1: {
        color: Theme.color_11,
        fontSize: ScreenUtil.setSpFont(12),
    },
    searchFont2: {
        color: Theme.color_6,
        fontSize: ScreenUtil.setSpFont(12),
    },
    searchFont3: {
        color: Theme.color_2,
        fontSize: ScreenUtil.setSpFont(12),
    },
    searchFont4: {
        color: Theme.color_12,
        fontSize: ScreenUtil.setSpFont(12),
    },
    searchFont5: {
        color: Theme.color_10,
        fontSize: ScreenUtil.setSpFont(12),
    },
    historyFont1: {
        color: Theme.color_1,
        fontSize: ScreenUtil.setSpFont(12),
        marginTop: ScreenUtil.scaleSizeH(40),
    },
});
