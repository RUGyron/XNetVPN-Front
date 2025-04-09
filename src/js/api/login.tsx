import {AuthModel} from "../models/AuthModel"
import Config from "../utils/Config.tsx"
import api from "axios"

const login = async (key: string) => {
    try {
        const response = await api.post(
            `${Config.api.login}?key=${key}`,
        )
        console.log(response.data)
        return AuthModel.fromApi(response.data)
    } catch (e) {
        console.log(e)
        throw e
    }
}

export default login
