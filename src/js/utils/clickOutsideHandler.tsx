import {MutableRefObject} from "react"

const clickOutsideHandler = (modalRef: MutableRefObject<HTMLDivElement | null>, onClose: () => void) => {
    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            onClose()
        }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
        document.removeEventListener("mousedown", handleClickOutside)
    }
}

export default clickOutsideHandler
