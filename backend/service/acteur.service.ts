import ActorDB from "../domain/data-access/Actor.db";
import { Actor } from "../domain/model/Actor";
import { actorInput } from "../types/index";

const getActorById = async (id: number): Promise<Actor> => {
    try {
        const actor = await ActorDB.getActorById({ id: id });
        if (!actor) {
            throw new Error('actor bestaat niet');
        }
        return actor;
    } catch (error) {
        throw new Error(error);
    }
}

const getAllActors = async (): Promise<Actor[]> => {
    try {
        const actors = await ActorDB.getAllActors();
        return actors;
    } catch (error) {
        throw new Error(error);
    }
}

const addActor = async ({ name, firstName, info }: actorInput): Promise<Actor> => {
    if (!name || !firstName || !info) {
        throw new Error('Geef alle velden in');
    }
    try {
        return await ActorDB.addActor({
            name, firstName, info,
        });
    } catch (error) {
        throw new Error(error);
    }
}

const deleteActor = async (id: number): Promise<Actor> => {
    try {
        const actor = await ActorDB.getActorById({ id: id });
        if (!actor) {
            throw new Error('actor bestaat niet');
        }
        return await ActorDB.deleteActor({ id: id });
    } catch (error) {
        throw new Error(error);
    }
}

const updateActor = async (id: number, { name, firstName, info }: actorInput): Promise<Actor> => {
    if (!name || !firstName || !info) {
        throw new Error('Geef alle velden in');
    }
    try {
        const actor = await ActorDB.getActorById({ id: id });
        if (!actor) {
            throw new Error('actor bestaat niet');
        }
        return await ActorDB.updateActor({ id, name, firstName, info });
    } catch (error) {
        throw new Error(error);
    }
}




export default { getAllActors, getActorById, addActor, deleteActor, updateActor };