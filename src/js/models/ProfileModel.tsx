export interface ProfileInterface {
    id: string
    subscriptionId: string
    created: null
}

export class ProfileModel {
    id: string;
    subscriptionId: string;
    created: null;

    constructor(data: ProfileInterface) {
        this.id = data.id;
        this.subscriptionId = data.subscriptionId;
        this.created = data.created;
    }

    static fromApi(data: any): ProfileModel {
        return new ProfileModel({
            id: data.id,
            subscriptionId: data.subscription_id,
            created: data.created_at,
        });
    }
}
