// BIND & DATA
const $one = document.querySelector.bind(document);
const rowElem = $one(".row");
const loadingElem = $one(".loading");
const overlayElem = $one(".overlay");
const overlayImgElem = $one(".overlay-image");

// FETCHED IMAGES
let images = [];

// LOADING
loadingElem.style.display = "block";

// SHOW OVERLAY
const showOverlay = (src, alt) => {
    overlayImgElem.src = src;
    overlayImgElem.alt = alt;
    overlayElem.classList.remove("hidden");
}

// CLOSE OVERLAY
const closeOverlay = () => {
    overlayElem.classList.add("hidden");
}

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
    `;
    })
    rowElem.innerHTML = result;
    loadingElem.style.display = "none";
    
    // OVERLAY IMAGE SELECTION
    const allImages = document.querySelectorAll(".main-img");
    allImages.forEach((img) => {
        img.addEventListener("click", (event) => {
            showOverlay(event.target.src, event.target.alt);
        });
    });
}

// OVERLAY CLICK
overlayElem.addEventListener("click", (event) => {
    if (event.target === overlayImgElem) {
        event.stopPropagation(); 
    } else {
        closeOverlay();
    }
});

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




