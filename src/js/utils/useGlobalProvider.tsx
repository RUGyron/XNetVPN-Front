import {useContext} from "react";
import {GlobalContext} from "./GlobalProvider.tsx";

export const useGlobalContext = () => useContext(GlobalContext)
