export const Dictionary = {

    // UI Callbacks
    unauthorizedError: {
        ru: 'Вам необходимо авторизоваться для этого',
        en: 'You have to authorize to do this',
    },
    authErrorKey: {
        ru: 'Неправильный ключ',
        en: 'Invalid key',
    },
    authSuccessful: {
        ru: 'Вы успешно авторизовались!',
        en: 'You authorized successfully',
    },
    anyError: {
        ru: 'Что-то пошло не так',
        en: 'Something went wrong',
    },
    noConnectedDevices: {
        ru: 'Вы не подключили ни одного устройства',
        en: 'You have no connected devices yet',
    },
    copiedToClipboard: {
        ru: 'Скопировано',
        en: 'Copied',
    },

    // Success / Failure
    success: {
        ru: 'Успех!',
        en: 'Success!',
    },
    failure: {
        ru: 'Ошибка!',
        en: 'Failure!',
    },

    //
    // Subscriptions Benefits
    //

    // Content
    subsExploreBenefits1: {
        ru: 'Изучите все преимущества',
        en: 'Explore all benefits',
    },
    subsExploreBenefits2: {
        ru: 'здесь',
        en: 'here',
    },

    // Basic
    subBasicBenefit1: {
        ru: 'Базовый Набор Стран',
        en: 'Basic Set of Countries',
    },
    subBasicBenefit2: {
        ru: 'Базовая Скорость',
        en: 'Basic Speed',
    },
    subBasicBenefit3: {
        ru: '3 Устройства',
        en: '3 Devices',
    },

    // Pro
    subProBenefit1: {
        ru: 'Все Страны',
        en: 'All Countries',
    },
    subProBenefit2: {
        ru: 'Быстрая Скорость',
        en: 'Fast Speed',
    },
    subProBenefit3: {
        ru: '10 Устройств',
        en: '10 Devices',
    },
    subProBenefit4: {
        ru: 'Приоритетная Поддержка',
        en: 'Priority Support',
    },

    // Unlimited
    subUnlimitedBenefit1: {
        ru: 'Лучшие Страны',
        en: 'Best Countries',
    },
    subUnlimitedBenefit2: {
        ru: 'Ультра Скорость',
        en: 'Ultra Speed',
    },
    subUnlimitedBenefit3: {
        ru: 'Безлимитно',
        en: 'Unlimited Devices',
    },
    subUnlimitedBenefit4: {
        ru: '24/7 Поддержка',
        en: '24/7 Support',
    },
    subUnlimitedBenefit5: {
        ru: 'Персональная Настройка',
        en: 'Custom Setup',
    },
} as const

export type DictionaryKey = keyof typeof Dictionary
export type DictionaryEntry = Record<string, string> // { en: string, ru: string }
