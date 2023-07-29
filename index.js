let colorsArray = ["#EC33BB", "#EE3787", "#EF3A53", "#F05B3E", "#F29342"]

function getFeedHtml(){
    let feedHtml = ``
    
    for (let i = 0; i < 5; i++){
        feedHtml += `
        <div class="color-block rounded-corners1" id="color-block">
            <div class="hex-value rounded-corners">
                <p>#F55A5A</p>
            </div>
        </div>`
    }
    document.getElementById("color-suggestions").innerHTML = feedHtml
}

function renderColors(){
    
    const colorBlocks = document.getElementsByClassName("color-block")
    const hexValue = document.getElementsByClassName("hex-value")

    for (let i = 0; i < colorBlocks.length; i++){
        colorBlocks[i].style.backgroundColor = colorsArray[i]
        hexValue[i].innerHTML=`<p>${colorsArray[i]}</p>`     
    }     
}


function getColorUrl() {
    const color = document.getElementById("color").value
    const mode = document.getElementById("mode").value
    const colorUrl = `
    https://www.thecolorapi.com/scheme?hex=${encodeURIComponent(color)}&mode=${mode}`
    return colorUrl;
}

function getRandomColorUrl(){
    
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
    
    for (let i = 0; i < 1; i++){
        randomMode = modeArray[Math.floor(Math.random() * modeArray.length)]
    }
    
    /* COLOR */
    const letters = "0123456789ABCDEF"
    let randomColor = "#"
    
    for (let i = 0; i < 6; i++){
        randomColor += letters[Math.floor(Math.random()* 16)]
    }
    const randomColorUrl = `
    https://www.thecolorapi.com/scheme?hex=${encodeURIComponent(randomColor)}&mode=${randomMode}`
    
    return randomColorUrl
}

const submit = document.getElementById("submit")
const submitRandom = document.getElementById("submit-random")

submit.addEventListener("click", function(e){
    e.preventDefault()
    fetchColor(false)
})
submitRandom.addEventListener("click", function (e){
    e.preventDefault()
    fetchColor(true)
})

function fetchColor(isRandom){
    const colorUrl = isRandom ? getRandomColorUrl() : getColorUrl()
    
    fetch(colorUrl)
        .then(res => res.json())
        .then (data => {
            const colors = data.colors.map((colorObj) => colorObj.hex.value)
            colorsArray = colors
            renderColors()
        })
}

getFeedHtml()
renderColors()

/* ----------------------------------------- */


//document.querySelector("#btnCopy").addEventListener("click", ()=>{  /* skapa klick event på knappen */
    //const content = document.querySelector("#content") /* skapa variabel för innehållet som skall kopieras */
    //const cb = navigator.clipboard /* skapa variabel för clipboard */
    //cb.writeText(content.value) /* kopiera innehållet till clipboard */
    //.then (() => {              /* visa meddelande om att texten kopierats */                       
    //    alert("Text copied")
  //  }) 
//})
