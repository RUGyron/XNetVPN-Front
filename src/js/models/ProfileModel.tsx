export interface ProfileInterface {
    id: string
    subscription: Subscription
    subscriptionExpiresAt: Date | null
    devices: Device[]
    createdAt: Date
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
    subscriptionExpiresAt: Date | null
    devices: Device[]
    createdAt: Date

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
            subscriptionExpiresAt: data.created_at ? new Date(data.subscription_expires_at) : null,
            devices: data.devices,
            createdAt: new Date(data.created_at),
        });
    }
}
