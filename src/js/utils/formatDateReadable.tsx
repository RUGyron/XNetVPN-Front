import Language from "../enums/language.tsx";

export default function formatDateReadable(date: Date, lang: Language): string {
    const locale = lang === Language.russian ? "ru-RU" : "en-US"

    return date.toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
    })
}
