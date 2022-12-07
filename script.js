// API request and connection 
const API_URL = "https://pokeapi.co/api/v2/pokemon/" 

const getPokeAPI = async() => {
    try {
        //---- Connection with API URL
        const getFetch = await fetch(API_URL);
        const getData = await getFetch.json();
        console.log(getData);
        const getPokemons = getData.results
        console.log(getPokemons)
        
        //---- Get each Pokemon data
        for(let i=0; i < getPokemons.length; i++) {
            fetch(getData.results[i].url)
            .then(resp => resp.json())
            .then(pokes => 
                setCards(pokes),
                //console.log(pokes)
            )
            
        }

    }
    catch(error) {
        console.log("Error: ", error.message);
    }
}
getPokeAPI();


// Get 20 more Pokemons 
const getMorePoke = async() => {
    try {
        //---- Connection with API URL
        const getFetch = await fetch(API_URL);
        const getData = await getFetch.json();
        //console.log(getData);

        //---- Connection with NEXT URL
        const morePoke = getData.next
        //console.log(morePoke) 
        const getMorePokeFetch = await fetch(morePoke);
        const getMorePokeData = await getMorePokeFetch.json();
        //console.log(getMorePokeData)
        const getMorePoke = getMorePokeData.results

        //---- Get each Pokemon data
        for(let i=0; i < getMorePoke.length; i++) {
            fetch(getMorePokeData.results[i].url)
            .then(resp => resp.json())
            .then(pokes => 
                setCards(pokes),
                //console.log(pokes)
            )
            
        }

        

        
    } catch(error) {
        console.log("Error: ", error.message);
    }
}



// Rendering cards
function setCards(pokeArray) {
    //console.log(pokeArray)
    const pokeCards = document.getElementById("cards-container")
    const divPokeCards = document.createElement("div");
    divPokeCards.classList.add("pokeCards")
    divPokeCards.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="${pokeArray.sprites.front_default}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">${pokeArray.name.toUpperCase()}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div>
    `
    pokeCards.classList.add("cards")
    pokeCards.appendChild(divPokeCards);
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