import { TmdbApi } from "./classes/TmdbApi.js";
import { reset } from "./utils.js";

export function displayMovies(moviesList, whereToDisplay){
    moviesList.forEach(element => {
        const div = document.createElement('div');
        const label = document.createElement('label');
        label.innerHTML = element.title;
        div.append(label);
        whereToDisplay.append(div);
    });
}

export async function displayPages(nbrPages, whereToDisplay, tmdb, moviesSection) {
    whereToDisplay.removeAttribute('hidden');
    
    // Réinitialiser les boutons de pagination à chaque appel
    whereToDisplay.innerHTML = '';

    for (let i = 0; i < nbrPages; i++) {
        const btn = document.createElement('button');
        btn.innerHTML = i + 1;
        whereToDisplay.append(btn);

        // Gérer l'événement de clic pour chaque bouton de page
        btn.addEventListener('click', async () => {
            reset(moviesSection); // Vider la section des films
            const pageNumber = parseInt(btn.innerHTML, 10);

            // Récupérer les films pour la page cliquée
            const updatedMoviesList = await tmdb.searchMovies(tmdb.name, pageNumber);
            
            // Afficher les films de la page sélectionnée
            displayMovies(updatedMoviesList.titles, moviesSection);
        });
    }
}