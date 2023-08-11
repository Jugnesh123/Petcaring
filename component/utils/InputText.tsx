import { FC, forwardRef, LegacyRef, MutableRefObject, RefObject, useContext, useRef, useState } from "react";
import { KeyboardTypeOptions, NativeSyntheticEvent, StyleProp, StyleSheet, TextInput, TextInputKeyPressEventData, TextStyle, View } from "react-native"
import AppContext from "../../context/AppContext";
import Text from "./Text";
export interface inputtextprops {
    defaultValue?: string,
    value?: string,
    placeholder?: string,
    onChangeText?: (arg0: string) => void,
    style?: StyleProp<TextStyle>,
    containerStyle?: StyleProp<TextStyle>,
    onKeyPress?: (arg0: NativeSyntheticEvent<TextInputKeyPressEventData>) => void,
    error?: string | null,
    maxLength?: number,
    password?: boolean,
    keyboardType?: KeyboardTypeOptions
}
const InputText = forwardRef<TextInput, inputtextprops>(({ onKeyPress, defaultValue, containerStyle, value, maxLength, error, onChangeText, style, placeholder, password, keyboardType }, ref) => {
    const appState = useContext(AppContext);
    const [borderFocus, setBorderFocus] = useState(false);
    const customstyle = StyleSheet.create({
        inputcontainer: {
            marginVertical: 10,
            marginHorizontal: 5,
        },
        inputtext: {
            borderRadius: 10,
            borderColor: error ? "red" : borderFocus ? "orange" : appState?.colorValue.borderColor,
            paddingHorizontal: 10,
            fontFamily: "Ubuntu",
            height: 50,
            color: appState?.colorValue.text,
            borderWidth: 2,
        },
        errorText: {
            marginTop: 5,
            color: "red",
            paddingStart: 12,
        }
    });
    return <View style={[customstyle.inputcontainer, containerStyle]}>
        <TextInput maxLength={maxLength} defaultValue={defaultValue} secureTextEntry={password} placeholder={placeholder} onBlur={() => setBorderFocus(false)} onFocus={() => setBorderFocus(true)} value={value} onChangeText={onChangeText} style={[customstyle.inputtext, style]} ref={ref} placeholderTextColor={appState?.colorValue.borderColor} keyboardType={keyboardType} onKeyPress={onKeyPress} />
        {
            error &&
            <Text style={customstyle.errorText}>{error}</Text>
        }
    </View>
});
export default InputText;