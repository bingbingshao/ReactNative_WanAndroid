/**
 *  @author Wolf.Ma
 *  @date 2020-04-04 15:25
 *  带清除按钮的输入框
 */
import React from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';
import ScreenUtilNew from './ScreenUtil';
import Util from './Util';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Theme from './Theme';

export default class ClearTextInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showClearIcon: false,    //清除图标
        };
    }

    onTextInputFocus() {
        this.setState({
            showClearIcon: true,
        });
        if (this.props.onFocus) {
            this.props.onFocus();
        }
    }

    onTextInputBlur() {
        this.setState({
            showClearIcon: false,
        });
        if (this.props.onBlur) {
            this.props.onBlur();
        }
    }

    onTextClear() {
        // console.log("onTextClear",this.props)
        if (this.props.onTextClear) {
            this.props.onTextClear();
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    {...this.props}
                    onFocus={() => this.onTextInputFocus()}
                    onBlur={() => this.onTextInputBlur()}
                />
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    {
                        this.state.showClearIcon && !Util.checkIsEmptyString(this.props.value) ? (
                            <TouchableWithoutFeedback onPress={() => this.onTextClear()}>
                                <View style={{
                                    paddingLeft: ScreenUtilNew.scaleSizeH(30),
                                }}>
                                    <AntDesign name={'close'} color={Theme.color_1} size={18}/>
                                </View>
                            </TouchableWithoutFeedback>
                        ) : null
                    }
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
});
