const CLOSE_BUTTON = document.getElementById("close")
const NEXT_BUTTON = document.getElementById("next")
const PREV_BUTTON = document.getElementById("prev")

const VIEW_IMAGE = document.getElementById("viewed-image")
const VIEWER = document.getElementById("viewer")

const GALLERY = document.querySelector("div.gallery")

const DETECT_THRESHOLD = 70

let counter, folders = GALLERY.querySelectorAll("div.folder"), images, xCoord

let isMobile = DetectDevice();

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

if(!isMobile) {
    NEXT_BUTTON.style.setProperty("display", "block");
    PREV_BUTTON.style.setProperty("display", "block");
}

VIEW_IMAGE.addEventListener('touchstart', handleTouchStart)
VIEW_IMAGE.addEventListener('touchmove', handleTouchMove)

function nextImage() {
    xCoord = undefined
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

function prevImage() {
    xCoord = undefined
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

function handleTouchStart(event) {
    event.preventDefault()
    const firstTouch = event.touches[0]
    xCoord = firstTouch.clientX
}

function handleTouchMove(event) {
    event.preventDefault()
    const xUp = event.touches[0].clientX
    if(Math.abs(xCoord-xUp) > DETECT_THRESHOLD) {
        if(xCoord > xUp) {            
            nextImage()
        }
        else if(xCoord < xUp) {
            prevImage()
        }
    }
}

NEXT_BUTTON.onclick = nextImage
PREV_BUTTON.onclick = prevImage

CLOSE_BUTTON.onclick = function() {
    VIEWER.close()
}

const callback = (entries, observer) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting && entry.target.getAttribute("src") == undefined) {
            entry.target.setAttribute("src", entry.target.getAttribute("data-src"))
            observer.unobserve(entry.target)
        }
    })
}

const options = {
    root: document.viewport,
    rootMargin: '0px 0px 50px 0px',
    threshold: 0,
}

const observer = new IntersectionObserver(callback, options)

function DetectDevice() {
    let isMobile = window.matchMedia;
    if(isMobile) {
        let match_mobile = isMobile("(pointer:coarse)");
        return match_mobile.matches;
    }
    return false;
}

GALLERY.addEventListener('load', showViewer())
folders.forEach((folder) => {
    observer.observe(folder.querySelector("img.icon"))
})
