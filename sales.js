const beersListEl = document.querySelector(".beers__selection");
const pageButtons = document.querySelectorAll(".page");
const productInfo = document.querySelector(".product__info");
const productText = document.querySelector(".product__info--wrapper");
let currentPage = 1;
const beersPerPage = 8;
let beersData = [];

async function getBeers(page) {
  const startIndex = (page - 1) * beersPerPage;
  const response = await fetch(
    `https://api.punkapi.com/v2/beers?page=${page}&per_page=${beersPerPage}`
  );
  beersData = await response.json();
  beersListEl.innerHTML = beersData
    .map(
      (beer) => `
    <div class="beer">
      <img class="beer__img" onclick="showInfo(${beer.id})" src="${beer.image_url}" alt="">
      <h3 class="beer__name">${beer.name}</h3>
      <p class="beer__type">${beer.tagline}</p>
    </div>
  `
    )
    .join("");
  currentPage = page;
  updatePaginationButtons();
}

function updatePaginationButtons() {
  pageButtons.forEach((button) => {
    button.disabled = parseInt(button.innerText) === currentPage;
  });
}

function showInfo(beerId) {
  const selectedBeer = beersData.find((beer) => beer.id === beerId);
  const htmlContent = selectedBeer
    ? `
    <div class="product__close"><i onclick=closeProduct() class="fa-solid fa-x"></i></div>
    <p class="product__name">${selectedBeer.name}</p>
    <p class="product__abv">ABV: ${selectedBeer.abv}</p>
    <p class="product__pairing">Food Pairing: ${selectedBeer.food_pairing.join(", ")}</p>
    <p class="product__description">${selectedBeer.description}</p>
    <button class="product__btn" >Add To Cart</button>`: "";

  productText.innerHTML = htmlContent;
  productInfo.style.display = selectedBeer ? "block" : "none";
}
function closeProduct(){
  productInfo.style.display = "none"
}

pageButtons.forEach((button) => {
  button.addEventListener("click", () => getBeers(parseInt(button.innerText)));
});

getBeers(currentPage);
