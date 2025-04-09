export const Dictionary = {
    authErrorKey: {
        ru: 'Неправильный ключ',
        en: 'Invalid key',
    },
    anyError: {
        ru: 'Что-то пошло не так',
        en: 'Something went wrong',
    }
}

export type DictionaryEntry = Record<string, string> // { en: string, ru: string }

export function createLocalizer(language: string) {
    return function localized(entry: DictionaryEntry): string {
        if (!entry) return ''
        return entry[language] ?? Object.values(entry)[0] ?? '???'
    }
}
