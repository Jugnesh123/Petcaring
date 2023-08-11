import { Attributes, FC, Key, ReactNode, useContext } from "react";
import { StyleProp, ViewStyle, View} from "react-native";
import AppContext from "../../context/AppContext";
export interface viewprops{
    children?: ReactNode,
    style?: StyleProp<ViewStyle>
}
const CustomView:FC<viewprops> = ({style, children}) =>{
    const appState = useContext(AppContext);
    return <View style={[{backgroundColor: appState?.colorValue.background, shadowColor: appState?.colorValue.shadowColor},style]}>{children}</View>
}
export default CustomView;
