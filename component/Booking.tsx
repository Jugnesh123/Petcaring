import { FC, useContext, useEffect, useState } from "react";
import CustomView from "./utils/CustomView";
import { FlatList, Image, Modal, Pressable, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RootStackParamList, imagebaseurl } from "../Root";
import Text from "./utils/Text";
import { pet } from "../interface";
import CustomAxios from "./Axios";
import AppContext from "../context/AppContext";
import Icon from "./utils/Icon";
import IconButton from "./utils/IconButton";
import Button from "./utils/Button";
import { Axios, AxiosError } from "axios";
type props = NativeStackScreenProps<RootStackParamList, "booking">
const Booking: FC<props> = ({ navigation, route }) => {
    const {petorganization, service, orgservice } = route.params;
    const appState = useContext(AppContext);
    const [petdata, setPetdata] = useState<Pick<pet, "id" | "name" | "profile">[] | undefined>(undefined);
    const fetchdatas = async () => {
        appState?.setShowLoading(true);
        try {
            const res = await CustomAxios.get("/pet/all");
            const data = res.data as Pick<pet, "id" | "name" | "profile">[];
            setPetdata(data);
            appState?.setShowLoading(false);
        } catch (e) {
            appState?.setShowLoading(false);
        }
    }
    useEffect(() => {
        if (petdata == undefined) {
            fetchdatas();
        }
    }, [])
    const senddata = async () =>{
        appState?.setShowLoading(true);
        selectedDate.setSeconds(19800);
        selectedEndDate.setSeconds(19800);
        const data = {
            "pet":pet,
            "orgservice": orgservice,   
            "petorganization":petorganization,
            "startdate": selectedDate,
            "enddate": selectedEndDate,
            "service": service,
        }
        try{
            await CustomAxios.post("/transaction", data);
            navigation.popToTop();
        }
        catch(e) {
            const err = e as AxiosError;
        }
        finally{
            appState?.setShowLoading(false);
        }
    }
    const [pet, setPet] = useState<string>();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedEndDate, setSelectedEndDate] = useState(new Date());
    const [showDateEndPicker, setShowDateEndPicker] = useState(false);
    return <View style={{}}>
        {showDatePicker && (
            <DateTimePicker
                value={selectedDate}
                minimumDate={new Date()}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={(event, value) => { setSelectedDate(value || selectedDate); setShowDatePicker(false); }}
            />
        )}
        {showDateEndPicker && (
            <DateTimePicker
                value={selectedEndDate}
                minimumDate={selectedDate}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={(event, value) => { setSelectedEndDate(value || selectedDate); setShowDateEndPicker(false); }}
            />
        )}
        <Modal
            animationType="fade"
            transparent={true}
            onRequestClose={()=>setModalVisible(false)}
            visible={modalVisible}>
            <View style={{ flex: 1, justifyContent: "center", alignContent: "center", padding: 20 }}>
                <CustomView style={{ flex: 1, maxWidth: 500, maxHeight: 300, borderRadius: 50, elevation: 10, padding: 30, justifyContent: "center" }}>
                    <Text style={{ fontSize: 20 }}>Select Date</Text>
                    <Text style={{marginTop: 10}}>Start Date</Text>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Text style={{flex: 1}}>{selectedDate.toLocaleDateString()}</Text>
                        <IconButton icon={{ value: "calendar_month" }} onPress={() => setShowDatePicker(true)} />
                    </View>
                    <Text style={{marginTop: 10}}>End Date</Text>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Text style={{flex: 1}}>{selectedEndDate.toLocaleDateString()}</Text>
                        <IconButton icon={{ value: "calendar_month" }} onPress={() => setShowDateEndPicker(true)} />
                    </View>
                    <Button rootstyle={{marginTop: 10}} value="Ok" onPress={senddata}/>
                </CustomView>
            </View>
        </Modal>
        <Text style={{ fontWeight: "bold", fontSize: 30, padding: 10 }}>Select Pet</Text>
        <FlatList data={petdata}
            renderItem={({ item }) => <TouchableOpacity onPress={() => {setPet(item.id); setModalVisible(true) }}>
                <CustomView style={{ marginVertical: 5, paddingHorizontal: 5, flex: 1, flexDirection: "row", alignContent: "center" }}>
                    {item?.profile ?
                        <Image source={{ uri: `${imagebaseurl}${item?.profile}` }} style={{ width: 100, height: 100, borderRadius: 10, marginEnd: 20 }} />
                        :
                        <View>
                            <Icon value="image" style={{ fontSize: 100 }} />
                        </View>
                    }
                    <View style={{ paddingVertical: 5, flex: 1, justifyContent: "center", alignContent: "center" }}>
                        <Text style={{ fontSize: 30 }}>{item.name}</Text>
                    </View>
                </CustomView>
            </TouchableOpacity>
            }
        />
    </View>
}
export default Booking;