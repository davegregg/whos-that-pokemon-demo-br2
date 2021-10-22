/*
    1. Research the PokeAPI to learn how I might get a random Pokemon to show to the user.
        - How to randomize?
            - getRandomId()
        - How to request Pokemon data?
            - GET https://pokeapi.co/api/v2/pokemon/XXX
            - The main sprite image is `pokemon.sprites.front_default`

    2. Research how to use CSS (or something) to create a silhouette of the Pokemon, based on the front_default sprite (image)
*/

const LAST_POKEMON_ID = 809 // End of Generation 7
const getRandomId = (maxId = LAST_POKEMON_ID) => Math.floor(Math.random() * maxId + 1)
const toNameCase = word => word[0].toUpperCase() + word.slice(1)


fetch(`https://pokeapi.co/api/v2/pokemon/${getRandomId()}`)
    .then(response => response.json())
    .then(renderPokemon)


function renderPokemon (pokemon) {
    // <img src="SPRITE_IMAGE_HERE" class="sprite silhouette" data-pokemon="snorlax">
    const sprite = document.createElement("img")
    sprite.src = pokemon.sprites.front_default
    sprite.classList.add("sprite", "silhouette")
    sprite.dataset.pokemon = pokemon.name

    // <h3 class="pokemon-title hidden">Snorlax</h3>
    const h3 = document.createElement("h3")
    h3.classList.add("pokemon-title", "black-text-shadow", "hidden")
    h3.append(`It's ${toNameCase(pokemon.name)}!`)

    document
        .querySelector("main")
        .append(sprite, h3)
}


document
    .querySelector("#pokemon-guess-form")
    .addEventListener("submit", event => {
        event.preventDefault()

        const form = event.target
        const guess = form.elements.guess.value.toLowerCase()
        const pokemonElement = document.querySelector("main > .sprite")
        const pokemonTitle = document.querySelector("main > .pokemon-title")

        const guessIsCorrect = guess === pokemonElement.dataset.pokemon
        if (guessIsCorrect) {
            pokemonElement.classList.add("glow")
        }
        
        pokemonElement.classList.remove("silhouette")
        pokemonTitle.classList.remove("hidden")
    })