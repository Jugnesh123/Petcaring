import { useWindowDimensions, View } from "react-native";
import CustomView from "./utils/CustomView";
import Icon from "./utils/Icon";
import Text from "./utils/Text";

const NoInternet = (): JSX.Element =>{
    const {height: windowHeight} = useWindowDimensions();
    return <CustomView style={{ position: "absolute",zIndex: 1, width: "100%", height: windowHeight, flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Icon value="signal_cellular_connected_no_internet_0_bar" color="orange" size={100}/>
        <Text>No Internet</Text>
    </CustomView>
}
export default NoInternet;