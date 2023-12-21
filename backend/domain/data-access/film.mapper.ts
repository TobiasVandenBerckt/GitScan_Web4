import { Film } from "../model/Film";
import { Film as FilmPrisma } from "@prisma/client";
import { Actor as ActorPrisma } from "@prisma/client";
import { Regisseur as RegisseurPrisma } from "@prisma/client";
import { mapToActors } from "./actor.mapper"
import { mapToRegisseur } from "./regisseur.mapper"


const mapToFilm = ({
    id,
    title,
    year,
    duration,
    info,
    beoordeling,
    director,
    actors,
}: FilmPrisma & { director: RegisseurPrisma } & { actors: ActorPrisma[] }): Film =>
    new Film({ id, title, year, duration, info, beoordeling, director: mapToRegisseur(director), actors: mapToActors(actors) });

const mapToFilms = (FilmsPrisma: (FilmPrisma & { director: RegisseurPrisma } & { actors: ActorPrisma[] })[]): Film[] => FilmsPrisma.map(mapToFilm);

export default { mapToFilm, mapToFilms }

export { mapToFilm, mapToFilms }   