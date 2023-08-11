import { FC, useContext, useEffect, useState } from "react";
import { View } from "react-native";
import AppContext from "../../context/AppContext";
import CustomAxios from "../Axios";
import { transaction } from "../../interface";
import History from "./pets/History";

const Transaction:FC<{history: transaction[]|undefined, setHistory:(arg0:transaction[])=>void }> = ({history, setHistory})  =>  {
    const appState = useContext(AppContext);
    
    const fetchdatas = async () => {
        appState?.setShowBottomLoading(true);
        try {
            const res = await CustomAxios.get("/transaction/all");
            const data = res.data as transaction[];
            setHistory(data);
        } catch (e) {
            appState?.setShowBottomLoading(false);
        }
        appState?.setShowBottomLoading(false);
    }
    useEffect(()=>{
        fetchdatas();
    },[])
    return <View style={{ flex: 1 }}>
        <History history={history as transaction[]} />
    </View>
}
export default Transaction;