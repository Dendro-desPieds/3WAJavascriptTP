import { TmdbApi } from "./classes/TmdbApi.js";
import { reset } from "./utils.js";
import { displayMovies, displayPages } from "./display.js";


const elements = {
    searchBar: document.querySelector('#search-bar'),
    searchBtn: document.querySelector('#search-btn'),
    pagesSection: document.querySelector('#pages'),
    moviesList: document.querySelector('#movies-list')
};

//Affichage des recomandation au chargement de la page
const discover = new TmdbApi();
const movies = await discover.discoverMovies();
displayMovies(movies.titles, elements.moviesList);


//Apres avoir saisi un nom, et clicker sur le bouton
//=>Afficher la liste de film en rapport
elements.searchBtn.addEventListener('click', async (e)=>{
    e.preventDefault();
    if(elements.searchBar.value){
        reset(elements.moviesList);

        const search = new TmdbApi();
        search.name = elements.searchBar.value;
        const movies = await search.searchMovies(elements.searchBar.value, 1);
        displayMovies(movies.titles, elements.moviesList);
        displayPages(movies.pages, elements.pagesSection, search, elements.moviesList);
    }
})



