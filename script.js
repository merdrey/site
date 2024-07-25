const LAD_BUTTON = document.getElementById("lad")
const FUR_BUTTON = document.getElementById("furn")
const DOOR_BUTTON  = document.getElementById("door")
const CLOSE_BUTTON = document.getElementById("close")
const NEXT_BUTTON = document.getElementById("next")
const PREV_BUTTON = document.getElementById("prev")


const VIEW_IMAGE = document.getElementById("viewed-image")
const VIEWER = document.getElementById("viewer")


const LAD_GALLERY = document.getElementById("lad-gal")
const FUR_GALLERY = document.getElementById("furn-gal")
const DOOR_GALLERY = document.getElementById("door-gal")

let counter

function deactivate() {
    LAD_BUTTON.classList.remove('active')
    FUR_BUTTON.classList.remove('active')
    DOOR_BUTTON.classList.remove('active')
    LAD_GALLERY.classList.replace('on-screen', 'hidden')
    FUR_GALLERY.classList.replace('on-screen', 'hidden')
    DOOR_GALLERY.classList.replace('on-screen', 'hidden')
}

function activate(button, gallery) {
    button.classList.add('active')
    gallery.classList.replace('hidden', 'on-screen')
}

function showViewer(images) {
    images.forEach((image, index) => {
        image.addEventListener('click', () =>
        {
            counter = index
            VIEW_IMAGE.setAttribute("src", image.querySelector("img.image").getAttribute("src"))
            VIEWER.showModal()
        })
    });
    NEXT_BUTTON.onclick = function() {
        if(counter < images.length - 1) {
            counter++
        }
        else {
            counter = 0
        }
        images.forEach((image, index) => {
            if(counter == index) {
                VIEW_IMAGE.setAttribute("src", image.querySelector("img.image").getAttribute("src"))
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
                VIEW_IMAGE.setAttribute("src", image.querySelector("img.image").getAttribute("src"))
            }
        })
    }
}

LAD_BUTTON.addEventListener('load', showViewer(LAD_GALLERY.querySelectorAll("div.image-form")))

LAD_BUTTON.onclick = function() {
    deactivate()
    activate(LAD_BUTTON, LAD_GALLERY)
    showViewer(LAD_GALLERY.querySelectorAll("div.image-form"))
}

FUR_BUTTON.onclick = function() {
    deactivate()
    activate(FUR_BUTTON, FUR_GALLERY)
    showViewer(FUR_GALLERY.querySelectorAll("div.image-form"))
}

DOOR_BUTTON.onclick = function() {
    deactivate()
    activate(DOOR_BUTTON, DOOR_GALLERY)
    showViewer(DOOR_GALLERY.querySelectorAll("div.image-form"))
}

CLOSE_BUTTON.onclick = function() {
    VIEWER.close()
}