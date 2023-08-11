import { createContext } from "react"
import { appstatereturn } from "./AppState";

const AppContext =  createContext<appstatereturn|null>(null);
export default AppContext;