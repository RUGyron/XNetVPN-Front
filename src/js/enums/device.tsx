export default function getDeviceIcon(name: string): string | undefined {
    return {
        desktop: 'img/computer.png',
        ios: 'img/apple.png',
        android: 'img/android.png',
    }[name]
}
