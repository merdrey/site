const lists = document.querySelectorAll("div.navigation>ul>li.parent")

lists.forEach((list) => {
    let button = list.querySelector("span")
    let div = list.querySelector("div")
    div.addEventListener('click', () => {
        if(button.classList.contains("closed")) {
            button.classList.replace("closed", "open")
            list.querySelector("ul").classList.remove("hidden")
        }
        else if(button.classList.contains("open")) {
            button.classList.replace("open", "closed")
            list.querySelector("ul").classList.add("hidden")
        }
    })
})
