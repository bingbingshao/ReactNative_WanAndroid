/**
 * Author: Wolf.Ma
 * Date: 2020/05/
 */

import React from "react";
import {RefreshHeader} from "react-native-spring-scrollview/RefreshHeader";
import {
    ActivityIndicator,
    Animated,
    View,
    StyleSheet,
    Text
} from "react-native";

export class ListHeader extends RefreshHeader {
    static height = 80;

    static style = "stickyContent";  //bottoming  stickyScrollView  stickyContent


    render() {
        return (
            <View style={styles.container}>
                {this._renderIcon()}
                <View style={styles.rContainer}>
                    <Text style={styles.text}>
                        {this.getTitle()}
                    </Text>
                    {this.renderContent()}
                </View>
            </View>
        );
    }

    _renderIcon() {
        const s = this.state.status;
        if (s === "refreshing" || s === "rebound") {
            return <ActivityIndicator color={"gray"}/>;
        }
        const {maxHeight, offset} = this.props;
        return (
            <Animated.Image
                source={require("../image/arrow.png")}
                style={{
                    width: 30,
                    height: 30,
                    resizeMode: 'contain',
                    transform: [
                        {
                            rotate: offset.interpolate({
                                inputRange: [-maxHeight - 1 - 10, -maxHeight - 10, -50, -49],
                                outputRange: ["180deg", "180deg", "0deg", "0deg"]
                            })
                        }
                    ]
                }}
            />
        );
    }

    renderContent() {
        return null;
    }

    getTitle() {
        const s = this.state.status;
        if (s === "pulling" || s === "waiting") {
            return "下拉刷新";
        } else if (s === "pullingEnough") {
            return "释放刷新";
        } else if (s === "refreshing") {
            return "正在刷新 ...";
        } else if (s === "pullingCancel") {
            return "放弃刷新";
        } else if (s === "rebound") {
            return "刷新完成";
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    rContainer: {
        marginLeft: 20
    },
    text: {
        marginVertical: 5,
        fontSize: 15,
        color: "#666",
        textAlign: "center",
        width: 140
    }
});