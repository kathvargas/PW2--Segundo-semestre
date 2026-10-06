"use strict";

// =============================================
// DADOS FORNECIDOS
// =============================================
const movieData = [
    { id: 1, title: "A Origem", synopsis: "Um ladrão invade sonhos para plantar ideias.", genre: "Ficção", duration: 148, directorId: 1 },
    { id: 2, title: "Interestelar", synopsis: "Exploradores viajam por um buraco de verme.", genre: "Ficção", duration: 169, directorId: 1 },
    { id: 3, title: "Pulp Fiction", synopsis: "Histórias entrelaçadas em Los Angeles.", genre: "Crime", duration: 154, directorId: 2 },
    { id: 4, title: "Cidade de Deus", synopsis: "O crescimento do crime no Rio de Janeiro.", genre: "Drama", duration: 130, directorId: 3 },
    { id: 5, title: "O Auto da Compadecida", synopsis: "Dois amigos tentam sobreviver no sertão.", genre: "Comédia", duration: 104, directorId: 4 }
];

const directorData = [
    { id: 1, name: "Christopher Nolan", nationality: "Britânico" },
    { id: 2, name: "Quentin Tarantino", nationality: "Americano" },
    { id: 3, name: "Fernando Meirelles", nationality: "Brasileiro" },
    { id: 4, name: "Guel Arraes", nationality: "Brasileiro" }
];

const toastPrototype = {
    show(message, type = "success") {
        const element = document.querySelector("[data-toast]");
        if (!element) return;
        element.textContent = message;
        element.className = `toast is-visible is-${type}`;
        window.clearTimeout(this.timeout);
        this.timeout = window.setTimeout(() => element.classList.remove("is-visible"), 3500);
    }
};

// =============================================
// PARTE 1 — comece aqui
// =============================================
// Q1: crie moviePrototype, dois filmes e demonstre
const moviePrototype={
    getLabel(){
        return `${this.title}-${this.genre}`
    },
    isAvailable(){
        return this.available===true;
    }
}
const movie1=Object.create(moviePrototype);
movie1.title="Simplesmente acontece";
movie1.genre="Romance";
movie1.duration=90;
movie1.available=true;

const movie2=Object.create(moviePrototype);
movie2.title="Harry potter";
movie2.genre="Fantasia";
movie2.duration=100;
movie2.available=false;

console.log(Object.getPrototypeOf(movie1)===moviePrototype);
console.log(Object.getPrototypeOf(Object.prototype));
console.log(movie1.getLabel());
console.log(Object.hasOwn(movie1,'title'));
console.log(Object.hasOwn(movie1,'genre'));
console.log(Object.hasOwn(movie1,'duration'));
console.log(Object.hasOwn(movie1,'available'));

console.log(Object.hasOwn(movie1,'getLabel'));
console.log(Object.hasOwn(movie1,'isAvailable'));

console.log(Object.getPrototypeOf(movie2)===moviePrototype);
console.log(Object.getPrototypeOf(Object.prototype));
console.log(movie2.getLabel());
console.log(Object.hasOwn(movie2,'title'));
console.log(Object.hasOwn(movie2,'getLabel'));

moviePrototype.watch=function(){
    if(!this.available){
        console.log(`Nao foi possivel assistir:${this.title}`);
        return;
    }
    this.available=false;
    console.log(`voce assistiu:${this.title}`)
}
movie1.watch();
console.log(movie1.available);
movie2.watch();
console.log(movie2.available);
// Q2: crie marathon, cópias e restrições
//Considere um objeto `marathon` com uma lista aninhada de filmes.

1. Crie uma cópia rasa com spread e demonstre que uma alteração no item
   aninhado também aparece no objeto original. (0,5 pt)
2. Crie uma cópia profunda com `structuredClone()` ou alternativa documentada.
   Demonstre a independência da lista aninhada e registre uma limitação da
   técnica escolhida. (0,5 pt)
3. Use `Object.freeze()`, `Object.seal()` e `Object.preventExtensions()`.
   Para cada um, demonstre uma alteração permitida e uma operação impedida.
   (1,0 pt)

   const marathon={
    id:1,
    title:"maratona de ficçao",
    movies:[
        {id:1,title:"A Origem",duration:148},
        {id:2,title:"Interstelar",duration:169}
    ]
   };

   console.log("Original:",marathon.movies[0].title);
   console.log("Original:",marathon.movies[1].title);

   const shallowCopy={...marathon};
   shallowCopy.movies[0].title="Senhor dos aneis";
   console.log("Original:",marathon.movies[0].title);
   console.log("Copia:",shallowCopy.movies[0].title);
   console.log("Pertencem ao mesmo array?",marathon.movies===shallowCopy.movies);

   shallowCopy.movies[1].title="Macacos";
   console.log("Original:",marathon.movies[1].title);
   console.log("Copia:",shallowCopy.movies[1].title);
   console.log("Pertencem ao mesmo array?",marathon.movies===shallowCopy.movies);

   marathon.duracao=function(){
    return this.movies.duration;
   }
   const deepCopy=structuredClone(marathon);
   deepCopy.movies[0].title="Banana de pijamas";
   console.log(marathon.movies[0].title);

   console.log("Funçao no original:",marathon.duracao);
   console.log("DeepCopy:",deepCopy.duracao);





// =============================================
// PARTE 2 — implemente as classes
// =============================================
// class Director { ... }
// class Movie { ... }
// class MovieCatalog { ... }

// =============================================
// ESTADO E SELETORES
// =============================================
const state = { directors: [], movies: [], selectedDirectorId: "", term: "", catalog: null };
const directorFilter = document.querySelector("#director-filter");
const movieFilter = document.querySelector("#movie-filter");
const catalogStatus = document.querySelector("#catalog-status");
const movieList = document.querySelector("#movie-list");
const movieDetail = document.querySelector("#movie-detail");
const toast = Object.create(toastPrototype);

// =============================================
// RENDERIZAÇÃO
// =============================================
function renderDirectors() {
    // TODO
}

function renderMovies() {
    // TODO
}

function showMovieDetail(movieId) {
    // TODO
}

// =============================================
// INICIALIZAÇÃO
// =============================================
function initialize() {
    // TODO
}

// =============================================
// EVENTOS
// =============================================
directorFilter.addEventListener("change", () => {
    state.selectedDirectorId = directorFilter.value;
    renderMovies();
});

movieFilter.addEventListener("input", () => {
    state.term = movieFilter.value;
    renderMovies();
});

movieList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-movie-id]");
    if (button) showMovieDetail(button.dataset.movieId);
});

initialize();