export interface ProfileInterface {
    id: string
    subscription: Subscription
    subscriptionExpiresAt: null
    devices: Device[]
    createdAt: null
}

interface Device {
    name: string
    type: string
}

interface Subscription {
    name: string
    price: number
    devices: number
}

export class ProfileModel {
    id: string
    subscription: Subscription
    subscriptionExpiresAt: null
    devices: Device[]
    createdAt: null

    constructor(data: ProfileInterface) {
        this.id = data.id
        this.subscription = data.subscription
        this.subscriptionExpiresAt = data.subscriptionExpiresAt
        this.devices = data.devices
        this.createdAt = data.createdAt
    }

    static fromApi(data: any): ProfileModel {
        return new ProfileModel({
            id: data.id,
            subscription: data.subscription,
            subscriptionExpiresAt: data.subscription_expires_at,
            devices: data.devices,
            createdAt: data.created_at,
        });
    }
}
