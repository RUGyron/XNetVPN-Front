import Config from "../utils/Config.tsx"
import api from "../utils/axios.tsx"
import {ProfileModel} from "../models/ProfileModel.tsx"
import Cookies from "js-cookie"

const profile = async () => {
    const response = await api.post(
        Config.api.profile,
        {},
        {
            headers: {
                'Authorization': `Bearer ${Cookies.get('access')}`
            }
        },
    );
    return ProfileModel.fromApi(response.data)
}

export default profile
