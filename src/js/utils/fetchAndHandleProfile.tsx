import fetchProfile from "../api/profile"
import {ProfileModel} from "../models/ProfileModel"

const fetchAndHandleProfile = async (setProfile: (profile: ProfileModel | null) => void, setLoggedIn: (loggedIn: boolean) => void) => {
    try {
        const response = await fetchProfile()
        setProfile(response)
        setLoggedIn(true)
    } catch {
        setProfile(null)
        setLoggedIn(false)
    }
}

export default fetchAndHandleProfile
