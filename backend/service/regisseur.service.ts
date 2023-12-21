import regisseurDb from "../domain/data-access/regisseur.db";
import { Regisseur } from "../domain/model/Regisseur";
import { regisseurInput } from "../types/index";

const getAllRegisseurs = async (): Promise<Regisseur[]> => {
    try {
        const regisseurs = await regisseurDb.getAllRegisseurs();
        return regisseurs;
    } catch (error) {
        throw new Error(error);
    }
}

const getRegisseurById = async (id: number): Promise<Regisseur> => {
    try {
        const regisseur = await regisseurDb.getRegisseurById({ id: id });
        return regisseur;
    } catch (error) {
        throw new Error(error);
    }
}

const deleteRegisseurById = async (id: number): Promise<void> => {
    const regisseur = await regisseurDb.getRegisseurById({ id: id });
    if (!regisseur) {
        throw new Error("Deze regisseur bestaat niet");
    }
    try {
        await regisseurDb.deleteRegisseurById({ id: id });
    } catch (error) {
        throw new Error(error);
    }
}

const updateRegisseurById = async (id: number, { name, firstName, info }: regisseurInput): Promise<Regisseur> => {
    if (!name || !firstName || !info) {
        throw new Error("Je hebt een verplicht veld niet ingevuld");
    }
    try {
        return await regisseurDb.updateRegisseurById({ id, name, firstName, info });
    } catch (error) {
        throw new Error(error);
    }
}

const addRegisseur = async ({ name, firstName, info }: regisseurInput): Promise<Regisseur> => {
    if (!name || !firstName || !info) {
        throw new Error("Je hebt een verplicht veld niet ingevuld");
    }
    try {
        const regisseur = await regisseurDb.addRegisseur({ name, firstName, info });
        return regisseur;
    } catch (error) {
        throw new Error(error);
    }
}



export default { getAllRegisseurs, getRegisseurById, deleteRegisseurById, updateRegisseurById, addRegisseur };