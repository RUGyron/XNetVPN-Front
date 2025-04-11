import {DictionaryEntry} from "./localization.tsx";

export default function createLocalizer(language: string) {
    return function localized(entry: DictionaryEntry): string {
        if (!entry) return ''
        return entry[language] ?? Object.values(entry)[0] ?? '???'
    }
}