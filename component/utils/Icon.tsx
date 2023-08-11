import { FC, useContext } from "react";
import { ColorValue, StyleProp, Text, TextStyle } from "react-native";
import AppContext from "../../context/AppContext";
export interface IconProps {
    value: string,
    size?: Number,
    color?: string,
    outlined?: Boolean,
    style?: StyleProp<TextStyle>
}

const Icon: FC<IconProps> = ({ value, color, size, outlined, style }) => {
    const appState = useContext(AppContext);
    let iconstyle : TextStyle = {
        fontFamily: outlined ? "MaterialIconsOutlined-Regular" : "MaterialIcons-Regular",
        fontSize:  Number(size ?? 24),
        color: color?color:appState?.colorValue.text
    }
    return (<Text style={[iconstyle, style]}>{value}</Text>);
}

export default Icon;