const baseUrl = "http://192.168.0.96:8080";

const movieUrl = baseUrl + "/api/v1/movies";
const actorUrl = baseUrl + "/api/v1/actor";

/* movie endpoits */
export async function getAllMovies() {
    return await fetch(movieUrl).then(async (response) => await response.json())
    .catch((error) => console.warn(error));
}

export async function getMovieById(id) {
    return await fetch(movieUrl+`/${id}`).then(response => response.json())
    .catch((error) => console.warn(error));
}

export function searchMovieByTitle(title = '',size = 5) {
    return fetch(movieUrl+`?title=${title}&size=${size}`)
    .then(response => response.json())
    .catch(error => console.warn(error));
}

export function getJackets(id) {
    return movieUrl + "/jacket?id="+id;
}

/* actor endpoint */
export async function getActorById(id) {
    return await fetch(actorUrl + `/${id}`).then(response => response.json())
    .catch((error) => console.warn(error));
}

export function getProfile(id) {
    return actorUrl + "/getImage?id=" + id;
}

