import React, { FC, useContext, useState } from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import AppContext from '../../context/AppContext';
import CustomView from './CustomView';
import Text from './Text';
import IconButton from './IconButton';
import Button from './Button';

export interface appbarprops {
    back?: boolean,
    title: string,
    backpress?: ()=>void,
    actionbuttons?: {
        value?: string,
        label?: string,
        icon?: string,
        onPress?: () => void
    }[]
}
const AppBar: FC<appbarprops> = ({ title, actionbuttons,backpress, back }) => {
    const styles = StyleSheet.create({
        appbar: {
            //height appbar 
            height: 60,
            // add padding
            paddingHorizontal: 10,
            paddingVertical: 5,
            // set layout and align child item
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            // border radius
            borderBottomEndRadius: 10,
            borderBottomStartRadius: 10,
        },
        appbarTitle: {
            fontFamily: "Ubuntu-Bold",
            fontSize: 20
        },
        appbarMenu: {
            flexDirection: "row",
        },
    })
    const appState = useContext(AppContext);
    const toggleSwitch = () => appState?.changeMode();
    return (
        <CustomView style={styles.appbar}>
            
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {
                    back &&
                    <View style={{ marginEnd: 10 }}>
                        <IconButton icon={{ value: "arrow_back" }} onPress={backpress}/>
                    </View>
                }
                <Text style={styles.appbarTitle}>{title}</Text>
            </View>
            <View style={styles.appbarMenu}>
                {
                    actionbuttons?.map(button => {
                        return button.value ?
                            <Button key={button.value} value={button.value} backgroundColor="transparent" textstyle={{color: "orange"}}/>
                            :
                            <IconButton key={button.icon} icon={{ value: button.icon! }} onPress={button.onPress} />
                    })
                }
                {

                }
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={appState?.darkMode ? 'orange' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={appState?.darkMode}
                />
            </View>
        </CustomView>
    )
}

export default AppBar;