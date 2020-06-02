/**
 * Author: Wolf.Ma
 * Date: 2020/05/
 */
import React from "react";
import {LoadingFooter} from "react-native-spring-scrollview/LoadingFooter";
import {
    ActivityIndicator,
    Animated,
    View,
    StyleSheet,
    Text
} from "react-native";

export class ListFooter extends LoadingFooter {
    static height = 80;

    static style = "stickyContent";  //topping  stickyScrollView  stickyContent

    render() {
        if (this.state.status === "allLoaded")
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>{this.getTitle()}</Text>
                </View>
            );
        return (
            <View style={styles.container}>
                {this._renderIcon()}
                <View style={styles.rContainer}>
                    <Text style={styles.text}>{this.getTitle()}</Text>
                    {this.renderContent()}
                </View>
            </View>
        );
    }

    _renderIcon() {
        const s = this.state.status;
        if (s === "loading" || s === "cancelLoading" || s === "rebound") {
            return <ActivityIndicator color={"gray"}/>;
        }
        const {maxHeight, offset, bottomOffset} = this.props;
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
                                inputRange: [
                                    bottomOffset - 1 + 45,
                                    bottomOffset + 45,
                                    bottomOffset + maxHeight,
                                    bottomOffset + maxHeight + 1
                                ],
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
        if (s === "dragging" || s === "waiting") {
            return "上拉加载";
        } else if (s === "draggingEnough") {
            return "释放加载";
        } else if (s === "loading") {
            return "正在加载...";
        } else if (s === "draggingCancel") {
            return "放弃加载";
        } else if (s === "rebound") {
            return "加载完成";
        } else if (s === "allLoaded") {
            return "没有数据";
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