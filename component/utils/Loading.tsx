import { ActivityIndicator, useWindowDimensions, View } from "react-native";

const Loading = ():JSX.Element => {
    const {height: windowHeight} = useWindowDimensions();
    return <View style={{ position: "absolute", zIndex: 1, width: "100%", backgroundColor: "#000000af", height: windowHeight, flex: 1, justifyContent:"center", alignContent: "center" }}>
        <ActivityIndicator size="large" color="orange" />
    </View>
}
export default Loading;