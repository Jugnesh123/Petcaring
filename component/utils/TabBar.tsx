import { FC } from "react";
import { StyleProp, TouchableNativeFeedback, View, ViewStyle } from "react-native";
import Icon from "./Icon";
export interface tabbarprops{
    tab: string[],
    setIndex?: (arg0: number)=>void,
    index?: number,
    tabStyle?: StyleProp<ViewStyle>
}
const TabBar:FC<tabbarprops> = ({tab, index, setIndex,tabStyle}) => {
    return (
        <View style={{flex: 1, flexDirection: "row"}}>
            {tab.map((value, i)=>{
                return <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("orange", false)} key={i} onPress={()=>(index!=i && setIndex?.(i))}>
                    <View style={[{flex: 1, justifyContent: "center", alignItems: "center"}, tabStyle]}>
                        <Icon value={value} color={index==i?"orange":undefined}/>
                    </View>
                </TouchableNativeFeedback>
            })}
        </View>
    );
}
export default TabBar;