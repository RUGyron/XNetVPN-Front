import {AuthModel} from "../models/AuthModel"
import Config from "../utils/Config.tsx"
import api from "../utils/axios.tsx"

const login = async (key: string) => {
    const response = await api.post(
        Config.api.login,
        {
            key: key
        }
    )
    return AuthModel.fromApi(response.data)
}

export default login
