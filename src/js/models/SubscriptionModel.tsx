export interface SubscriptionInterface {
    id: string
    name: string
    price: number
    devices: number
    benefits: string[]
}

export class SubscriptionModel {
    id: string
    name: string
    price: number
    devices: number
    benefits: string[]

    constructor(data: SubscriptionInterface) {
        this.id = data.id
        this.name = data.name
        this.price = data.price
        this.devices = data.devices
        this.benefits = data.benefits
    }

    static fromApi(data: any): SubscriptionModel {
        return new SubscriptionModel({
            id: data.id,
            name: data.name,
            price: data.price,
            devices: data.devices,
            benefits: data.benefits,
        });
    }
}
