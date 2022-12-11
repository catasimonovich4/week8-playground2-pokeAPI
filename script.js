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
            .then(pokes => {
                setCards(pokes)
                search();
                //console.log(pokes)
            })
            
        }
        
    }
    catch(error) {
        console.log("Error: ", error.message);
    }
}
getPokeAPI();


// Get next 20 Pokemons 
const getNextPoke = async() => {
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
            .then(pokes => {
                setCards(pokes);
                //console.log(pokes);
            })
            
        }

    } catch(error) {
        console.log("Error: ", error.message);
    }
}
//getNextPoke()


// Get previous 20 Pokemons 
const getPreviousPoke = async() => {
    try {
        //---- Connection with API URL
        const getFetch = await fetch(API_URL);
        const getData = await getFetch.json();
        //console.log(getData);
        const nextUrl = getData.next
        //console.log(nextUrl)
        const nextUrlFetch = await fetch(nextUrl);
        const nextUrlData = await nextUrlFetch.json();
        //console.log(nextUrlData)

        //---- Connection with PREVIOUS URL
        if (nextUrlData.previous != null) {
            const morePoke = nextUrlData.previous
            console.log(morePoke) 
            const getMorePokeFetch = await fetch(morePoke);
            const getMorePokeData = await getMorePokeFetch.json();
            //console.log(getMorePokeData)
            const getMorePoke = getMorePokeData.results

            //---- Get each Pokemon data
            for(let i=0; i < getMorePoke.length; i++) {
                fetch(getMorePokeData.results[i].url)
                .then(resp => resp.json())
                .then(pokes => {
                    setCards(pokes);
                    //console.log(pokes);
                })
            }
        }
        

    } catch(error) {
        console.log("Error: ", error.message);
    }
}
//getPreviewsPoke()


// Rendering cards
function setCards(pokeArray) {
    //console.log(pokeArray)
    const pokeCards = document.getElementById("cards-container")
    const divPokeCards = document.createElement("div");
    divPokeCards.classList.add("pokeCards")
    divPokeCards.innerHTML = `
        <div class="card" style="width: 18rem;">
            <div class="poke-id-div">
                <span id="poke-id">${pokeArray.id}
            </div>
            <div class="poke-img-div">
                <img src="${pokeArray.sprites.front_default}" class="card-img-top" alt="">
            </div>
            <div class="card-body">
                <h5 class="card-title">${pokeArray.name.toUpperCase()}</h5>
            </div>
        </div>
    `
    divPokeCards.classList.add("cards");
    pokeCards.appendChild(divPokeCards);
}


// Remove cards
function removeCards() {
    const cards = document.querySelectorAll(".cards");
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.add("hidden");
    }
}


// "Next Page Pokemons" button
function nextButton() { 
    const button = document.getElementById("next-btn")
    button.addEventListener("click", (event) => {
        //const pokeCards = document.getElementById("cards-container")
        //pokeCards.innerHTML = ` `;
        removeCards();
        getNextPoke();
    })
} 
nextButton();

// "Previous Page Pokemons" button
function previousButton() { 
    const button = document.getElementById("previous-btn")
    button.addEventListener("click", (event) => {
        //const pokeCards = document.getElementById("cards-container")
        //pokeCards.innerHTML = ` `;
        removeCards();
        getPreviousPoke();
    })
} 
previousButton();



// Search bar filter
function search() {
    const inputSearchPokemon = document.getElementById("search-pokemon");
    const titleCard = document.querySelectorAll(".card-title");
    console.log(titleCard) 
    //const idCard = document.querySelectorAll(".poke-id");
    //console.log(idCard) // esta vacio 
    const cards = document.querySelectorAll(".cards");
    console.log(cards) 
  
    inputSearchPokemon.addEventListener("keyup", (event) => {
  
      let busqueda = event.target.value.toLowerCase();
      //console.log(busqueda);
        
        /* for (let i = 0; i < cards.length; i++) {
            if (titleCard[i].textContent.toLowerCase().includes(busqueda) || idCard[i].textContent.includes(busqueda)) 
                cards[i].classList.remove("hidden");
            else 
                cards[i].classList.add("hidden");
        }
 */

       for (let i = 0; i < cards.length; i++) {
          titleCard[i].textContent.toLowerCase().includes(busqueda)
          ? cards[i].classList.remove("hidden")
          : cards[i].classList.add("hidden");
        }
        


    });
  
}



// "No match" message
function noMatch() {
    noCardTextDiv = document.createElement("div");
    noCardTextDiv.classList.add("noCard-text-container");
    noCardTextDiv.innerHTML = `<p>There's no matching results</p>`;
    cardsContainer.appendChild(noCardTextDiv);
} 

