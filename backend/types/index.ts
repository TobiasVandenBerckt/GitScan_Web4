import { Actor } from '../domain/model/Actor';

export interface userInput {
    id?: number;
    email: string;
    name: string;
    firstName: string;
    password: string;
}

export interface filmInput {
    id?: number;
    title: string;
    year: number;
    duration: number;
    info: string;
    beoordeling: number;
    directorId: number;
    actors: Actor[];
}

export interface regisseurInput {
    id?: number;
    name: string;
    firstName: string;
    info: string;
}

export interface actorInput {
    id?: number;
    name: string;
    firstName: string;
    info: string;
}

