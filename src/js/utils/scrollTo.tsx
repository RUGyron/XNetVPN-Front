const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
        el.scrollIntoView({behavior: "smooth"})
    } else {
        location.href = "/#" + id
    }
}

export default scrollTo
