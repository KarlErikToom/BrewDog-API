const beersListEl = document.querySelector(".beers__selection");

async function getBeers() {
  const beers = await fetch("https://api.punkapi.com/v2/beers");
  const beersData = await beers.json();
  console.log(beersData)
  beersListEl.innerHTML = beersData
    .slice(0, 8)
    .map((beer) => beerHTML(beer))
    .join("");
}
getBeers();

 function beerHTML(beer){
return `
<div class="beer">
    <img class="beer__img" src="${beer.image_url}" alt="">
    <h3 class="beer__name">${beer.name}</h3>
    <p class="beer__type">${beer.tagline}</p>
</div>

`
}
