const $one = document.querySelector.bind(document);

const rowElem = $one(".row")
const loadingElem = $one(".loading");

let images = [];

const printImages = () => {
    let result = "";

    images.forEach((curImage) => {
        result += `
        <div class="col">
            <div class="card-image">
                <img class="main-img" data-post-id="${curImage.id}" src="${curImage.url}" alt="${curImage.title}">
            </div>
            <p class="card-text">
                ${curImage.title}
            </p>     
        </div>
    `
    console.log(curImage.id)
    })
    rowElem.innerHTML = result;
    loadingElem.style.display = "none"
}

loadingElem.style.display = "block";

axios.get("https://jsonplaceholder.typicode.com/photos?_limit=6")
    .then(resp => {
        images = resp.data; 
        printImages();
    })
    .catch(error => {
        console.error("Error:", error);
        loadingElem.style.display = "none";
        rowElem.innerHTML = `<p class="error">Error during loading. Please try again later.</p>`;
    });
