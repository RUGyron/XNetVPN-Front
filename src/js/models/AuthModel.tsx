import {ProfileInterface, ProfileModel} from "./ProfileModel"

interface AuthInterface {
    tokens: {
        access: string
        refresh: string
    },
    profile: ProfileInterface
}

export class AuthModel {
    tokens: { access: string; refresh: string }
    profile: ProfileModel

    constructor(data: AuthInterface) {
        this.tokens = data.tokens
        this.profile = data.profile
    }

    static fromApi(data: any): AuthModel {
        const e =  new AuthModel({
            tokens: {
                access: data.tokens.access_token,
                refresh: data.tokens.refresh_token
            },
            profile: ProfileModel.fromApi(data.user)
        })
        console.log(e)
        return e
    }
}