const beersListEl = document.querySelector(".beers__selection");

async function getBeers() {
  const beers = await fetch("https://api.punkapi.com/v2/beers");
  const beersData = await beers.json();
  beersListEl.innerHTML = beersData
    .slice(0, 8)
    .map((beer) => beerHTML(beer))
    .join("");
}
getBeers();

function beerHTML(beer) {
  return `
<div class="beer">
    <img class="beer__img" src="${beer.image_url}" alt="">
    <h3 class="beer__name">${beer.name}</h3>
    <p class="beer__type">${beer.tagline}</p>
</div>

`;
}
const randomBeerContainer = document.querySelector(".random__beer");
const randomBeerInfo = document.querySelector(".random__info");

async function getRandomBeers() {
  const randomBeers = await fetch("https://api.punkapi.com/v2/beers/random");
  const randomBeersData = await randomBeers.json();
  console.log(randomBeersData);

  const beersWithImage = randomBeersData.filter((beer) => beer.image_url);
  if (beersWithImage.length === 0) {
    getRandomBeers();
    return;
  }

  randomBeerContainer.innerHTML = beersWithImage
    .map((beer) => beerImg(beer))
    .join("");
  randomBeerInfo.innerHTML = randomBeersData
    .map((beer) => beerInfo(beer))
    .join("");
}

function beerImg(beer) {
  return `
  <button class="random__beer--btn" onclick="getRandomBeers()">Grab me a beer</button>
  <img class="random__beer--img" src="${beer.image_url}" alt="" />

  `;
}

function beerInfo(beer) {
  return `<div class="random__info--border">
  <h3 class="random__description">
  ${beer.description}
</h3>
<h3 class="random__pairing">Pairs wonderfully with: ${beer.food_pairing}</h3>
<h3 class="random__ferment">Fermented at: ${beer.method.fermentation.temp.value} ${beer.method.fermentation.temp.unit}</h3>
</div>
  `;
}
