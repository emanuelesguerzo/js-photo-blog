// BIND
const $one = document.querySelector.bind(document);

// DATA
const rowElem = $one(".row")
const loadingElem = $one(".loading");
const closeBtn = $one(".close-btn");
const overlayElem = $one(".overlay");
const overlayImgElem = $one(".overlay-image");

// FETCHED IMAGES
let images = [];

// LOADING
loadingElem.style.display = "block";

// AXIOS FETCH
axios.get("https://jsonplaceholder.typicode.com/photos?_limit=6")
    .then(resp => {
        images = resp.data; 
        printImages();
    })
    .catch(error => {
        console.error("Errore:", error);
        loadingElem.style.display = "none";
        rowElem.innerHTML = `<p class="error">Errore durante il caricamento. Riprova più tardi.</p>`;
    });

// PRINT IMAGES
const printImages = () => {
    let result = "";

    images.forEach((curImage) => {
        result += `
        <div class="col">
            <img class="main-img card-image" src="${curImage.url}" alt="${curImage.title}">
            <p class="card-text">
                ${curImage.title}
            </p>     
        </div>
    `
    })
    rowElem.innerHTML = result;
    loadingElem.style.display = "none"
    
    // OVERLAY IMAGE SELECTION
    const allImages = document.querySelectorAll(".main-img");
    allImages.forEach((img) => {
        img.addEventListener("click", (event) => {
            const imgSrc = event.target.src;
            const imgAlt = event.target.alt;  
            overlayImgElem.src = imgSrc
            overlayImgElem.alt = imgAlt
            overlayElem.classList.remove("hidden");
        }) 
    })
}

// CLOSE OVERLAY
overlayElem.addEventListener("click", (event) => {
    if (event.target === overlayImgElem) {
        event.stopPropagation(); 
    } else {
        overlayElem.classList.add("hidden"); 
    }
});

// CLOSE BUTTON
closeBtn.addEventListener("click", () => {
    overlayElem.classList.add("hidden");
})




