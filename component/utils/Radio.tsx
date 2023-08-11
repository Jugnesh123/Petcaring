import { FC, useContext, useState } from "react";
import { StyleProp, StyleSheet, TouchableNativeFeedback, View, ViewStyle } from "react-native";
import AppContext from "../../context/AppContext";
import Icon from "./Icon";
import Text from "./Text";

export interface radioprops {
    text: string,
    value: string,
    mainValue?: string,
    setMainValue?: (arg0: string)=>void,
    style?: StyleProp<ViewStyle>
}
const Radio: FC<radioprops> = ({text, setMainValue, mainValue, value, style}) => {
    const appState = useContext(AppContext);
    const styles = StyleSheet.create({
        buttonRoot: {
            borderRadius: 10,
            margin: 10,
            height: 50,
            borderWidth: 1,
            borderColor: appState?.colorValue.borderColor
        },
        radioContainer: {
            flex: 1,
            paddingHorizontal: 10,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },
        text: {
            marginStart: 5
        }
    });
    return  <View style={[styles.buttonRoot, style]}>
    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(String(appState?.colorValue.rippleColor), true)} onPress={()=>{setMainValue?.(value)}}>
        <View style={styles.radioContainer}>
            <Icon value={mainValue == value ? "radio_button_checked" : "radio_button_unchecked"} />
            <Text style={styles.text}>{text}</Text>
        </View>
    </TouchableNativeFeedback>
    </View>
}
export default Radio;