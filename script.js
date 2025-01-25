const log = (msg) => console.log(msg);

// Startar funktionen
pageSetup();

// Visar allt på startsidan
function pageSetup() {
    // Refererar till sektionen 'Team generator' som finns i slutet av sidan.
    const generateSectionRef = document.querySelector('#generate');
    // Refererar till sektionen 'Search' som finns i slutet av sidan.
    const searchSectionRef = document.querySelector('#search');
    // Gömmer den h2 som följer med i Team Generator
    generateSectionRef.classList.add('d-none');
    // Gömmer den h2 som följer med i Search
    searchSectionRef.classList.add('d-none');

    // Referar till alla rubriker i naven
    const listItemRefs = document.querySelectorAll('.header__list-item');
    // Lägger en klickar på varje list item i naven.
    for(let ref of listItemRefs) {
        // Vid klick på en av dem så kommer den att köra igång funktionen.
        ref.addEventListener('click', displayActiveSection);
    }

    // Startar funktionen där alla pokemon visas på startsidan.
    setupPokedex();
}

// Funktionen när man klickar på någon av nav.
function displayActiveSection(event) {
    log('displayActiveSection()');

    // Referar till hela sectionen med pokemonkorten.
    const pokedexSectionRef = document.querySelector('#pokedex');
    // Referar till 'Team Generator' sektionen som är gömd från början.
    const generateSectionRef = document.querySelector('#generate');
    // Referar till 'Search' sektionen som är gömd från början.
    const searchSectionRef = document.querySelector('#search');

    // Skapar en variabel som kommer vara det id som man klickar på. Dessa id har rubrikerna i nav: 
    // Pokédex = #pokedexLink
    // Team Generator = #generatLink
    // Search Pokemon = #searchLink
    let activeSection = event.target.id;
    if(activeSection === 'pokedexLink') {
        // Här göms sektionerna eller gör de synlig beroende på vad som klickas.
        pokedexSectionRef.classList.remove('d-none');
        generateSectionRef.classList.add('d-none');
        searchSectionRef.classList.add('d-none');
        // Här göms sektionerna eller gör de synlig beroende på vad som klickas.
    } else if(activeSection === 'generateLink') {
        pokedexSectionRef.classList.add('d-none');
        generateSectionRef.classList.remove('d-none');
        searchSectionRef.classList.add('d-none');
        createTeamGeneratorBtn();
    
        // Här göms sektionerna eller gör de synlig beroende på vad som klickas.
    } else if(activeSection === 'searchLink') {
        pokedexSectionRef.classList.add('d-none');
        generateSectionRef.classList.add('d-none');
        searchSectionRef.classList.remove('d-none');
    }
}
// Funktionen för att sätta upp alla pokemons i startsidan.
function setupPokedex() {
    // En variabel som hämtar hem den tomma sektionen för att skapa korten.
    const pokedexSectionRef = document.querySelector('#pokedexSection');
    // En loop som skapar nya pokemonkort utifrån arrayen 'pokemons' som finns i andra javascriptfilen 'pokemons.js'.
    // I for of loopen blir att varje element i arrayen kommer skapa ett kort.
    for(let pokemon of pokemons) {
        // Skapar en array som heter card och som kommer anropa en funktion där korten kommer skapas och då sparas i arrayen där varje element blir ett objekt som innehåller korten.
        let card = createCard(pokemon);
        // Här läggs sedan korten in i den tomma sektionen i #pokedexSection.
        pokedexSectionRef.appendChild(card)
    }
}

// Denna funktion skapar varje enskild pokemonkort och då har det skickas med hela arrayen pokemon som ligger i pokemons.js filen.
function createCard(pokemon) {
    // Först skapas en article som är själva huvudkortet och lägger till klassen card.
    const cardRef = document.createElement('article');
    cardRef.classList.add('card');
    // Sedan skapas en div som kommer vara inuti articlen som kommer vara högst upp på kortet och få klassen card__top.
    let divRef = document.createElement('div');
    divRef.classList.add('card__top');
    //I diven så kommer det läggas in en bild som kommer att referera till det pokemonbild som finns i just den iterationens img. 
    divRef.appendChild(createImg(pokemon));
    // Därefter läggs även en liten rund cirkel längst upp till höger som kommer innehålla den iterationens pokemons id.
    divRef.appendChild(createSpan(pokemon));
    // Här läggs bilden och den lilla cirkeln med ID nr in i huvudkortet.
    cardRef.appendChild(divRef);

    // Här skapas en mittensektion med en div som kommer innehålla en h3(Huvudtitel med namnet på pokemonen) och h4(Subtitel med vilka egenskaper den har) 
    divRef = document.createElement('div');
    divRef.classList.add('card__middle');
    // Genom att anropa funktionen createHeading och skicka med den befintliga objektet så skapas en titel med dess namn.
    divRef.appendChild(createHeading(pokemon));
    // Genom att anropa funktionen createSubHeading och skicka med den befintliga objektet så skapas en subtitel med dess egenskaper.
    divRef.appendChild(createSubHeading(pokemon));
    // Här läggs de in i artikeln card.
    cardRef.appendChild(divRef);

    // Här skapas sista delen med en div som innehåller all statistik. Den får klassen card__bottom.
    divRef = document.createElement('div');
    divRef.classList.add('card__bottom');
    // En loop körs här för att iterera inom den interarationens objekts stas genom att lägga in pokemon.stats.
    for(let stat in pokemon.stats) {
        // Här läggs den in i andra divrefen men först anropas createCardStat och då skickas det två argument.
        divRef.appendChild(createCardStat(stat, pokemon));
    }
    // Slutligen läggs den sista divRefen in i cardRef.
    cardRef.appendChild(divRef);

    // Här returneras hela kortet.
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

// När denna anropas så skapas bilden. Ett argument som skickas in är den iterationens objekt från arrayen pokemons som finns i pokemons.js filen.
function createImg(pokemon) {
    // Först skapas variabeln imgRef innehåller ett nytt img element.
    const imgRef = document.createElement('img');
    // Därefter skapas en src som tilldelas den pokemonens länk som finns det objektet.
    imgRef.src = pokemon.image;
    // Här får den en alt-text
    imgRef.alt = `Picture of ${pokemon.name}`;
    // Klassen läggs till för img-elementet
    imgRef.classList.add('card__img');
    // Sedan läggs en bakgrundsfärg beroende på vilken färg som finns på det objektet
    imgRef.style.backgroundColor = pokemon.type[0].color;
    // Här returneras hela variabeln.
    return imgRef;
}

// Funktionen för att skapa den lilla gula cirkeln som finns längst upp på högra hörnet.
function createSpan(pokemon) {
    // Först skapas en variabel som innehåller nya elementet span.
    const spanRef = document.createElement('span');
    // Därefter får det elementet ett textinnehåll beroende på vilket id den har.
    spanRef.textContent = `#${pokemon.id}`;
    // Här läggs klassen in för den gula rutan.
    spanRef.classList.add('card__index');
    // Sedan returneas hela den cirkeln tillbaka.
    return spanRef;
}

// Funktionen för att skapa huvudtiteln h3 i klassen card__middle
function createHeading(pokemon) {
    // Variabeln headRef skapas med elementet h3
    const headRef = document.createElement('h3');
    // Lägger in textinnehållet och refererar till det objektets namn.
    headRef.textContent = pokemon.name;
    // Ger ett id till den huvudtiteln
    headRef.classList.add('card__pokemon-name');
    // Returnerar h3
    return headRef;
}

// Funktionen för att skapa subtitel h4 i klassen card__middle
function createSubHeading(pokemon) {
    // Variabeln headRef skapas med elementet h4
    const headRef = document.createElement('h4');
    // Lägger in textinnehållet och refererar till det objektets namn.
    // En ifsats för att kolla att det bara finns ett objekt innuti pokemon.typ.
    if(pokemon.type.length === 1) {
        // Om det bara finns ett så kommer endast att lägga in en egenskap
        headRef.textContent = pokemon.type[0].name;
    } 
    // om det skulle finnas mer än 1 objekt som kommer istället detta köras och lägga in fler egenskaper
    else {
        headRef.textContent = `${pokemon.type[0].name} / ${pokemon.type[1].name}`;
    }
    // Returnerar subtiteln till mittenkortets klassnamn card__middle
    return headRef;
}

// Här skapas kortets statistik där den tar med två argument.
function createCardStat(stat, pokemon) {
    // här skapas en paragraph som innehåller statistiken.
    let pRef = document.createElement('p');
    // Här får den en klass till sig.
    pRef.classList.add('card__stat');
    // Om själva stats heter 'total' så kommer den få klassen card__stat--span-two som kommer då att ta upp två platser i griden.
    if(stat === 'total') {
        pRef.classList.add('card__stat--span-two');
    }
    // Varje pRef kommer innehålla följande text där funktionen firstCaseToUpper är en funktion som gör att första bokstaven blir en stor bokstav då det objektets keyword inte kan börja med en stor bokstav. I nästa så har den pokemon.stats[stats] är dess värde och beroende på vilket nr den är på i den forloopen från kodrad 115 så kommer den kopplas med dess värde.
    pRef.textContent = `${firstCaseToUpper(stat)}: ${pokemon.stats[stat]}`;
    return pRef;
}

// En funktion som gör att första bokstaven i strängen blir stor bokstav.
function firstCaseToUpper(str) {
    // Parametern str tar emot strängen och letar efter första bokstaven i orden och gör det till stor bokstav sedan läggs resterande till där man använder slice som lägger till återstående av strängen och man får välja från vilket index den börjar.
    return str.charAt(0).toUpperCase() + str.slice(1);
}


// MIN KOD
// TEAM GENERATOR SECTION

// Funktion som skapar knappen i sida 'Team generator'
function createTeamGeneratorBtn() {
    // Skapar en referens till den sectionen
    let generateRef = document.querySelector('#generate');
    // Skapar ett nytt button-element
    let generateBtnRef = document.querySelector('#team-generator-btn');
    // Lägger till text till knappen
    generateBtnRef.textContent = 'Generera ett lag';

    // Här skapas en sektion där de nya korten kommer läggas in i.
    let sectionCard = document.createElement('section');
    sectionCard.id = 'team-generator-section';
    sectionCard.classList.add('section');

    // Lägger till en klickarp på knappen som utför en randomiserat lag.
    generateBtnRef.addEventListener('click', addTeam);

    // sectionCard.appendChild(generateBtn);
    // Lägger in knappen till sektionen.
    generateRef.appendChild(generateBtnRef);
    generateRef.appendChild(sectionCard);
};

function addTeam() {
    // Här refereras det till den övergripande sektionen i 'Team Generator' sidan.
    let generateRef = document.querySelector('#team-generator-section');

    // Måste lägga in ett pokemonindexnr som senare skickas med till createCard.
    let randomPokemon = pokemons[Math.floor(Math.random() * 151)];

    // Här skapas den articeln som kommer innehålla alla korten.
    let newCard = document.createElement('card')
    newCard.classList.add('card');
    
    newCard = createCard(randomPokemon);
    
    generateRef.appendChild(newCard);
};




