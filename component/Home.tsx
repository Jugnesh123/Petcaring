import { pet, transaction } from '../interface';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Root';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomNavigation from './utils/BottomNavigation';
import { useContext, useEffect, useState } from 'react';
import Main from './home/Main';
import Pets from './home/Pets';
import AppContext from '../context/AppContext';
import Text from './utils/Text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { Axios } from 'axios';
import { breed } from '../interface';
import { petorganization_breed } from '../interface';
import CustomAxios from './Axios';
import Transaction from './home/Transaction';

const imageList: string[] = [
    'https://images.unsplash.com/photo-1598214886806-c87b84b7078b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGltYWdlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1598214886806-c87b84b7078b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGltYWdlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1598214886806-c87b84b7078b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGltYWdlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1598214886806-c87b84b7078b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGltYWdlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1598214886806-c87b84b7078b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGltYWdlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
];
// const petorganizationdata: Pick<
//     petorganization,
//     'id' | 'name' | 'profile'
// >[] = [
//         {
//             id: "10",
//             name: 'abc',
//             profile:
//                 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF6Z2O_8YM4J_FyMNx54W66Ulxmh42S1jpiw&usqp=CAU',
//         },
//         {
//             id: "11",
//             name: 'tyz',
//             profile:
//                 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF6Z2O_8YM4J_FyMNx54W66Ulxmh42S1jpiw&usqp=CAU',
//         },
//         {
//             id: "12",
//             name: 'let',
//             profile:
//                 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF6Z2O_8YM4J_FyMNx54W66Ulxmh42S1jpiw&usqp=CAU',
//         },
//         {
//             id: "13",
//             name: 'you',
//             profile:
//                 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF6Z2O_8YM4J_FyMNx54W66Ulxmh42S1jpiw&usqp=CAU',
//         },
//         {
//             id: "14",
//             name: 'xyz',
//             profile:
//                 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF6Z2O_8YM4J_FyMNx54W66Ulxmh42S1jpiw&usqp=CAU',
//         },
//     ];
type props = NativeStackScreenProps<RootStackParamList, 'home'>;
let petorganizationservice: petorganization_breed[] = [];
const Home = ({ route, navigation }: props): JSX.Element => {
    
    const appState = useContext(AppContext);
    const [index, setIndex] = useState(0);
    const [petsdata, setPetsdata] = useState<Pick<pet, "id" | "name" | "profile">[]|undefined>(undefined);
    const setPetOrganizationService = (value: petorganization_breed[]) => {
        value.map(value => {
            petorganizationservice.push(value);
        })
    }
    const [history, setHistory] = useState<transaction[]>();
    const getBottomNavigationScreen = (): JSX.Element => {
        return <>
            {
                index == 0 &&
                <Main imageList={imageList} serviceClick={serviceClick} organizationClick={organizationClick} petorganizationservice={petorganizationservice} setPetOrganizationService={setPetOrganizationService} />
            }
            {
                index == 1 &&
                <Pets petsdata={petsdata} setPetsdata={setPetsdata} />

            }
            {
                index == 2 &&
                <Transaction history={history} setHistory={setHistory}/>
            }

        </>

    }
    const serviceClick = (value: petorganization_breed): void => {
        navigation.push('serviceprofile', {value});
    }
    const organizationClick = (id: string): void => {
        navigation.push('organizationprofile', { id: id });
    }
    const Tab = createBottomTabNavigator();
    const loginIndex: number[] = [1, 2];
    const tabPress = (i: number) => {
        if (loginIndex.length == 0) {
            setIndex(i);
        } else {
            if (loginIndex.indexOf(i) != -1)
                if (appState?.signIn)
                    setIndex(i);
                else
                    navigation.push("signin")
            else
                setIndex(i);
        }
    }

    const styles = StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
        },
        modalView: {
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },
        button: {
            borderRadius: 20,
            padding: 10,
            elevation: 2,
        },
        buttonOpen: {
            backgroundColor: '#F194FF',
        },
        buttonClose: {
            backgroundColor: '#2196F3',
        },
        textStyle: {
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
        },
        modalText: {
            marginBottom: 15,
            textAlign: 'center',
        },
    });
    return <View style={{ flex: 1 }} >

        {
            getBottomNavigationScreen()
        }
        < BottomNavigation tabbar={[{ icon: "home", label: "Home" }, { icon: "pets", label: "Pets" }, { icon: "history", label: "Transaction" }]} tabPress={tabPress} index={index} />
    </View >

}
export default Home;
