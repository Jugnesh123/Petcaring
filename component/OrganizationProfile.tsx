import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Children, FC, useContext, useEffect, useRef, useState } from "react";
import { Alert, Animated, Image, Linking, ScrollView, useWindowDimensions, View } from "react-native";
import AppContext from "../context/AppContext";
import { petorganization } from "../interface";
import { RootStackParamList, imagebaseurl, randomdescription, randomimage } from "../Root";
import Button from "./utils/Button";
import CustomView from "./utils/CustomView";
import Icon from "./utils/Icon";
import IconButton from "./utils/IconButton";
import Slider from "./utils/Slider";
import Text from "./utils/Text";
import CustomAxios from "./Axios";
import { Axios } from "axios";

type props = NativeStackScreenProps<RootStackParamList, "organizationprofile">
const OrganizationProfile: FC<props> = ({navigation, route }) => {
    const {id} = route.params;
    const ScrollY = useRef(new Animated.Value(0)).current;
    const [organization, setOrganization] = useState<petorganization>();
    const fetechdata = async () =>{
        appState?.setShowLoading(true);
        try{
            const res = await CustomAxios.get("/user/"+id);
            const data = res.data as petorganization;
            setOrganization(data);
        }
        catch{

        }
        finally{
            appState?.setShowLoading(false);
        }
    }
    useEffect(()=>{
        if(organization == undefined)
            fetechdata();
    },[])
    
    const { width: windowWidth } = useWindowDimensions();
    const imageheight = ScrollY.interpolate({
        inputRange: [0, 120],
        outputRange: [150, 50],
        extrapolate: 'clamp'
    })
    const imageleft = ScrollY.interpolate({
        inputRange: [0, 120],
        outputRange: [(windowWidth - 150) / 2, 55],
        extrapolate: 'clamp'
    })
    const backgroundOpacity = ScrollY.interpolate({
        inputRange: [100, 150],
        outputRange: [0, 1],
        extrapolate: "clamp",
    });
    const showAlert = () => {
       appState?.setAlert({
        title: "Rating feedback",
        description: "Are you sure to want submit",
        buttons: [
            {
                value: "Cancel",
            },{
                value: "Ok",
                highlighted: true
            }
        ]
       });
    }
    const [petOwnerRating, setPetOwnerRating] = useState<boolean[]>([false, false, false, false, false]);
    const images = [
        "https://media.istockphoto.com/id/1181199995/photo/dog-walking-on-leash-in-fall-park-holding-orange-toy-in-mouth.jpg?s=612x612&w=0&k=20&c=DltZtPq4ELZNXebwBAPr9agTzkqI5jtvrXJvt_SarVU=",
        "https://media.istockphoto.com/id/1181199995/photo/dog-walking-on-leash-in-fall-park-holding-orange-toy-in-mouth.jpg?s=612x612&w=0&k=20&c=DltZtPq4ELZNXebwBAPr9agTzkqI5jtvrXJvt_SarVU=",
        "https://media.istockphoto.com/id/1181199995/photo/dog-walking-on-leash-in-fall-park-holding-orange-toy-in-mouth.jpg?s=612x612&w=0&k=20&c=DltZtPq4ELZNXebwBAPr9agTzkqI5jtvrXJvt_SarVU=",
        "https://media.istockphoto.com/id/1181199995/photo/dog-walking-on-leash-in-fall-park-holding-orange-toy-in-mouth.jpg?s=612x612&w=0&k=20&c=DltZtPq4ELZNXebwBAPr9agTzkqI5jtvrXJvt_SarVU=",
        "https://media.istockphoto.com/id/1181199995/photo/dog-walking-on-leash-in-fall-park-holding-orange-toy-in-mouth.jpg?s=612x612&w=0&k=20&c=DltZtPq4ELZNXebwBAPr9agTzkqI5jtvrXJvt_SarVU=",
        "https://media.istockphoto.com/id/1181199995/photo/dog-walking-on-leash-in-fall-park-holding-orange-toy-in-mouth.jpg?s=612x612&w=0&k=20&c=DltZtPq4ELZNXebwBAPr9agTzkqI5jtvrXJvt_SarVU=",
        "https://media.istockphoto.com/id/1181199995/photo/dog-walking-on-leash-in-fall-park-holding-orange-toy-in-mouth.jpg?s=612x612&w=0&k=20&c=DltZtPq4ELZNXebwBAPr9agTzkqI5jtvrXJvt_SarVU=",
        "https://media.istockphoto.com/id/1181199995/photo/dog-walking-on-leash-in-fall-park-holding-orange-toy-in-mouth.jpg?s=612x612&w=0&k=20&c=DltZtPq4ELZNXebwBAPr9agTzkqI5jtvrXJvt_SarVU=",
        "https://media.istockphoto.com/id/1181199995/photo/dog-walking-on-leash-in-fall-park-holding-orange-toy-in-mouth.jpg?s=612x612&w=0&k=20&c=DltZtPq4ELZNXebwBAPr9agTzkqI5jtvrXJvt_SarVU=",
    ];
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
    const appState = useContext(AppContext);
    if(organization)
    return <View style={{ flex: 1 }}>
        <Animated.View style={{
            height: 60,
            width: windowWidth,
            top: 0,
            left: 0,
            position: "absolute",
            backgroundColor: appState?.colorValue.background,
            paddingVertical: 5,
            paddingHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
            borderBottomEndRadius: 10,
            zIndex: 1,
            borderBottomStartRadius: 10,
        }}>
            <IconButton icon={{ value: "arrow_back" }} rootStyle={{ marginEnd: 70 }} onPress={()=>{navigation.pop()}} />
            <Animated.View style={{ opacity: backgroundOpacity }}>
                <Text style={{ fontSize: 20, fontFamily: "Ubuntu-Bold" }}>
                    {organization?.bussinessname}
                </Text>
            </Animated.View>
        </Animated.View>
        <Animated.Image source={{ uri: organization?.profile?`${imagebaseurl}${organization.profile}`:randomimage }} style={{ borderRadius: 100, height: imageheight, width: imageheight, zIndex: 5, position: "absolute", top: 5, left: imageleft }} resizeMode="cover" />
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
            <CustomView style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 10, paddingTop: 160, borderRadius: 10, marginBottom: 10 }}>
                <Text style={{ fontSize: 24, fontFamily: "Ubuntu-Bold" }}>{organization?.bussinessname}</Text>
                <View style={{
                    flex: 1, width: "100%", justifyContent: 'space-evenly', flexDirection: "row", paddingTop: 10,
                }}>
                    <IconButton icon={{ value: "phone", color: "orange" }} rippleColor="orange" onPress={()=>Linking.openURL(`tel:${organization.phone}`)}/>
                    <IconButton icon={{ value: "message", color: "orange" }} rippleColor="orange"onPress={()=>Linking.openURL(`sms:${organization.phone}`)} />
                    <IconButton icon={{ value: "email", color: "orange" }} rippleColor="orange" onPress={()=>Linking.openURL(`mailto:${organization.email}`)}/>
                </View>
            </CustomView>
            <CustomView style={{ flex: 1, marginBottom: 10, borderRadius: 10, padding: 10 }}>
                <Text style={{ marginBottom: 5, fontFamily: "Ubuntu-Bold", fontSize: 20 }}>Description</Text>
                <Text>
                    {
                        randomdescription?.length! > 100 ? moreDescription ?
                            <>
                                {randomdescription}<Text style={{ color: "orange" }} onPress={() => setMoreDescription(false)}>  less</Text>

                            </>
                            :
                            <>
                                {randomdescription?.substring(0, 100)}<Text style={{ color: "orange" }} onPress={() => setMoreDescription(true)}> ...more</Text>
                            </>
                            :
                            randomdescription
                    }
                </Text>
            </CustomView>
            <CustomView style={{ flex: 1, marginBottom: 10, borderRadius: 10, paddingTop: 10 }}>
                <Text style={{ paddingStart: 10, marginBottom: 5, fontFamily: "Ubuntu-Bold", fontSize: 20 }}>Image Collections</Text>
                <Slider images={images} />
            </CustomView>
            <CustomView style={{ flex: 1, marginBottom: 10, borderRadius: 10, padding: 10 }}>
                <Text style={{ fontFamily: "Ubuntu-Bold", fontSize: 20 }}>Add your rating to this organization</Text>
                <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 10 }}>
                    {
                        petOwnerRating.map((value, index) => (<StarButton index={index} checked={value} key={index} />))
                    }
                </View>
                <Button value="Submit" rootstyle={{ alignSelf: "flex-end" }} onPress={showAlert} />
            </CustomView>
            <CustomView style={{ flex: 1, marginBottom: 10, borderRadius: 10, padding: 10 }}>
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
    else
    return <></>
}
export default OrganizationProfile;