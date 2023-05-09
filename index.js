async function getBeers(){
    const beers = await fetch("https://api.punkapi.com/v2/beers")
    const beersData = await beers.json()
    console.log(beersData)
}
getBeers()