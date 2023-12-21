import Head from 'next/head'
import { Header } from '../../components/Header'
import MovieOverviewTable from '../../components/movies/MovieOverviewTable'
import { Movie } from '../../types'
import MovieService from '../../services/MovieService'
import { useState, useEffect } from 'react'

const Movies: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([])
    const [error, setError] = useState<string>();

    const fetchMovies = async () => {
        const movies = await MovieService.getAllMovies()
        setMovies(movies)
    }
    useEffect(() => {
        fetchMovies()
    }, [])
    return (
        <>
            <Head>
                <title>MovieRatings - Movies</title>
                </Head>
                <Header></Header>
                <main>
                    
                <h2>Movies</h2>
                <br />
                    <section className='row justify-content-center'>
                    {error && <div className="text-danger">{error}</div>}
                    {movies && <MovieOverviewTable movies={movies} />}
                    </section>
                </main>
        </>
    )
}
export default Movies