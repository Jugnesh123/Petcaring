import { FC, useContext, useEffect, useRef, useState } from "react";
import { Animated, FlatList, Image, ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";
import AppContext from "../../context/AppContext";
import { pet, petorganization, transaction } from "../../interface";
import CustomView from "../utils/CustomView";
import TabBar from "../utils/TabBar";
import Text from "../utils/Text";
import Description from "./pets/Description";
import History from "./pets/History";
import ImageView from "./pets/ImageView";
import Species from "./pets/Species";
import CustomAxios from "../Axios";
import { baseurl, imagebaseurl } from "../../Root";
import Icon from "../utils/Icon";

export interface petsprops {
    petsdata: Pick<pet, "id" | "name" | "profile">[] | undefined,
    setPetsdata: (arg0: Pick<pet, "id" | "name" | "profile">[] | undefined) => void;
}
const Pets: FC<petsprops> = ({ petsdata, setPetsdata }) => {
    const appState = useContext(AppContext);
    const [petData, setPetData] = useState<pet>();
    const fetchdata = async (index: string) => {
        if (appState?.showLoading == false)
            appState?.setShowLoading(true);
        try {
            const res = await CustomAxios.get("/pet/" + index);
            appState?.setShowLoading(false);
            setPetData(res.data as pet);
        } catch (e) {
            appState?.setShowLoading(false);
        }
    }
    const fetchdatas = async () => {
        appState?.setShowLoading(true);
        try {
            const res = await CustomAxios.get("/pet/all");
            const data = res.data as Pick<pet, "id" | "name" | "profile">[];
            if (data[0] != null)
                fetchdata(data[0].id);
            else
                appState?.setShowLoading(false);
            setPetsdata(data);
        } catch (e) {
            appState?.setShowLoading(false);
        }
    }
    useEffect(() => {
        if (petsdata == undefined)
            fetchdatas();
        else
            fetchdata(petsdata[0].id);
    }, [])
    const { width: windowWidth } = useWindowDimensions();
    const styles = StyleSheet.create({
        scrollContainer: {
            flex: 1,
            marginTop: 5,
        },
        detailContainer: {
            flex: 1,
            padding: 24,
            width: windowWidth - 10
        },
        header: {
            fontSize: 24,
            marginBottom: 10,
            fontFamily: "Ubuntu-Bold",
        },
        indicatorContainer: {
            paddingVertical: 20
        },
    });
    const [index, setIndex] = useState(0);
    let scrollSlide = useRef<ScrollView>(null);
    const history: transaction[] = [
        {
            id: "1", startdate: Date.now(), petorganization: {
                id: "2", bussinessname: "hello",
                profile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF6Z2O_8YM4J_FyMNx54W66Ulxmh42S1jpiw&usqp=CAU",
            }, price: 200, service: [{ id: "100", service: { id: "111", name: "jkl" }, perday: false }]
        }, {
            id: "4", startdate: Date.now(), petorganization: {
                id: "2", bussinessname: "hello",
                profile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF6Z2O_8YM4J_FyMNx54W66Ulxmh42S1jpiw&usqp=CAU",
            }, price: 200, service: [{ id: "100", service: { id: "111", name: "jkl" }, perday: false }]
        }
    ];
    useEffect(() => {
        scrollSlide.current?.scrollTo({ x: (windowWidth - 10) * index, y: 0, animated: true });
    }, [index])
    return (
        <ScrollView style={{ flex: 1 }} nestedScrollEnabled={true}>
            <Species species_data={petsdata} fetchdata={fetchdata} />
            <View style={{ alignItems: "center", padding: 5 }}>
                {
                    petData?.profile ?
                        <Image source={{ uri: `${imagebaseurl}${petData?.profile}` }} style={{ height: 100, width: 100, borderRadius: 100 }} />
                        :
                        <View>
                            <Icon value="image" style={{ fontSize: 50 }} />
                        </View>

                }
                <Text style={{ fontSize: 20, fontFamily: "Ubuntu-Bold", marginTop: 10 }}>{petData?.name}</Text>
                <View style={{ width: "100%", marginTop: 10 }}>
                    <View style={{ flex: 1, borderColor: appState?.colorValue.borderColor, borderBottomWidth: 1 }}>
                        <TabBar tab={["description", "image", "history"]} tabStyle={{ padding: 10 }} setIndex={setIndex} index={index} />
                    </View>
                    <View style={styles.scrollContainer}>
                        <ScrollView
                            horizontal={true}
                            ref={scrollSlide}
                            style={{ height: "100%" }}
                            scrollToOverflowEnabled={true}
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            scrollEnabled={false}>
                            <View style={{ width: windowWidth - 10 }}>
                                {
                                    index == 0 &&
                                    <Description breed={petData?.breed} description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis voluptas dolorem odio debitis aperiam sint beatae voluptate maiores quis officia impedit autem consequuntur tempora, minima eius odit adipisci quia quaerat. Quisquam, porro assumenda veniam, voluptas, non accusamus tenetur dolorem laudantium dolores autem a iste quam! Rerum officiis ex deserunt necessitatibus minus ullam iusto sint tempore similique ipsum eius magni, eligendi, pariatur, minima harum repellat repellendus commodi maxime. Maxime itaque cumque id, debitis quisquam, saepe, tempore officiis rem perspiciatis atque totam accusantium a porro illo modi quas unde quis tenetur qui fugit aut voluptate. Veniam ullam error repudiandae eos corrupti hic voluptate magnam aliquid dolores, sapiente amet blanditiis magni distinctio dolor voluptatem reiciendis quasi facere. Aperiam obcaecati maiores quisquam ad error delectus ullam at consectetur, eligendi veritatis numquam minus nam suscipit rem? Laudantium distinctio reiciendis ad dolorem nihil quae, earum iusto sint consequuntur voluptatibus magnam corrupti laboriosam consequatur amet quod veritatis maiores ipsa at ullam porro molestias illo. Enim autem, impedit est consequatur distinctio in iusto qui nemo asperiores magni blanditiis, odio molestiae. Itaque, accusamus mollitia sunt nemo nobis sint at earum optio tempore a beatae quis possimus aperiam eius quas iusto id placeat alias eaque modi voluptate eum perspiciatis reiciendis exercitationem! Quam eveniet dolore laudantium culpa tempora eligendi facere est quas voluptates suscipit necessitatibus, maxime modi harum deleniti vitae iure soluta quia quo. Illo, praesentium. Iusto voluptas corporis recusandae ipsa rem earum voluptatum nostrum! Hic quia voluptatem eos quam eum consequuntur perferendis eius ducimus. Natus suscipit necessitatibus tempora" />

                                }
                            </View>
                            <View style={{ width: windowWidth - 10 }}>
                                {
                                    index == 1 &&
                                    <ImageView image={[
                                        'https://images.unsplash.com/photo-1598214886806-c87b84b7078b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGltYWdlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
                                        'https://images.unsplash.com/photo-1598214886806-c87b84b7078b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGltYWdlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
                                        'https://images.unsplash.com/photo-1598214886806-c87b84b7078b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGltYWdlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
                                        'https://images.unsplash.com/photo-1598214886806-c87b84b7078b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGltYWdlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
                                        'https://images.unsplash.com/photo-1598214886806-c87b84b7078b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGltYWdlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
                                    ]} />
                                }
                            </View>
                            <View style={{ width: windowWidth - 10 }}>
                                {
                                    index == 2 &&
                                    <History history={history} />
                                }
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
export default Pets;