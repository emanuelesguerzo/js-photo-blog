const $one = document.querySelector.bind(document);

const rowElem = $one(".row")

let images = [];

const printImages = () => {
    let result = "";

    images.forEach((curImage) => {
        result += `
        <div class="col">
            <div class="card-image">
                <img class="main-img" src="${curImage.url}" alt="${curImage.title}">
            </div>
            <p class="card-text">
                ${curImage.title}
            </p>     
        </div>
    `
    })
    rowElem.innerHTML = result;
}

axios.get("https://jsonplaceholder.typicode.com/photos?_limit=6")
    .then(resp => {
        images = resp.data; 
        printImages();
    })
    .catch(error => {
        console.error("Errore durante il caricamento delle immagini:", error);
    });
