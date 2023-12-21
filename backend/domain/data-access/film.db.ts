import { Film } from '../model/Film';
import filmMapper from './film.mapper';
import { Actor } from '../model/Actor';


const { PrismaClient } = require('@prisma/client');
const database = new PrismaClient();

const getAllFilms = async () => {
    try {
        const films = await database.film.findMany({
            include: {
                director: true,
                actors: true,
            }
        });
        return filmMapper.mapToFilms(films);
    } catch (error) {
        console.error(error);
        throw new Error('database error kan geen films ophalen');
    }
};

const getFilmById = async ({ id }) => {
    try {
        const film = await database.film.findUnique({
            where: {
                id
            },
            include: {
                director: true,
                actors: true,
            }
        });
        console.log(film);
        return filmMapper.mapToFilm(film);
    } catch (error) {
        console.error(error);
        throw new Error('database error kan geen film ophalen');
    }
};

const addFilm = async ({
    title,
    year,
    duration,
    info,
    beoordeling,
    directorId,
    actors,
}: {
    title: string;
    year: number;
    duration: number;
    info: string;
    beoordeling: number;
    directorId: number;
    actors: Actor[];
}): Promise<Film> => {
    try {
        const film = await database.film.create({
            data: {
                title,
                year,
                duration,
                info,
                beoordeling,
                director: { connect: ({ id: directorId }) },
                actors: { connect: actors.map((actor) => ({ id: actor.id })) },
            },
            include: {
                director: true,
                actors: true,
            }
        });
        return filmMapper.mapToFilm(film);
    } catch (error) {
        console.error(error);
        throw new Error('database error kan geen nieuwe film toevoegen');
    }
};

const deleteFilm = async ({ id }): Promise<Film> => {
    try {
        const film = await database.film.delete({
            where: {
                id
            }
        });
        return film;
    } catch (error) {
        console.error(error);
        throw new Error('database error kan geen film verwijderen');
    }
};

const updateFilm = async ({id, title, year, duration, info, beoordeling, directorId, actors }): Promise<Film> => {
    try {
        const film = await database.film.update({
            where: {
                id
            },
            data: {
                title,
                year,
                duration,
                info,
                beoordeling,
                director : { connect: ({ id: directorId }) },
                actors : { connect: actors.map((actor) => ({ id: actor.id })) },
            },
            include: { 
                director: true,
                actors: true,
            }
        });
        return filmMapper.mapToFilm(film);
    } catch (error) {
        console.error(error);
        throw new Error('database error kan geen film updaten');
    }
};


export default { getAllFilms, addFilm, getFilmById, deleteFilm, updateFilm };
