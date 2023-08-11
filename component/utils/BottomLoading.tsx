import { FC, useContext, useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import AppContext from "../../context/AppContext";

const BottomLoading: FC<{}> = () => {
    const { windowWidth } = useContext(AppContext)!;
    const widthSize = windowWidth * 0.5;
    let left = new Animated.Value(0);
    let width = new Animated.Value(0);
    let leftInterpolate = left.interpolate({ inputRange: [0, 1], outputRange: [-1*widthSize, windowWidth + widthSize] });
    let widthInterpolate = width.interpolate({ inputRange: [0, 1], outputRange: [1, 3] });
    const load = () =>{
        const tovalue = 1; 
        Animated.loop(Animated.timing(left, {
            toValue: tovalue,
            duration: 3000,
            useNativeDriver: false,
        })).start();
    
        Animated.loop(
            Animated.sequence([
                Animated.timing(width, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: false,
                }),
    
                Animated.timing(width, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: false,
                }),
            ])
        ).start();
    }
    useEffect(() => {
        load();
    }, [left, width]);
    return <View style={{width: "100%"}}><Animated.View style={{ backgroundColor: "orange", height: 3, borderRadius: 3, width: widthSize / 3, transform: [{ translateX: leftInterpolate }, { scaleX: widthInterpolate }] }} /></View>
}
export default BottomLoading;