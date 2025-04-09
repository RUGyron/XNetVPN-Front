const Config = {
    urls: {
        main: '/',
        terms: '/privacy-terms/#terms',
        policy: '/privacy-terms',
        refund: '/privacy-terms/#refund',
    },
    imgPath: '../img/',
    api: {
        login: `${import.meta.env.VITE_API_URL}/login`,
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
}

export default Config