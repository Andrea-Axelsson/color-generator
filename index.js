let colorsArray = ["#EC33BB", "#EE3787", "#EF3A53", "#F05B3E", "#F29342"]
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

document.addEventListener("click", (e) => {
    if (e.target.dataset.hex) {
        const hexValue = getHexValue(e.target.dataset.hex)
        copyHex(hexValue)
    }
})


function getHexValue(hexId) {
    let hexValue = document.getElementById(hexId).getElementsByClassName("hex-value")[0].innerText
    return hexValue
}

function copyHex(hexValue) {

    const hiddenInput = document.createElement('input')
    hiddenInput.setAttribute('value', hexValue)
    document.body.appendChild(hiddenInput)
    hiddenInput.select()
    document.execCommand('copy')
    document.body.removeChild(hiddenInput)
    alert("Hex Copied")

}


function getFeedHtml() {
    let feedHtml = ``

    for (let i = 0; i < 5; i++) {
        const newUuid = uuidv4()
        feedHtml += `
        <div class="color-block" data-hex="${newUuid}" id="${newUuid}">
            <div class="hex-value">
                <p>{colorsArray[i]}</p>
            </div>
        </div>`
    }
    document.getElementById("color-suggestions").innerHTML = feedHtml
}

function renderColors() {

    const colorBlocks = document.getElementsByClassName("color-block")
    const hexValue = document.getElementsByClassName("hex-value")

    for (let i = 0; i < colorBlocks.length; i++) {
        colorBlocks[i].style.backgroundColor = colorsArray[i]
        hexValue[i].innerHTML = `<p>${colorsArray[i]}</p>`
    }

}

function getColorUrl() {
    const color = document.getElementById("color").value
    const mode = document.getElementById("mode").value
    const colorUrl = `
    https://www.thecolorapi.com/scheme?hex=${encodeURIComponent(color)}&mode=${mode}`
    return colorUrl;
}

function getRandomColorUrl() {

    /* MODE */
    const modeArray =
        ["monochrome",
            "monochrome-dark",
            "monochrome-light",
            "analogic",
            "complement",
            "analogic-complement",
            "triad",
            "quad"]

    let randomMode = ""

    for (let i = 0; i < 1; i++) {
        randomMode = modeArray[Math.floor(Math.random() * modeArray.length)]
    }

    /* COLOR */
    const letters = "0123456789ABCDEF"
    let randomColor = "#"

    for (let i = 0; i < 6; i++) {
        randomColor += letters[Math.floor(Math.random() * 16)]
    }
    const randomColorUrl = `
    https://www.thecolorapi.com/scheme?hex=${encodeURIComponent(randomColor)}&mode=${randomMode}`

    return randomColorUrl
}

const submit = document.getElementById("submit")
const submitRandom = document.getElementById("submit-random")

submit.addEventListener("click", function (e) {
    e.preventDefault()
    fetchColor(false)
})
submitRandom.addEventListener("click", function (e) {
    e.preventDefault()
    fetchColor(true)
})

function fetchColor(isRandom) {
    const colorUrl = isRandom ? getRandomColorUrl() : getColorUrl()

    fetch(colorUrl)
        .then(res => res.json())
        .then(data => {
            const colors = data.colors.map((colorObj) => colorObj.hex.value)
            colorsArray = colors
            renderColors()
        })
}

getFeedHtml()
renderColors()
