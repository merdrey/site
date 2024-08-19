const CLOSE_BUTTON = document.getElementById("close")
const NEXT_BUTTON = document.getElementById("next")
const PREV_BUTTON = document.getElementById("prev")

const VIEW_IMAGE = document.getElementById("viewed-image")
const VIEWER = document.getElementById("viewer")

const GALLERY = document.querySelector("div.gallery")

let counter, folders = GALLERY.querySelectorAll("div.folder"), images

function showViewer() {
    folders.forEach((folder) => {
        folder.addEventListener('click', () =>
        {
            counter = 0
            images = folder.querySelectorAll("img")
            VIEW_IMAGE.setAttribute("src", folder.querySelector("img.icon").getAttribute("src"))
            VIEWER.showModal()
        })
    });  
}

NEXT_BUTTON.onclick = function() {
    if(counter < images.length - 1) {
        counter++
    }
    else {
        counter = 0
    }
    images.forEach((image, index) => {
        if(counter == index) {
            VIEW_IMAGE.setAttribute("src", image.getAttribute("src"))
        }
    })
}
PREV_BUTTON.onclick = function() {
    if(counter > 0) {
        counter--
    }
    else {
        counter = images.length - 1
    }
    images.forEach((image, index) => {
        if(counter == index) {
            VIEW_IMAGE.setAttribute("src", image.getAttribute("src"))
        }
    })
}

CLOSE_BUTTON.onclick = function() {
    VIEWER.close()
}

GALLERY.addEventListener('load', showViewer())
