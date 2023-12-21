import actorMapper from "./actor.mapper"
import { Actor } from '../model/Actor';

const { PrismaClient } = require('@prisma/client');
const database = new PrismaClient();

const getActorById = async ({ id }): Promise<Actor> => {
    try {
        const actor = await database.actor.findUnique({
            where: {
                id
            }
        });
        return actorMapper.mapToActor(actor);
    } catch (error) {
        console.log(error);
        throw new Error('database error kan geen actor ophalen');
    }
};

const getAllActors = async () => {
    try {
        const actors = await database.actor.findMany();
        return actorMapper.mapToActors(actors);
    } catch (error) {
        console.error(error);
        throw new Error('database error kan geen actors ophalen');
    }
};

const addActor = async ({
    name,
    firstName,
    info
}: {
    name: string;
    firstName: string;
    info: string;
}): Promise<Actor> => {
    try {
        const actor = await database.actor.create({
            data: {
                name,
                firstName,
                info
            },
        });
        return actorMapper.mapToActor(actor);
    } catch (error) {
        console.error(error);
        throw new Error('database error kan geen actor toevoegen');
    }
};

const deleteActor = async ({ id }): Promise<Actor> => {
    try {
        const actor = await database.actor.delete({
            where: {
                id
            }
        });
        return actor;
    } catch (error) {
        console.error(error);
        throw new Error('database error kan geen actor verwijderen');
    }
};

const updateActor = async ({ id, name, firstName, info }): Promise<Actor> => {
    try {
        const actor = await database.actor.update({
            where: {
                id
            },
            data: {
                name,
                firstName,
                info
            },
        });
        return actorMapper.mapToActor(actor);
    } catch (error) {
        console.error(error);
        throw new Error('database error kan geen actor updaten');
    }
};




export default { getActorById, getAllActors, addActor, deleteActor, updateActor };
