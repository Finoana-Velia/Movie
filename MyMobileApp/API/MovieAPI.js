const URL = "http://192.168.43.47:8080/api/v1/movies";

export function getAllMovies() {
    return fetch(URL).then((response) => response.json())
    .catch((error) => console.warn(error));
}

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

