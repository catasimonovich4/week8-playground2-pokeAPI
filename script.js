// API request and conection 
const API_URL = "https://pokeapi.co/api/v2/pokemon/"

const getPokeAPI = async() => {
    try {
        const getFetch = await fetch(API_URL);
        const getData = await getFetch.json();
        console.log(getData);
        const getPokemons = getData.results
        console.log(getPokemons)
        setCards(getPokemons);
        
        console.log(getData.results.url)
        const getPokemonsFetch = await fetch(getData.results.url);
        const getPokemonData = await getPokemonsFetch.json();
        console.log(getPokemonData)
    }
    catch(error) {
        console.log("Error: ", error.message);
    }
}
getPokeAPI();



// Rendering cards
function setCards(pokeArray) {
    //console.log(pokeArray)
    const pokeCards = document.getElementById("cards-container")
    for(let i=0; i<pokeArray.length; i++) {
        const divPokeCards = document.createElement("div");
        divPokeCards.classList.add("pokeCards")
        divPokeCards.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">${pokeArray[i].name.toUpperCase()}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div>
        `
        pokeCards.classList.add("cards")
        pokeCards.appendChild(divPokeCards);
    }

   /*  pokeArray.forEach(pokemon => {
        const divPokeCards = document.createElement("div");
        divPokeCards.classList.add("pokeCards")
        divPokeCards.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="" class="card-img-top" alt="">
            <div class="card-body">
                <h5>${pokemon.results.name}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div>
        `
        pokeCards.appendChild(divPokeCards);
    }); */
}


// Search bar filter
function search() {
    const inputSearchPokemon = document.getElementById("search-pokemon");
    const titleCard = document.querySelectorAll(".card-title");
    //console.log(titleCard)
    const cards = document.querySelectorAll(".cards");
    //console.log(cards)
  
    inputSearchPokemon.addEventListener("keyup", (event) => {
  
      let busqueda = event.target.value.toLowerCase();
      console.log(busqueda);
  
      for (let i = 0; i < cards.length; i++) {
          titleCard[i].textContent.toLowerCase().includes(busqueda)
          ? cards[i].classList.remove("hidden")
          : cards[i].classList.add("hidden");
      }
  
    });
  
  }