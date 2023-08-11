import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch, FC, ReactNode, SetStateAction, useState } from "react";
import { Appearance, useWindowDimensions, View } from "react-native";
import { alertprops } from "../component/utils/AlertMessage";
import AppContext from "./AppContext";
import CustomAxios from "../component/Axios";
export type colorvaluetype = {
    text?: string,
    background: string
    backgroundSubtle: string,
    shadowColor: string,
    rippleColor: string,
    borderColor: string,
}
export interface appstatereturn {
    signIn: boolean|undefined,
    setSignIn: (arg0: boolean) => void,
    title: string,
    darkMode: boolean,
    changeMode: () => void,
    colorValue: colorvaluetype,
    setAlert: Dispatch<SetStateAction<alertprops|undefined>>,
    alert?: alertprops,
    showLoading: boolean,
    setShowLoading: (arg0: boolean)=>void,
    windowWidth: number,
    windowHeight: number,
    showBottomLoading: boolean
    setShowBottomLoading: (arg0: boolean)=>void,
    modalVissible: boolean,
    setModalVissible: (arg0: boolean) => void,
    loginCheck: ()=>void,
}
const AppState: FC<{ children: ReactNode }> = ({ children }) => {
    const [signIn, setSignIn] = useState<boolean>();
    const [darkMode, setDarkMode] = useState(Appearance.getColorScheme() == "dark");
    const [alert, setAlert] = useState<alertprops>();
    const [showLoading, setShowLoading] = useState(false);
    const [modalVissible, setModalVissible] = useState(false);
    const [showBottomLoading, setShowBottomLoading] = useState(false);
    const {width: windowWidth, height: windowHeight} = useWindowDimensions();
    return <View>
        <AppContext.Provider value={{
            loginCheck :() => {
                CustomAxios.get("check").then(value=>setSignIn(true)).catch(err=>setSignIn(false))
            },
            setShowLoading: setShowLoading,
            showLoading: showLoading,
            title: "Pet Caring",
            setAlert: setAlert,
            alert: alert,
            signIn: signIn,
            modalVissible: modalVissible,
            setModalVissible: setModalVissible,
            showBottomLoading: showBottomLoading,
            setShowBottomLoading: setShowBottomLoading,
            setSignIn: setSignIn,
            darkMode: darkMode,
            windowHeight: windowHeight,
            windowWidth: windowWidth,
            changeMode: () => setDarkMode(!darkMode),
            colorValue: darkMode ? {
                text: "white",
                background: "black",
                backgroundSubtle: "#121212",
                shadowColor: "#999999",
                rippleColor: "#999999",
                borderColor: "#eaeaea"
            } :
                {
                    text: "#323232",
                    background: "white",
                    backgroundSubtle: "#fcfcfc",
                    shadowColor: "#121212",
                    rippleColor: "lightgray",
                    borderColor: "gray",
                }
        }} >
            {children}
        </AppContext.Provider >
    </View>
}
export default AppState;