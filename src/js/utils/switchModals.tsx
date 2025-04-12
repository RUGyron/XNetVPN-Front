export default function switchModals(
    close: () => void,
    open: () => void,
    delay: number = 300
) {
    close()
    setTimeout(open, delay)
}