const beersListEl = document.querySelector(".beers__selection");
const pageButtons = document.querySelectorAll(".page");
const productInfo = document.querySelector(".product__info");
let currentPage = 1;
const beersPerPage = 8;

async function getBeers(page) {
  const startIndex = (page - 1) * beersPerPage;

  const response = await fetch(
    `https://api.punkapi.com/v2/beers?page=${page}&per_page=${beersPerPage}`
  );
  const beersData = await response.json();
  console.log(beersData);
  beersListEl.innerHTML = beersData
    .map(
      (beer) => `<div class="beer">
    <img class="beer__img" onclick="showInfo()" src="${beer.image_url}" alt="">
    <h3 class="beer__name">${beer.name}</h3>
    <p class="beer__type">${beer.tagline}</p>
  </div>`
    )
    .join("");

  currentPage = page;
  updatePaginationButtons();
}

function updatePaginationButtons() {
  pageButtons.forEach((button) => {
    const pageNumber = parseInt(button.innerText);
    button.disabled = pageNumber === currentPage;
  });
}

pageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const page = parseInt(button.innerText);
    getBeers(page);
  });
});

getBeers(currentPage);

/*
SHOW INFO
*/

