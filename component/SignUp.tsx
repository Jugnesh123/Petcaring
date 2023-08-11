import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, RefObject, useContext, useEffect, useRef, useState } from "react";
import { Animated, Keyboard, NativeMethods, NativeSyntheticEvent, ScrollView, StyleSheet, TextInput, TextInputKeyPressEventData, useWindowDimensions, View } from "react-native";
import { RootStackParamList } from "../Root";
import Button from "./utils/Button";
import IconInputText from "./utils/IconInputText";
import InputText from "./utils/InputText";
import Radio from "./utils/Radio";
import Text from "./utils/Text";
import AppContext from "../context/AppContext";
import CustomAxios from "./Axios";
import { AxiosError } from "axios";
type props = NativeStackScreenProps<RootStackParamList, "signup">
const SignUp:FC<props> = ({ navigation, route})=> {
    const { width: windowWidth } = useWindowDimensions();
    const styles = StyleSheet.create({
        scrollContainer: {
            flex: 1,
        },
        detailContainer: {
            flex: 1,
            padding: 24,
            width: windowWidth
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
    const appState= useContext(AppContext);
    let scrollSlide = useRef<ScrollView>(null);
    const [genderValue, setGenderValue] = useState("male");
    const [slide, setSlide] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [middleName, setmiddleName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setemail] = useState("");
    const [code, setcode] = useState("+91");
    const [phone, setphone] = useState("");
    const [password, setpassword] = useState("");
    const [confirm, setconfirm] = useState("");
    const sendData= async ()=>{
        appState?.setShowLoading(true);
        let data:any = {
            "firstname": firstName,
            "email": email,
            "gender": genderValue,
            "password": password,
        }
        if(middleName)
            data["middlename"] = middleName;
        if(lastName)
            data["lastname"] = lastName;
        if(phone)
            data["phone"] = code+phone;
        console.log(data);
        try{
            const res = await CustomAxios.post("/register", data);
            navigation.pop();
        }
        catch(e){
            const err = e as AxiosError;
            console.log(err.response?.status);
        }
        finally{
            appState?.setShowLoading(false);
        }
    }
    const onNextSlide = () => {
        if (slide < 1)
            setSlide(slide + 1);
        else{
            sendData();
        }
    }
    const onPreviousSlide = () => {
        if (slide > 0)
            setSlide(slide - 1);
    }
    useEffect(() => {
        scrollSlide.current?.scrollTo({ x: windowWidth * slide, y: 0, animated: true });
    }, [slide])
    return <View style={styles.scrollContainer}>
        <ScrollView
            horizontal={true}
            ref={scrollSlide}
            scrollToOverflowEnabled={true}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}>
            <ScrollView nestedScrollEnabled={true}>
                <View style={styles.detailContainer}>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.header}>Set Up Your Profile ✍🏻</Text>
                    </View>
                    <InputText placeholder="First Name" value={firstName} onChangeText={(text)=>setFirstName(text)}/>
                    <InputText placeholder="Middle Name" value={middleName} onChangeText={(text)=>setmiddleName(text)}/>
                    <InputText placeholder="Last Name" value={lastName} onChangeText={(text)=>setlastName(text)}/>
                    <InputText placeholder="Email" keyboardType="email-address" value={email} onChangeText={(text)=>setemail(text)}/>
                    <View style={{ flexDirection: "row" }}>
                        <View>
                            <InputText placeholder="Code" keyboardType="phone-pad" value={code}/>
                        </View>
                        <InputText placeholder="Mobile number(Optional)" containerStyle={{ flex: 1 }} keyboardType="phone-pad" value={phone} onChangeText={text=>setphone(text)}/>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ fontFamily: "Ubuntu-Bold" }}>Gender</Text>
                        <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly" }}>
                            <Radio text="Male" value="male" mainValue={genderValue} setMainValue={setGenderValue} />
                            <Radio text="Female" value="female" mainValue={genderValue} setMainValue={setGenderValue} />
                            <Radio text="Other" value="other" mainValue={genderValue} setMainValue={setGenderValue} />
                        </View>
                    </View>
                </View>
            </ScrollView>

            <ScrollView nestedScrollEnabled={true}>
                <View style={styles.detailContainer}>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.header}>Set Password</Text>
                    </View>
                    <IconInputText password={!showPassword} icon={showPassword ? "visibility_off" : "visibility"} placeholder="Password" onIconPress={() => setShowPassword(!showPassword)} value={password} onChangeText={text=>setpassword(text)}/>
                    <InputText placeholder="Confirm Password" password={!showPassword} value={confirm} onChangeText={text=>setconfirm(text)}/>
                </View>
            </ScrollView>
        </ScrollView >

        <View style={styles.indicatorContainer}>
            <Button value="Continue" onPress={onNextSlide} />
            {
                slide != 0 &&
                <Button value="Back" backgroundColor="transparent" onPress={() => { onPreviousSlide() }} />
            }
        </View>
    </View >
}
export default SignUp;