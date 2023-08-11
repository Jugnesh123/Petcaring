import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import Text from "./utils/Text"
import {
    Keyboard,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { AxiosError, AxiosResponse } from "axios";
import InputText from "./utils/InputText";
import { useContext, useState } from "react";
import IconInputText from "./utils/IconInputText";
import Button from "./utils/Button";
import { RootStackParamList } from "../Root";
import AppContext from "../context/AppContext";
import CustomAxios from "./Axios";
type props = NativeStackScreenProps<RootStackParamList, "signin">
const SignIn = ({ navigation, route }: props): JSX.Element => {

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        inner: {
            padding: 24,
            flex: 1,
            justifyContent: "space-between",
        },
        header: {
            fontSize: 36,
            marginBottom: 10,
        },
        btnContainer: {
            marginTop: 10,
            justifyContent: "center",
            alignItems: "center"
        },
    });
    const [emailError, setEmailError] = useState<string | null | undefined>();
    const [passwordError, setPasswordError] = useState<string | null | undefined>();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const appState = useContext(AppContext);
    const authentication = async () => {
        let response: AxiosResponse;
        if(showPassword)
            setShowPassword(false);
        appState?.setShowLoading(true);
        try {
            response = await CustomAxios.post("login", {
                email: email,
                password: password
            });
            appState?.setSignIn(true);
            navigation.pop();
        } catch (err) {
            const error = err as AxiosError;
            if (error.response?.status  == 401) {
                const data = error.response?.data as { message?: string, password?: boolean};
                if (data?.password) {
                    setPasswordError(data?.message);
                    if(emailError != undefined || emailError != null){
                        setEmailError(undefined);
                    }
                }
                else{
                    setEmailError(data?.message);
                    if(passwordError != undefined || passwordError != null){
                        setPasswordError(undefined);
                    }
                }
            }
        }
        finally{
            appState?.setShowLoading(false);
        }
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
                <View>
                    <Text style={styles.header}>Pet Caring</Text>
                    <Text>Sign In your account</Text>
                </View>
                <View>
                    <InputText placeholder="Email" error={emailError} value={email} onChangeText={(text) => setEmail(text)} keyboardType="email-address" />
                    <IconInputText icon={showPassword ? "visibility_off" : "visibility"} value={password} placeholder="Password" onChangeText={(text) => setPassword(text)} error={passwordError} password={!showPassword} onIconPress={() => setShowPassword(!showPassword)} />
                </View>
                <View style={styles.btnContainer}>
                    <Button value="Sign In" style={{ paddingHorizontal: 20 }} onPress={authentication} />
                    <Button value="Don't have account?" color="royalblue" backgroundColor="transparent" rootstyle={{ marginTop: 10 }} textstyle={{ textDecorationLine: "underline" }} onPress={() => { navigation.push("signup") }} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};
export default SignIn;