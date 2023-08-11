import { FC, useContext } from "react"
import { ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native"
import AppContext from "../../../context/AppContext"
import { petorganization } from "../../../interface"
import CustomView from "../../utils/CustomView"
import Text from "../../utils/Text"
import Icon from "../../utils/Icon"
export interface organizatonprops {
    organizationClick: (arg0: string) => void,
    petorganizationdata: Pick<petorganization, "id" | "bussinessname" | "profile">,
}
const OrganizatonCard: FC<organizatonprops> = ({organizationClick, petorganizationdata}) => {
    const {id, bussinessname, profile} = petorganizationdata;
    const appState = useContext(AppContext);
    const styles = StyleSheet.create({
        itemRoot: { width: 150, height: 200, marginHorizontal: 5, borderRadius: 10, overflow: 'hidden', elevation: 5 },
        itemContainer: { flex: 1 },
        textcontainer: { padding: 10, height: 50 },
        organizationname: { fontSize: 20 },
        ratingbox: { flexDirection: "row", backgroundColor: "green", padding: 3, marginStart: "auto", alignItems: "center", borderRadius: 5 },
        ratingtext: { color: "white" },
        imagebackground: { flex: 1, padding: 10 },
    });
    return <CustomView style={styles.itemRoot}>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => { organizationClick(id) }}>
            <View style={styles.itemContainer}>
                <ImageBackground source={{ uri: profile }} style={styles.imagebackground}>
                    <View style={styles.ratingbox}>
                        <Text style={styles.ratingtext}>5 |</Text>
                        <Icon style={styles.ratingtext} value='star' size={15} />
                    </View>
                </ImageBackground>
                <View style={styles.textcontainer}>
                    <Text style={styles.organizationname}>{bussinessname}</Text>
                </View>
            </View>
        </TouchableOpacity>
    </CustomView >
};
export default OrganizatonCard;