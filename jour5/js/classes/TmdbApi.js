import { waitFor } from "../utils.js";

export class TmdbApi {
    #token;
    #name = null;

    constructor() {
        this.#token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzI0NThiYzk2NTVmMWNiNTY4YjRmNTc0YzA1Mjg2MyIsIm5iZiI6MTcyOTg1ODA5My41NDk1NDksInN1YiI6IjY3MWI4OWFjMWVhMzM5MjgyOTdkMjQ1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CDhIxks0R3IX7TfeIvoqdKqF-iuLHGt7MBoQ_GMpmYk';
    }

    get token() {
        return this.#token;
    }
    set token(token) {
        this.#token = token;
    }
    get name() {
        return this.#name;
    }
    set name(name) {
        this.#name = name;
    }

    async discoverMovies() {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${this.#token}`
            }
        };
        try {
            const res = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options);
            const resJSON = await res.json();
            let titles = [];

            resJSON.results.forEach(element => {
                titles.push(element);
            });
            return {titles};

        } catch (error) {
            elements.errorText.textContent = `An error occured : ${error.message}`;
        elements.errorText.removeAttribute('hidden');

        waitFor(5).then(() => {
            elements.errorText.setAttribute('hidden', true);
        });
        }
    }

    async searchMovies(moviesName, page) {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${this.#token}`
            }
        };
        try {
            const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${moviesName}&include_adult=false&language=en-US&page=${page}`, options);
            const resJSON = await res.json();
            let titles = [];

            const pages = resJSON.total_pages;
            resJSON.results.forEach(element => {
                titles.push(element);
            });
            
            const ret = {titles, pages}
            return ret;

        } catch (error) {
            elements.errorText.textContent = `An error occured : ${error.message}`;
        elements.errorText.removeAttribute('hidden');

        waitFor(5).then(() => {
            elements.errorText.setAttribute('hidden', true);
        });
        }
    }
}