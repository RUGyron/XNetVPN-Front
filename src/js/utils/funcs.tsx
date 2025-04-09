import {useEffect} from "react";

export function ScrollToHash() {
    useEffect(() => {
        if (window.location.hash) {
            const id = window.location.hash.substring(1);
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, []);

    return null;
}