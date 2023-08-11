import { FC, useContext } from "react"
import { AppState, TouchableWithoutFeedback, useWindowDimensions, View } from "react-native"
import AppContext from "../../context/AppContext"
import Button from "./Button"
import CustomView from "./CustomView"
import Text from "./Text"
export interface alertprops {
    title?: string,
    description?: string,
    buttons?: { value: string, onPress?: () => void, highlighted?: boolean }[],
}
const AlertMessage: FC<alertprops> = ({ buttons, description, title }) => {
    const { height: windowHeight } = useWindowDimensions();
    const appState = useContext(AppContext);
    return <View style={{ position: "absolute", zIndex: 1, width: "100%", backgroundColor: "#000000af", height: windowHeight, flex: 1 }}>
        <TouchableWithoutFeedback onPress={() => { appState?.setAlert(undefined)}}>
            <View style={{ flex: 1, padding: 10, justifyContent: "center", alignContent: "center" }}>

                <CustomView style={{ elevation: 10, width: "100%", minHeight: 150, justifyContent: "space-between",borderRadius: 30, overflow: "hidden" }}>
                    <View style={{padding: 20}}>

                        <Text style={{ marginBottom: 10, fontFamily: "Ubuntu-Bold", fontSize: 20 }}>{title}</Text>
                        <Text>{description}</Text>
                    </View>
                    <View>
                        {
                            buttons?.map(value => <Button key={value.value} rootstyle={{borderRadius: 0}} value={value.value} backgroundColor={value.highlighted ? undefined : appState?.colorValue.backgroundSubtle} onPress={()=>value.onPress?value.onPress():appState?.setAlert(undefined)} />)
                        }
                    </View>
                </CustomView>
            </View>
        </TouchableWithoutFeedback>
    </View >
}
export default AlertMessage;