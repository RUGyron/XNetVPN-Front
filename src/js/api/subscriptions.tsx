import Config from "../utils/Config.tsx"
import api, {AxiosError} from "axios"
import {SubscriptionModel} from "../models/SubscriptionModel.tsx";

const fetchSubscriptions = async () => {
    try {
        const response = await api.post(Config.api.subscriptions)
        return response.data.subscriptions.map(SubscriptionModel.fromApi)
    } catch (e) {
        throw (e as AxiosError).status
    }
}

export default fetchSubscriptions;
