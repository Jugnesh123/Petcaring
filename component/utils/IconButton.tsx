import { FC, useContext } from "react";
import { StyleProp, TextStyle, TouchableNativeFeedback, View, ViewStyle } from "react-native";
import AppContext from "../../context/AppContext";
import Icon, { IconProps } from "./Icon";
import Text from "./Text";
interface IconButtonProps {
    icon: IconProps,
    value?: string,
    textStyle?: StyleProp<TextStyle>,
    onPress?: () => void,
    rippleColor?: string,
    rootStyle?: StyleProp<ViewStyle>,
}
const IconButton: FC<IconButtonProps> = ({rootStyle, icon, value, rippleColor, textStyle, onPress }) => {
    const appState = useContext(AppContext);
    let textcolor: { [index: string]: string } = {}
    if (icon.color) {
        textcolor.color = icon.color
    }
    return (

        <View style={[{ margin: 5 }, rootStyle]}>
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(rippleColor ? rippleColor : String(appState?.colorValue.rippleColor), true)} onPress={onPress} style={{position: "absolute", zIndex: 10}}>
                <View style={{ padding: 3, justifyContent: "center", alignItems: "center" }}>
                    {
                        icon &&
                        <Icon {...icon} />
                    }
                    {
                        value &&
                        <Text style={[{ fontSize: 12, ...textcolor }, textStyle]}>{value}</Text>
                    }
                </View>
            </TouchableNativeFeedback>
        </View>
    );
}

export default IconButton;