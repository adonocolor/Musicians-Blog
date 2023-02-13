const preloader = document.querySelector(".preloader");
const galleries = document.querySelector(".gallery-ul");
const error = document.querySelector(".error");
const pagesNavigation = document.querySelector(".pages-nav");
let galleryList;

const randomNum = (min = 0, max = 1000) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


const createGallery = (gallery) => {
    const {
        title,
        url,
        thumbnailUrl,
        id
    } = gallery

    return `<div class="gallery">
                <p>${title}</p>
                <a target="_blank" href="${url}">
                    <img src="${thumbnailUrl}" alt="${id}">
                </a>
            </div>`;
};

window.addEventListener("load", async () => {
    preloader.style.display = "block";
    pagesNavigation.style.display = "none";
    galleries.style.display = "none";
    error.style.display = "none";

    await fetch("https://jsonplaceholder.typicode.com/photos")
        .then(r => r.json())
        .then(data => {
            let min = randomNum(0, 1000);
            let max = min + randomNum(50, 250);
            galleryList = data.slice(min, max);

            showPage()
            pagesNavigation.style.display = "flex";
            galleries.style.display = "flex";
            preloader.style.display = "none";
            error.style.display = "none";
        })
        .catch(() => {
            error.style.display = "block";
            pagesNavigation.style.display = "none";
            preloader.style.display = "none";
            galleries.style.display = "none";
        });
});

let pageNum = 0;
const prevButton = document.querySelector(".previous-button");
const pageNumberElement = document.querySelector(".page-number");
const nextButton = document.querySelector(".next-button");

const showPage = () => {
    galleries.innerHTML = "";
    let amount = 6

    let startElementNumber = pageNum * amount;
    let endElementNumber = Math.min(startElementNumber + amount, galleryList.length - 1)

    galleryList.slice(startElementNumber, endElementNumber)
        .forEach(d => galleries.insertAdjacentHTML("afterbegin", createGallery(d)));

    if (startElementNumber === 0) {
        prevButton.style.display = "none"
    } else {
        prevButton.style.display = "block"
    }

    pageNumberElement.textContent = (pageNum + 1).toString();

    if (endElementNumber === galleryList.length - 1) {
        nextButton.style.display = "none"
    } else {
        nextButton.style.display = "block"
    }
}

prevButton.addEventListener("click", () => {
    pageNum--;
    showPage()
})

nextButton.addEventListener("click", () => {
    pageNum++;
    showPage()
})