import React from 'react';
import { Movie } from '../../types';

type Props = {
    movies: Movie[];
};

const MovieOverviewTable: React.FC<Props> = ({ movies }: Props) => {
    return (
        <table>
            <thead>
                <tr>
                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>ID</th>
                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Title</th>
                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Year</th>
                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Duration</th>
                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Info</th>
                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Rating</th>
                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Director Name</th>
                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Director First Name</th>
                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Director Info</th>
                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Actors</th>
                </tr>
            </thead>
            <tbody>
                {movies.map((movie) => (
                    <tr key={movie.id}>
                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>{movie.id}</td>
                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>{movie.title}</td>
                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>{movie.year}</td>
                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>{movie.duration}</td>
                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>{movie.info}</td>
                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>{movie.beoordeling}</td>
                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>{movie.director.name}</td>
                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>{movie.director.firstName}</td>
                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>{movie.director.info}</td>
                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                            {movie.actors.map((actor) => (  
                                <div key={actor.id}>
                                    {actor.firstName} {actor.name}
                                </div>  
                            ))}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default MovieOverviewTable;
