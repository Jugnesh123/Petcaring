import { FC, useContext } from "react";
import { View } from "react-native";
import AppContext from "../../context/AppContext";
import BottomLoading from "./BottomLoading";
import CustomView from "./CustomView";
import IconButton from "./IconButton";
export interface bottomnavigationprops {
    tabbar: { icon: string, label: string }[],
    loginIndex?: number[],
    index: number
    tabPress: (arg0: number) => void
}
const BottomNavigation: FC<bottomnavigationprops> = ({ tabbar, index, tabPress }) => {
    const appState = useContext(AppContext);
    return <CustomView style={{ width: "100%"}}>

        {
            appState?.showBottomLoading &&
            <BottomLoading />
        }
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-around"}}>
            {
                tabbar.map((tab, i) => {
                    return (
                        <View key={tab.icon} style={{ width: 80, height: 70, justifyContent: "center" }}>
                            <IconButton rippleColor="orange" icon={{ value: tab.icon, color: index == i ? "orange" : appState?.colorValue.text }} value={tab.label} onPress={() => tabPress(i)} />
                        </View>
                    )
                })
            }
        </View>
    </CustomView>
}
export default BottomNavigation;