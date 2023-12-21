import { Regisseur } from '../model/Regisseur';
import regisseurMapper from './regisseur.mapper';

const { PrismaClient } = require('@prisma/client');
const database = new PrismaClient();

const getAllRegisseurs = async () => {
    try {
        const regisseurs = await database.regisseur.findMany();
        return regisseurMapper.mapToRegisseurs(regisseurs);
    } catch (error) {
        console.error(error);
        throw new Error("database error kan geen regisseurs ophalen");
    }
};

const getRegisseurById = async ({ id }): Promise<Regisseur> => {
    try {
        const regisseur = await database.regisseur.findUnique({
            where: {
                id
            }
        });
        return regisseurMapper.mapToRegisseur(regisseur);
    } catch (error) {
        console.error(error);
        throw new Error("database error kan geen regisseur ophalen");
    }
};

const deleteRegisseurById = async ({ id }): Promise<Regisseur> => {
    try {
        const regisseur = await database.regisseur.delete({
            where: {
                id
            }
        });
        return regisseur;
    } catch (error) {
        console.error(error);
        throw new Error("database error kan geen regisseur verwijderen");
    }
};

const addRegisseur = async ({
    name,
    firstName,
    info,
}: {
    name: string;
    firstName: string;
    info: string;
}): Promise<Regisseur> => {
    try {
        const regisseur = await database.regisseur.create({
            data: {
                name,
                firstName,
                info,
            }
        });
        return regisseurMapper.mapToRegisseur(regisseur);
    } catch (error) {
        console.error(error);
        throw new Error("database error kan geen nieuwe regisseur toevoegen");
    }
};

const updateRegisseurById = async ({
    id,
    name,
    firstName,
    info
}): Promise<Regisseur> => {
    try {
        const regisseur = await database.regisseur.update({
            where: {
                id
            },
            data: {
                name,
                firstName,
                info
            }
        });
        return regisseurMapper.mapToRegisseur(regisseur);
    } catch (error) {
        console.error(error);
        throw new Error("database error kan geen regisseur updaten");
    }
};

export default { getAllRegisseurs, getRegisseurById, deleteRegisseurById, addRegisseur, updateRegisseurById };
