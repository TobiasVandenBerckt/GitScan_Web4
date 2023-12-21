import { Actor } from './Actor';
import { Regisseur } from './Regisseur';

export class Film {
    readonly id?: number;
    readonly title: string;
    readonly year: number;
    readonly duration: number;
    readonly info: string;
    readonly beoordeling: number;
    readonly director: Regisseur;
    readonly actors: Actor[];

    constructor(film: {
        id: number;
        title: string;
        year: number;
        duration: number;
        info: string;
        beoordeling: number;
        director: Regisseur;
        actors: Actor[];
    }) {
        this.id = film.id;
        this.title = film.title;
        this.year = film.year;
        this.duration = film.duration;
        this.info = film.info;
        this.beoordeling = film.beoordeling;
        this.director = film.director;
        this.actors = film.actors;
    }
    equals({ id, title, year, duration, info, beoordeling, director, actors }: Film): boolean {
        return (
            this.id === id &&
            this.title === title &&
            this.year === year &&
            this.duration === duration &&
            this.info === info &&
            this.beoordeling === beoordeling &&
            this.director === director &&
            this.actors === actors
        );
    }

    static create({
        id,
        title,
        year,
        duration,
        info,
        beoordeling,
        director,
        actors
    }: {
        id: number;
        title: string;
        year: number;
        duration: number;
        info: string;
        beoordeling: number;
        director: Regisseur;
        actors: Actor[];
    }): Film {
        return new Film({ id, title, year, duration, info, beoordeling, director, actors });
    }
}
