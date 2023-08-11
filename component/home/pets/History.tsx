import { FC } from "react"
import { FlatList, Image, View } from "react-native"
import { transaction } from "../../../interface"
import CustomView from "../../utils/CustomView"
import Text from "../../utils/Text"
import { imagebaseurl, randomimage } from "../../../Root"
export interface historyprops{
    history: transaction[],
}
const History:FC<historyprops> = ({history}): JSX.Element => {
    return <FlatList
        data={history}
        renderItem={({ item }) => {
            return <View key={item.id} style={{ flex: 1, paddingVertical: 10, paddingHorizontal: 5 }}>
                <CustomView style={{ flex: 1, elevation: 5, flexDirection: "row", borderRadius: 10, overflow: "hidden" }}>
                    <Image source={{ uri: item.petorganization?.profile?`${imagebaseurl}${item.petorganization.profile}`:randomimage }} style={{ flex: 1, maxWidth: 100, borderRadius: 10 }} resizeMode="cover" />
                    <View style={{ flex: 1, padding: 10, justifyContent: "space-between" }}>
                        <Text style={{ fontFamily: "Ubuntu-Bold", fontSize: 20 }}>{item.petorganization?.bussinessname}</Text>
                        <View style={{ width: "100%", flexDirection: "row" }}>
                            <Text style={{ flex: 1, }}>{new Date(item.startdate!).toString()}</Text>
                            <Text style={{ fontSize: 30 }}>₹{item.price}</Text>
                        </View>
                    </View>
                </CustomView>
            </View>
        }}
    />
}
export default History;