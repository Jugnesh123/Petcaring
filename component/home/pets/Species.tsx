import { FC } from "react";
import { FlatList, Image, StyleSheet, TouchableNativeFeedback, View } from "react-native";
import { pet } from "../../../interface";
import CustomView from "../../utils/CustomView";
import Icon from "../../utils/Icon";
import Text from "../../utils/Text";
import { imagebaseurl } from "../../../Root";
interface speciesprops {
    species_data: Pick<pet, "id" | "name" | "profile">[] | undefined,
    fetchdata: (arg0:string)=>void
}
const Species: FC<speciesprops> = ({ species_data, fetchdata }) => {
    const styles = StyleSheet.create({
        speciesstyle: {
            margin: 10,
            elevation: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        speciesImageContainer: {
            width: 70,
            borderRadius: 100,
            height: 70,
            justifyContent: "center",
            alignItems: "center",
            elevation: 4,
            marginBottom: 5,
            overflow: "hidden"
        },
        speciesImage: {
            flex:1,
            height: 70,
            width: 70,
        },
        speciestitle: {
            fontSize: 18,
        }

    });
    const SpeciesRender = ({ id, name, profile }: Pick<pet, "id" | "name" | "profile">) => {
        return (
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("orange", true, 50)} onPress={()=>fetchdata(id)}>
                <View style={styles.speciesstyle}>
                    <CustomView style={styles.speciesImageContainer}>
                        {
                            profile ?
                                <Image source={{ uri: `${imagebaseurl}${profile}` }} style={styles.speciesImage} />
                                :
                                <View>
                                    <Icon value="image" style={{ fontSize: 50 }} />
                                </View>
                        }
                    </CustomView>
                    <Text style={styles.speciestitle}>{name}</Text>
                </View>
            </TouchableNativeFeedback>
        )
    };
    const headerComponet: JSX.Element = (
        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("orange", true, 50)}>
            <View style={styles.speciesstyle}>
                <CustomView style={styles.speciesImageContainer}>
                    <Icon value="add" size={40} />
                </CustomView>
                <Text style={styles.speciestitle}>Add</Text>
            </View>
        </TouchableNativeFeedback>
    )
    return <View style={{ paddingHorizontal: 8 }}>
        <FlatList data={species_data} ListHeaderComponent={headerComponet} renderItem={({ item }) => <SpeciesRender key={item.id} {...item} />} showsHorizontalScrollIndicator={false} horizontal={true} />
    </View>
}
export default Species;