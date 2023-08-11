import { FC, useContext, useEffect, useState } from "react";
import { AppState, FlatList, Image, ImageBackground, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View, VirtualizedList } from "react-native";
import { petorganization_breed } from "../../interface";
import CustomView from "../utils/CustomView";
import Icon from "../utils/Icon";
import Slider from "../utils/Slider";
import Text from "../utils/Text";
import OrganizatonCard from "./main/OrganizationCard";
import AppContext from "../../context/AppContext";
import axios from "axios";
import CustomAxios, { serverHost } from "../Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OrganizationProfile from "../OrganizationProfile";
import { imagebaseurl, randomimage } from "../../Root";
export interface homeMainProps {
    imageList: string[],
    organizationClick: (arg0: string) => void,
    serviceClick: (arg0: petorganization_breed) => void,
    petorganizationservice: petorganization_breed[],
    setPetOrganizationService: (arg0: petorganization_breed[]) => void;
}
const Main: FC<homeMainProps> = ({ imageList, organizationClick, serviceClick, setPetOrganizationService, petorganizationservice }) => {
    const appState = useContext(AppContext);
    const [petorganizationservicesize, setPetorganizationservicesize] = useState(petorganizationservice.length);
    const getOrganization = async (page?: number): Promise<petorganization_breed[] | undefined> => {
        if (page == undefined) {
            page = 1;
        }
        appState?.setShowBottomLoading(true);
        try {
            const value = await CustomAxios.get("service/" + page);
            const data = value.data.data;
            appState?.setShowBottomLoading(false);
            return data;
        } catch (error) {
            console.log(error);
        }
        appState?.setShowBottomLoading(false);
    }

    const serviceCard = (
        <CustomView style={{ width: "100%", height: 150, marginVertical: 5, padding: 5 }}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => { }}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <ImageBackground source={{ uri: "https://picsum.photos/1280/720" }} style={{ height: 145, width: 145, borderRadius: 10, overflow: "hidden", padding: 10 }} resizeMode="cover">
                        <View style={{ flexDirection: "row", backgroundColor: "green", padding: 3, marginStart: "auto", alignItems: "center", borderRadius: 5 }}>
                            <Text style={{ color: "white" }}>5 |</Text>
                            <Icon style={{ color: "white" }} value='star' size={15} />
                        </View>
                    </ImageBackground>
                    <View style={{ padding: 10, flex: 1, justifyContent: "space-around" }}>
                        <View>
                            <Text style={{ fontSize: 20, fontFamily: "Ubuntu-Bold", marginBottom: 5 }}>{"hello"}</Text>
                            <View style={{ marginEnd: "auto", flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
                                <Image source={{ uri: "https://picsum.photos/1280/720" }} style={{ borderRadius: 100, height: 30, width: 30, marginRight: 10, marginBottom: 5 }} />
                                <Text >{"hello"}</Text>
                            </View>
                        </View>
                        <Text style={{ marginBottom: 5 }}>Lorem ipsum dolor sit amet consectetur adipisicing e...</Text>
                        <Text style={{ fontSize: 20 }}>₹ 300</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </CustomView >
    );
    useEffect(() => {
        if (petorganizationservice.length == 0)
            if (appState?.showBottomLoading == false) {

                getOrganization().then((value) => {
                    setPetOrganizationService(value!);
                    setPetorganizationservicesize(petorganizationservice.length);
                });
            }
    }, [petorganizationservice])
    return <VirtualizedList

        getItemCount={(_data: unknown) => petorganizationservicesize}
        getItem={(_data: unknown, index: number) => petorganizationservice[index]}
        ListHeaderComponent={(
            <>
                <View>
                    <Slider images={imageList} />
                </View>
            </>

        )
        }
        onEndReached={() => {
            if (petorganizationservice.length > 0) {
                if (appState?.showBottomLoading == false) {

                    getOrganization((petorganizationservicesize / 5) + 1).then((value) => {
                        setPetOrganizationService(value!);
                        setPetorganizationservicesize(petorganizationservice.length);
                    });
                }
            }
        }}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (<CustomView key={item.id} style={{ width: "100%", height: 150, marginVertical: 5, padding: 5 }}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => serviceClick(item)}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <ImageBackground source={{ uri: item.profile?`${imagebaseurl}${item.profile}`:randomimage }} style={{ height: 145, width: 145, borderRadius: 10, overflow: "hidden", padding: 10 }} resizeMode="cover">
                        <View style={{ flexDirection: "row", backgroundColor: "green", padding: 3, marginStart: "auto", alignItems: "center", borderRadius: 5 }}>
                            <Text style={{ color: "white" }}>5 |</Text>
                            <Icon style={{ color: "white" }} value='star' size={15} />
                        </View>
                    </ImageBackground>
                    <View style={{ padding: 10, flex: 1, justifyContent: "space-around" }}>

                        <TouchableWithoutFeedback  onPress={()=>organizationClick(item.petorganization?.id as string)}>
                            <View>

                                <Text style={{ fontSize: 20, fontFamily: "Ubuntu-Bold", marginBottom: 5 }}>{item.service?.name}</Text>
                                <View style={{ marginEnd: "auto", flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
                                    <Image source={{ uri: item.profile?`${imagebaseurl}${item.profile}`:randomimage}} style={{ borderRadius: 100, height: 30, width: 30, marginRight: 10, marginBottom: 5 }} />
                                    <Text >{item.petorganization?.bussinessname}</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <Text style={{ marginBottom: 5 }}>{item.description?.substring(0,49)}...</Text>
                        <Text style={{ fontSize: 20 }}>₹ {item.price}/{item.perday?"day":"hour"}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </CustomView >
        )
        }
    />
};
export default Main;