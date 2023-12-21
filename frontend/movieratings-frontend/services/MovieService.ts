const getAllMovies = async() => {
    const response = await fetch('http://localhost:3000/movies')
    return response.json();
}
const createMovie = (requestString: any) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestString)
    };
    return fetch('http://localhost:3000/movie/add', requestOptions)
        .then(response => response.json());
};

const MovieService = {
    getAllMovies, createMovie
}

export default MovieService;
