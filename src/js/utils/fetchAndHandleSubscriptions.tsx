import fetchSubscriptions from "../api/subscriptions.tsx";
import {SubscriptionsModel} from "../models/SubscriptionModel.tsx";

const fetchAndHandleSubscriptions = async (setSubscriptions: (sub: SubscriptionsModel | null) => void) => {
    try {
        const subscriptions = await fetchSubscriptions()
        setSubscriptions(SubscriptionsModel.fromArray(subscriptions))
    } catch {
        setSubscriptions(null)
    }
}

export default fetchAndHandleSubscriptions
