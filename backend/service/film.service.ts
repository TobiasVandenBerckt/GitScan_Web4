import { Film } from '../domain/model/Film';
import filmDB from '../domain/data-access/film.db';
import { filmInput } from "../types/index";

const getAllFilms = async (): Promise<Film[]> => {
    try {
        const films = await filmDB.getAllFilms();
        return films;
    } catch (error) {
        throw new Error(error);
    }
}

const getFilmById = async (id: number): Promise<Film> => {
    if (Number.isNaN(id)) {
        throw new Error("id is geen nummer");
    }
    try {
        const film = await filmDB.getFilmById({ id: id });
        if (!film) {
            throw new Error('film bestaat niet');
        }
        return film;

    } catch (error) {
        throw new Error(error);
    }
}

const addFilm = async ({ title, year, duration, info, beoordeling, directorId, actors }: filmInput): Promise<Film> => {
    if (!title || !year || !duration || !info || !beoordeling || !directorId || !actors) {
        throw new Error('Geef alle velden in');
    }
    try {
        return await filmDB.addFilm({
            title, year, duration, info, beoordeling, directorId, actors,
        });
    } catch (error) {
        throw new Error(error);
    }
}

const updateFilm = async (id: number, { title, year, duration, info, beoordeling, directorId, actors }: filmInput): Promise<Film> => {
    if (!title || !year || !duration || !info || !beoordeling || !directorId || !actors) {
        throw new Error('Geef alle velden in');
    }
    try {
        const film = await filmDB.getFilmById({ id: id });
        if (!film) {
            throw new Error('film bestaat niet');
        }
        return await filmDB.updateFilm({
            id: id, title: title, year: year, duration: duration, info: info, beoordeling: beoordeling, directorId: directorId, actors: actors,
        });
    } catch (error) {
        throw new Error(error);
    }
}

const deleteFilm = async (id: number): Promise<Film> => {
    try {
        const film = await filmDB.getFilmById({ id: id });
        if (!film) {
            throw new Error('film bestaat niet');
        }
        return await filmDB.deleteFilm({ id: id });
    } catch (error) {
        throw new Error(error);
    }
}


export default { getAllFilms, addFilm, getFilmById, deleteFilm, updateFilm };
