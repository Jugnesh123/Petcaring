import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Children, FC, useContext, useRef, useState } from "react";
import { Alert, Animated, Image, ScrollView, Touchable, TouchableOpacity, useWindowDimensions, View } from "react-native";
import AppContext from "../context/AppContext";
import { petorganization_breed } from "../interface";
import { RootStackParamList, imagebaseurl, randomdescription, randomimage } from "../Root";
import Button from "./utils/Button";
import CustomView from "./utils/CustomView";
import Icon from "./utils/Icon";
import IconButton from "./utils/IconButton";
import Slider from "./utils/Slider";
import Text from "./utils/Text";

type props = NativeStackScreenProps<RootStackParamList, "serviceprofile">
const ServiceProfile: FC<props> = ({ navigation, route }) => {
    const ScrollY = useRef(new Animated.Value(0)).current;
    const {value} = route.params;
    const appState = useContext(AppContext);
    const { width: windowWidth } = useWindowDimensions();
    const imageheight = ScrollY.interpolate({
        inputRange: [0, 250],
        outputRange: [300, 50],
        extrapolate: 'clamp'
    })
    const imageBorderRadius = ScrollY.interpolate({
        inputRange: [0, 300],
        outputRange: [10, 100],
        extrapolate: "clamp"
    })
    const imageWidth = ScrollY.interpolate({
        inputRange: [0, 250],
        outputRange: [windowWidth - 10, 50],
        extrapolate: "clamp"
    })
    const imageleft = ScrollY.interpolate({
        inputRange: [0, 250],
        outputRange: [5, 55],
        extrapolate: 'clamp'
    })
    const backgroundOpacity = ScrollY.interpolate({
        inputRange: [250, 300],
        outputRange: [0, 1],
        extrapolate: "clamp",
    });
    const backgroundColor = ScrollY.interpolate({
        inputRange: [200, 201],
        outputRange: ["transparent", appState?.colorValue.background as string],
        extrapolate: "clamp",
    })
    const appbarZindex = ScrollY.interpolate({
        inputRange: [150, 200],
        outputRange: [2, 1],
        extrapolate: 'clamp'
    })
    const showAlert = () => {
        appState?.setAlert({
            title: "Rating feedback",
            description: "Are you sure to want submit",
            buttons: [
                {
                    value: "Cancel",
                }, {
                    value: "Ok",
                    highlighted: true
                }
            ]
        });
    }
    const [petOwnerRating, setPetOwnerRating] = useState<boolean[]>([false, false, false, false, false]);
    const setstarChecked = (index: number) => {
        let value: boolean[] = [];
        for (let i = 0; i < 5; i++) {
            if (i <= index)
                value.push(true)
            else
                value.push(false)
        }
        setPetOwnerRating([...value]);
    }
    const [moreDescription, setMoreDescription] = useState(false);
    const StarButton: FC<{ checked?: Boolean, index: number }> = ({ checked, index }) => (<IconButton icon={{ size: 30, value: checked ? "star" : "star_outline", color: "orange" }} onPress={() => { setstarChecked(index) }} />)
    return <View style={{ flex: 1 }}>
        <Animated.View style={{
            height: 60,
            width: windowWidth,
            top: 0,
            left: 0,
            position: "absolute",
            backgroundColor: backgroundColor,
            paddingVertical: 5,
            paddingHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
            borderBottomEndRadius: 10,
            zIndex: appbarZindex,
            borderBottomStartRadius: 10,
        }}>
            <IconButton icon={{ value: "arrow_back" }} rootStyle={{ marginEnd: 70 }} onPress={() => { navigation.pop() }} />
            <Animated.View style={{ opacity: backgroundOpacity }}>
                <Text style={{ fontSize: 20, fontFamily: "Ubuntu-Bold" }}>
                    {value.service?.name}
                </Text>
            </Animated.View>

        </Animated.View>

        <Animated.Image source={{ uri: value.profile?`${imagebaseurl}${value.profile}`:randomimage }} style={{ height: imageheight, marginLeft: imageleft, borderRadius: imageBorderRadius, width: imageWidth, marginRight: 5, zIndex: 1, position: "absolute", top: 5 }} resizeMode="cover" />

        <CustomView style={{ position: "absolute", bottom: 0, flex: 1, width: "100%", padding: 10, alignItems: "center", zIndex: 5 }}>
            <Button value={`Book ₹ ${value.price}`} rootstyle={{ width: 150, height: 40, justifyContent: "center" }} onPress={() => {
                if(appState?.signIn){
                    navigation.push("booking", {orgservice: value.id, service: value.service?.id as string, petorganization: value.petorganization?.id as string });
                }
                else{
                    navigation.push("signin");
                }
            }} />
        </CustomView>

        <ScrollView
            onScroll={
                Animated.event([
                    {
                        nativeEvent: {
                            contentOffset: {
                                y: ScrollY
                            }
                        }
                    }
                ], { useNativeDriver: false })
            }>
            <CustomView style={{ flex: 1, justifyContent: "center", padding: 10, paddingTop: 310, borderRadius: 10, marginBottom: 10 }}>
                <Text style={{ fontSize: 24, fontFamily: "Ubuntu-Bold" }}>{value.service?.name}</Text>
                <TouchableOpacity onPress={()=>navigation.push("organizationprofile", {id: value.petorganization?.id as string})}>
                    <View style={{ marginTop: 10, flex: 1, flexDirection: "row", alignItems: "center" }}>
                        <Image source={{ uri: value.petorganization?.profile?`${imagebaseurl}${value.petorganization.profile}`:randomimage }} style={{ width: 50, height: 50, borderRadius: 100 }} />
                        <Text style={{ marginStart: 10, flex: 1, fontSize: 20 }}>{value.petorganization?.bussinessname}</Text>
                    </View>
                </TouchableOpacity>
            </CustomView>
            <CustomView style={{ flex: 1, marginBottom: 10, borderRadius: 10, padding: 10 }}>
                <Text style={{ marginBottom: 5, fontFamily: "Ubuntu-Bold", fontSize: 20 }}>Description</Text>
                <Text>
                    Breed : {value.breed?.name}
                </Text>
                <Text>
                    {
                        randomdescription!.length > 600 ? moreDescription ?
                            <>
                                {randomdescription}<Text style={{ color: "orange" }} onPress={() => setMoreDescription(false)}>  less</Text>

                            </>
                            :
                            <>
                                {randomdescription?.substring(0, 600)}<Text style={{ color: "orange" }} onPress={() => setMoreDescription(true)}> ...more</Text>
                            </>
                            :
                            randomdescription
                    }
                </Text>
            </CustomView>
            <CustomView style={{ flex: 1, marginBottom: 10, borderRadius: 10, padding: 10 }}>
                <Text style={{ fontFamily: "Ubuntu-Bold", fontSize: 20 }}>Add your rating to this Service</Text>
                <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 10 }}>
                    {
                        petOwnerRating.map((value, index) => (<StarButton index={index} checked={value} key={index} />))
                    }
                </View>
                <Button value="Submit" rootstyle={{ alignSelf: "flex-end" }} onPress={showAlert} />
            </CustomView>
            <CustomView style={{ flex: 1, marginBottom: 70, borderRadius: 10, padding: 10 }}>
                <Text style={{ fontFamily: "Ubuntu-Bold", fontSize: 20 }}>Ratings</Text>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={{ justifyContent: 'center', alignItems: "center" }}>
                        <Text style={{ fontSize: 50, fontFamily: "Ubuntu-Bold" }}>{4.5}</Text>
                        <View style={{ flexDirection: "row" }}>
                            <Icon value="star" color="orange" />
                            <Icon value="star" color="orange" />
                            <Icon value="star" color="orange" />
                            <Icon value="star" color="orange" />
                            <Icon value="star" color="orange" />
                        </View>
                    </View>
                    <View style={{ flex: 1, marginStart: 10 }}>
                        {[5, 4, 3, 2, 1].map(value => {
                            return <View key={value} style={{ flex: 1, flexDirection: "row", marginVertical: 5, alignItems: "center" }}>
                                <Text>{value}</Text>
                                <View style={{ flex: 1, marginStart: 10, backgroundColor: appState?.colorValue.backgroundSubtle, borderRadius: 50, overflow: "hidden" }}>
                                    <View style={{ width: `${(value * 100) / 5}%`, backgroundColor: "orange", height: 10, borderRadius: 50 }}>
                                    </View>
                                </View>
                            </View>
                        })}
                    </View>
                </View>
            </CustomView>
        </ScrollView>

    </View>
}
export default ServiceProfile;