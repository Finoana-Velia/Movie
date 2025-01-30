const URL = "http://192.168.0.96:8080/api/v1/movies";

export async function getAllMovies() {
    return await fetch(URL).then(async (response) => await response.json())
    .catch((error) => console.warn(error));
}

// export function getAllMovies() {
//     return await fetch(URL).then((response) => response.json())
//     .catch((error) => console.warn(error));
// }

export function getMovieById(id) {
    return fetch(URL+`/${id}`).then(response => response.json())
    .catch((error) => console.warn(error));
}

export function searchMovieByTitle(title = '',page = 0,size = 0) {
    return fetch(URL+`?title=${title}&page=${page}&size=${size}`)
    .then(response => response.json())
    .catch(error => console.warn(error));
}

export function getJackets(id) {
    return URL + "/jacket?id="+id;
}

