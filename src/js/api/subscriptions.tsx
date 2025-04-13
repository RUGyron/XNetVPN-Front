import Config from "../utils/Config.tsx"
import api from "../utils/axios.tsx"
import {SubscriptionModel} from "../models/SubscriptionModel.tsx"

const fetchSubscriptions = async () => {
    const response = await api.post(Config.api.subscriptions)
    return response.data.subscriptions.map(SubscriptionModel.fromApi)
}

export default fetchSubscriptions
