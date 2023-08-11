import { FC, useContext } from "react";
import { StyleProp, Button as NativeButton, TouchableNativeFeedback, View, ViewStyle, StyleSheet, TextStyle } from "react-native";
import AppContext from "../../context/AppContext";
import Text from "./Text";
export interface buttonprops {
    value: string,
    onPress?: () => void,
    backgroundColor?: string,
    color?: string,
    style?: StyleProp<ViewStyle>,
    rootstyle?: StyleProp<ViewStyle>,
    textstyle?: StyleProp<TextStyle>,
}
const Button: FC<buttonprops> = ({ value, onPress, style, backgroundColor,color, rootstyle, textstyle}) => {

    const appState = useContext(AppContext);
    let texts:{[index: string]: string|undefined}= {}
    if(color)
        texts["color"] = color
    const customStyle = StyleSheet.create({
        buttonRoot: {
            borderRadius: 10,
            backgroundColor: backgroundColor?backgroundColor:"orange",
        },
        buttonContainer: {
            display: "flex",
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
        },
        text:{
            ...texts,
            
            fontFamily: "Ubuntu-Bold",
            textTransform: "uppercase",
        }
    });
    return <View style={[customStyle.buttonRoot, rootstyle]}>
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(String(appState?.colorValue.rippleColor), true)} onPress={onPress}>
                <View style={[customStyle.buttonContainer, style]}>
                    <Text style={[customStyle.text, textstyle]}>{value}</Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    
}
export default Button;