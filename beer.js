
const id = localStorage.getItem("id")
const beersListEl = document.querySelector(".beer__wrapper")

async function renderBeer(id){
    const beers = await fetch(`https://api.punkapi.com/v2/beers/${id}
    `)
    const beersData = await beers.json()
    console.log(beersData)
    beersListEl.innerHTML = beersData.map((beer) => beerHTML(beer)).join("")
}
renderBeer(id)

function beerHTML(beer){
    return ` <div class="beer__wrapper">  
    <div class="beer__img--wrapper">
    <img class="beer__img" src="${beer.image_url}" alt="" />
  </div>
  <div class="beer__info">
    <div class="beer__info--border">
        <h3 class="beer__name">Name: ${beer.name}</h3>
        <h3 class="beer__tagline">Type: ${beer.tagline}</h3>
        <h3 class="beer__abv">ABV: ${beer.abv}%</h3>
      <h3 class="beer__description">Description: ${beer.description}</h3>
      <h3 class="beer__pairing">Pair great with: ${beer.food_pairing}</h3>
      <h3 class="beer__ferment">Fermented at ${beer.method.fermentation.temp.value} ${beer.method.fermentation.temp.unit}</h3>
      <h3 class="beer__ingredients">${beer.ingredients.hops[0]}</h3>
    </div>
  </div>
</div>
    `
}