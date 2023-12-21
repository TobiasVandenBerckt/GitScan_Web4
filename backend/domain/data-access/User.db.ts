import { User } from "../model/User";
import userMapper from "./user.mapper";

const { PrismaClient } = require("@prisma/client");
const database = new PrismaClient();

const addUser = async ({
    email,
    name,
    firstName,
    password
}: {
    email: string;
    name: string;
    firstName: string;
    password: string;
}): Promise<User> => {
    try {
        const user = await database.user.create({
            data: {
                email,
                name,
                firstName,
                password
            }
        });
        return userMapper.mapToUser(user);
    } catch (error) {
        console.error(error);
        throw new Error("database error kan geen nieuwe user toevoegen");
    }
};
const getAllUsers = async (): Promise<User[]> => {
    try {
        const users = await database.user.findMany();
        return userMapper.mapToUsers(users);
    } catch (error) {
        console.error(error);
        throw new Error("database error kan geen users ophalen");
    }
};

const getUserById = async ({ id }): Promise<User> => {
    try {
        const user = await database.user.findUnique({
            where: {
                id
            }
        });
        return userMapper.mapToUser(user);
    } catch (error) {
        console.error(error);
        throw new Error("database error kan geen user ophalen");
    }
};
const getUserByEmail = async ({ email }): Promise<User> => {
    try {
        const user = await database.user.findUnique({
            where: {
                email
            }
        });
        return userMapper.mapToUser(user);
    } catch (error) {
        console.error(error);
        throw new Error("database error kan geen user ophalen");
    }
};


const deleteUserById = async ({ id }) => {
    try {
        const user = await database.user.delete({
            where: {
                id
            }
        });
        return user;
    } catch (error) {
        console.error(error);
        throw new Error("database error kan geen user verwijderen");
    }
};

const UpdateUserById = async ({ id, email, name, firstName, password }): Promise<User> => {
    try {
        const user = await database.user.update({
            where: {
                id
            },
            data: {
                email,
                name,
                firstName,
                password
            }
        });

        return userMapper.mapToUser(user);
    } catch (error) {
        console.error(error);
        throw new Error("database error kan geen user updaten");
    }
};



export default { getAllUsers, addUser, getUserById, deleteUserById, UpdateUserById, getUserByEmail};
