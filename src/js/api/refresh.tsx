import Cookies from "js-cookie"
import {AxiosError} from "axios"

import Config from "../utils/Config.tsx"
import {AuthModel} from "../models/AuthModel.tsx"
import api from "../utils/axios.tsx"

const refresh = async () => {
    if (!Cookies.get('refresh')) {
        throw new Error('401')
    }
    try {
        const response = await api.post(Config.api.refresh, {}, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('refresh')}`
            }
        })
        const auth = AuthModel.fromApi(response.data)
        Cookies.set('access', auth.tokens.access, {expires: Config.cookies.access.expireDuration})
        Cookies.set('refresh', auth.tokens.refresh, {expires: Config.cookies.refresh.expireDuration})
        return auth
    } catch (e) {
        Cookies.remove('refresh')
        throw (e as AxiosError).status
    }
}

export default refresh
