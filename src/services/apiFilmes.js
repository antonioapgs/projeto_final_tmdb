import axios from 'axios'

const apiFilmes = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'content-type': 'application/json;charset=utf-8',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MGI5MzhmMTNlMTMyMWJlYzEzNzBlNjkyNjQ1MTYxNyIsInN1YiI6IjYxNmRmZmUxM2Q0ZDk2MDA4ZDcwMjA4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AAuA57r_OzcYzazvXNdg-6LIysvVwxhbR2dhQi1GcYg'
    }
})

export default apiFilmes