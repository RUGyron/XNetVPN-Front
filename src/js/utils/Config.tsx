const Config = {
    urls: {
        main: '/',
        pricing: '/#pricing',
        terms: '/privacy-terms/#terms',
        policy: '/privacy-terms',
        refund: '/privacy-terms/#refund',
        offer: '/offer',
    },
    imgPath: '../img/',
    api: {
        __base__: import.meta.env.VITE_API_URL,
        login: `${import.meta.env.VITE_API_URL}/login`,
        refresh: `${import.meta.env.VITE_API_URL}/update-token`,
        profile: `${import.meta.env.VITE_API_URL}/profile`,
        subscriptions: `${import.meta.env.VITE_API_URL}/subscriptions`,
    },
    cookies: {
        access: {
            expireDuration: 1 / (24 * 4) // 15 minutes
        },
        refresh: {
            expireDuration: 7 // 7 days
        }
    },
    subscriptionsIds: {
        basic: import.meta.env.VITE_SUB_BASIC_ID,
        pro: import.meta.env.VITE_SUB_PRO_ID,
        unlimited: import.meta.env.VITE_SUB_UNLIMITED_ID,
    }
}

export default Config