export interface User {
    id: number;
    email: string;
    name: string;
    firstName: string;
    password: string;
}
export interface Movie {
    id: number;
    title: string;
    year: number;
    duration: number;
    info: string;
    beoordeling: number;
    director: Director;
    actors: Actor[];
}
export interface Director {
    id: number;
    name: string;
    firstName: string;
    info: string;
}
export interface Actor {
    id: number;
    name: string;
    firstName: string;
    info: string;
}

export type StatusMessage = {
    type: 'error' | 'success';
    message: string;
};
