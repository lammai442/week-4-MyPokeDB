const log = (msg) => console.log(msg);

log(pokemons);
if (window.location.pathname === '/') {
    pageSetup();
} else if (window.location.pathname === '/singlePokemon.html') {
    log('Hejsan från single pokemon');
    let pokemon = JSON.parse(localStorage.getItem('activePokemon'));
    log(pokemon.name);
}

function pageSetup() {
    log('pageSetup()');

    const generateSectionRef = document.querySelector('#generate');
    const searchSectionRef = document.querySelector('#search');
    generateSectionRef.classList.add('d-none');
    searchSectionRef.classList.add('d-none');

    const listItemRefs = document.querySelectorAll('.header__list-item');
    for (let ref of listItemRefs) {
        ref.addEventListener('click', displayActiveSection);
    }

    setupPokedex();
}

function displayActiveSection(event) {
    log('displayActiveSection()');

    const pokedexSectionRef = document.querySelector('#pokedex');
    const generateSectionRef = document.querySelector('#generate');
    const searchSectionRef = document.querySelector('#search');

    let activeSection = event.target.id;
    if (activeSection === 'pokedexLink') {
        pokedexSectionRef.classList.remove('d-none');
        generateSectionRef.classList.add('d-none');
        searchSectionRef.classList.add('d-none');
    } else if (activeSection === 'generateLink') {
        pokedexSectionRef.classList.add('d-none');
        generateSectionRef.classList.remove('d-none');
        searchSectionRef.classList.add('d-none');
    } else if (activeSection === 'searchLink') {
        pokedexSectionRef.classList.add('d-none');
        generateSectionRef.classList.add('d-none');
        searchSectionRef.classList.remove('d-none');
    }
}

function setupPokedex() {
    log('setupPokedex()');

    const pokedexSectionRef = document.querySelector('#pokedexSection');

    for (let pokemon of pokemons) {
        let card = createCard(pokemon);
        log(pokemon);
        pokedexSectionRef.appendChild(card);
    }
}

function createCard(pokemon) {
    log('createCard()');
    const cardRef = document.createElement('a');
    cardRef.addEventListener('click', () => {
        localStorage.setItem('activePokemon', JSON.stringify(pokemon));
    });
    cardRef.href = '/singlePokemon.html';

    cardRef.classList.add('card-link');
    cardRef.classList.add('card');

    let divRef = document.createElement('div');
    divRef.classList.add('card__top');
    divRef.appendChild(createImg(pokemon));
    divRef.appendChild(createSpan(pokemon));
    cardRef.appendChild(divRef);

    divRef = document.createElement('div');
    divRef.classList.add('card__middle');
    divRef.appendChild(createHeading(pokemon));
    divRef.appendChild(createSubHeading(pokemon));
    cardRef.appendChild(divRef);

    divRef = document.createElement('div');
    divRef.classList.add('card__bottom');
    for (let stat in pokemon.stats) {
        divRef.appendChild(createCardStat(stat, pokemon));
    }
    cardRef.appendChild(divRef);

    return cardRef;
}

/*
<article class="card">
    <div class="card__top">
        <img
        src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png"
        alt="Picture of Bulbasaur"
        class="card__img"
        />
        <span class="card__index">#1</span>
    </div>
    <div class="card__middle">
        <h3 class="card__pokemon-name">Bulbasaur</h3>
        <h4>Grass / Poison</h4>
    </div>
    <div class="card__bottom">
        <p class="card__stat">Attack: 49</p>
        <p class="card__stat">Defense: 49</p>
        <p class="card__stat">Sp. Attack: 65</p>
        <p class="card__stat">Sp. Defense: 65</p>
        <p class="card__stat">HP: 45</p>
        <p class="card__stat">Speed: 45</p>
        <p class="card__stat card__stat--span-two">Total: 318</p>
    </div>
</article>
*/

function createImg(pokemon) {
    const imgRef = document.createElement('img');
    imgRef.src = pokemon.image;
    // imgRef.setAttribute('src', pokemon.image);
    imgRef.alt = `Picture of ${pokemon.name}`;
    imgRef.classList.add('card__img');
    imgRef.style.backgroundColor = pokemon.type[0].color;
    return imgRef;
}

function createSpan(pokemon) {
    const spanRef = document.createElement('span');
    spanRef.textContent = `#${pokemon.id}`;
    spanRef.classList.add('card__index');
    return spanRef;
}

function createHeading(pokemon) {
    const headRef = document.createElement('h3');
    headRef.textContent = pokemon.name;
    headRef.classList.add('card__pokemon-name');
    return headRef;
}

function createSubHeading(pokemon) {
    const headRef = document.createElement('h4');
    if (pokemon.type.length === 1) {
        headRef.textContent = pokemon.type[0].name;
    } else {
        headRef.textContent = `${pokemon.type[0].name} / ${pokemon.type[1].name}`;
    }
    return headRef;
}

function createCardStat(stat, pokemon) {
    let pRef = document.createElement('p');
    pRef.classList.add('card__stat');
    if (stat === 'total') {
        pRef.classList.add('card__stat--span-two');
    }
    pRef.textContent = `${firstCaseToUpper(stat)}: ${pokemon.stats[stat]}`;
    return pRef;
}

function firstCaseToUpper(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
