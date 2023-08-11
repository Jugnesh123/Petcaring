import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {baseurl} from "../Root";
export const serverHost = `http://192.168.118.30:8000/api/`;
const CustomAxios = axios.create({
    baseURL: serverHost,
    withCredentials: true,
});
export default CustomAxios;