import Config from "../utils/Config.tsx"
import api from "../utils/axios.tsx"
import {SubscriptionModel} from "../models/SubscriptionModel.tsx"
import delay from "../utils/delay.tsx"

const fetchSubscriptions = async () => {
    const response = await api.post(Config.api.subscriptions)
    await delay(2000)
    return response.data.subscriptions.map(SubscriptionModel.fromApi)
}

export default fetchSubscriptions
