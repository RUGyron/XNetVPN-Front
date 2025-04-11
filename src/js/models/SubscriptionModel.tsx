import Config from "../utils/Config.tsx";

export interface SubscriptionsInterface {
    basic: SubscriptionModel
    pro: SubscriptionModel
    unlimited: SubscriptionModel
}

export class SubscriptionsModel {
    basic: SubscriptionModel
    pro: SubscriptionModel
    unlimited: SubscriptionModel

    constructor(data: SubscriptionsInterface) {
        this.basic = data.basic
        this.pro = data.pro
        this.unlimited = data.unlimited
    }

    static fromArray(data: SubscriptionInterface[]): SubscriptionsModel {
        return new SubscriptionsModel({
            basic: data.filter(e => e.id == Config.subscriptionsIds.basic)[0],
            pro: data.filter(e => e.id == Config.subscriptionsIds.pro)[0],
            unlimited: data.filter(e => e.id == Config.subscriptionsIds.unlimited)[0],
        })
    }

    toArray(): SubscriptionModel[] {
        return [this.basic, this.pro, this.unlimited]
    }
}

export interface SubscriptionInterface {
    id: string
    name: string
    monthPrice: number
    annuallyPrice: number
    annuallyPriceYear: number
    devices: number
    benefits: string[]
}

export class SubscriptionModel {
    id: string
    name: string
    monthPrice: number
    annuallyPrice: number
    annuallyPriceYear: number
    devices: number
    benefits: string[]

    constructor(data: SubscriptionInterface) {
        this.id = data.id
        this.name = data.name
        this.monthPrice = data.monthPrice
        this.annuallyPrice = data.annuallyPrice
        this.annuallyPriceYear = data.annuallyPriceYear
        this.devices = data.devices
        this.benefits = data.benefits
    }

    static fromApi(data: any): SubscriptionModel {
        return new SubscriptionModel({
            id: data.id,
            name: data.name,
            monthPrice: data.month_price,
            annuallyPrice: data.annually_price,
            annuallyPriceYear: data.annually_price_year,
            devices: data.devices,
            benefits: data.benefits,
        });
    }
}
