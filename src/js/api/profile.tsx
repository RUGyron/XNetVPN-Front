import Config from "../utils/Config.tsx"
import api, {AxiosError} from "axios"
import {ProfileModel} from "../models/ProfileModel.tsx"

const profile = async () => {
    try {
        const response = await api.post(
            Config.api.profile,
        );
        return ProfileModel.fromApi(response.data)
    } catch (e) {
        throw (e as AxiosError).status
    }
}

export default profile
