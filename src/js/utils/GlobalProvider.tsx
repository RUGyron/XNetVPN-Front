import React, {useState, useEffect, createContext, useMemo} from 'react'
import {ProfileModel} from "../models/ProfileModel.tsx"
import fetchAndHandleProfile from "./fetchAndHandleProfile.tsx";
import fetchSubscriptions from "../api/subscriptions.tsx";
import {SubscriptionModel} from "../models/SubscriptionModel.tsx";
import Language from "../enums/language.tsx";
import {createLocalizer, DictionaryEntry} from "./localization.tsx";

export interface GlobalState {
    loggedIn: boolean
    setLoggedIn: (loggedIn: boolean) => void
    profile: null | ProfileModel
    setProfile: (profile: null | ProfileModel) => void
    subscriptions: null | SubscriptionModel[]
    setSubscriptions: (profile: null | SubscriptionModel[]) => void
    loading: boolean
    language: Language
    setLanguage: (language: Language) => void
    localized: (entry: DictionaryEntry) => string
}

interface GlobalProviderProps {
    children: React.ReactNode
}

export const GlobalContext = createContext<GlobalState>({
    loggedIn: false,
    setLoggedIn: () => {},
    profile: null,
    setProfile: () => {},
    subscriptions: null,
    setSubscriptions: () => {},
    loading: true,
    language: navigator.language.startsWith('ru') ? Language.russian : Language.english,
    setLanguage: () => {},
    localized: () => '',
})

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false)
    const [profile, setProfile] = useState<null | ProfileModel>(null)
    const [subscriptions, setSubscriptions] = useState<null | SubscriptionModel[]>(null)
    const [loading, setLoading] = useState(true)
    const [language, setLanguage] = useState<Language>(Language.english)
    const localized = useMemo(() => createLocalizer(language), [language])

    const handleSubscriptions = async () => {
        return fetchSubscriptions()
            .then((subscriptionsFetched: SubscriptionModel[]) => {
                setSubscriptions(subscriptionsFetched)
            })
            .catch(() => {
                setSubscriptions([]);
            });
    }

    useEffect(() => {
    }, [])

    const value: GlobalState = {
        loggedIn,
        setLoggedIn,
        profile,
        setProfile,
        subscriptions,
        setSubscriptions,
        loading,
        language,
        setLanguage,
        localized,
    }

    useEffect(() => {
        Promise.all([
            fetchAndHandleProfile(setProfile, setLoggedIn),
            handleSubscriptions(),
        ])
            .then(() => {
                setTimeout(() => setLoading(false), 500);
            });
    }, []);

    return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}
