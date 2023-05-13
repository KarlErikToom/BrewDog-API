
const id = localStorage.getItem("id")

async function renderBeer(id){
    const beer = await fetch(`https://api.punkapi.com/v2/beers/${id}
    `)
    const beerData = await beer.json()
    console.log(beerData)
}
renderBeer(id)