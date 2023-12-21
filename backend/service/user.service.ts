import { User } from "../domain/model/User";
import userDB from "../domain/data-access/User.db";
import { userInput } from "../types/index";
import bcrypt, { hash } from 'bcrypt';
import { argon2d } from "argon2";
import jwt from 'jsonwebtoken';

const getAllUsers = async (): Promise<User[]> => {
    try {
        const users = await userDB.getAllUsers();
        return users;
    } catch (error) {
        throw new Error(error);
    }
}

const addUser = async ({ email, name, firstName, password }: userInput): Promise<User> => {
    if (!email || !name || !firstName || !password) {
        throw new Error("Je hebt een verplicht veld niet ingevuld");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        return await userDB.addUser({
            email: String(email),
            name: String(name),
            firstName: String(firstName),
            password: hashedPassword
        });
    }
    catch (error) {
        throw new Error(error);
    }
}

const getUserById = async (id: number): Promise<User> => {
    if (Number.isNaN(id)) {
        throw new Error("id is geen nummer");
    }
    try {
        const user = await userDB.getUserById({ id: id });
        if (!user) {
            throw new Error("Deze user bestaat niet");
        }
        return user;
    } catch (error) {
        throw new Error(error);
    }
}
const getUserByEmail = async (email: string): Promise<User> => {
    if (!email) {
        throw new Error("Je hebt een verplicht veld niet ingevuld");
    }
    try {
        const user = await userDB.getUserByEmail({ email: email });
        if (!user) {
            throw new Error("Deze user bestaat niet");
        }
        return user;
    } catch (error) {
        throw new Error(error);
    }
}

const deleteUserById = async (id: number): Promise<void> => {
    if (Number.isNaN(id)) {
        throw new Error("id is geen nummer");
    }
    const user = await userDB.getUserById({ id: id });
    if (!user) {
        throw new Error("Deze user bestaat niet");
    }
    try {
        await userDB.deleteUserById({ id: id });
    } catch (error) {
        throw new Error(error);
    }
}

const updateUserById = async ({ id, email, name, firstName, password }: userInput): Promise<User> => {
    if (!email || !name || !firstName || !password) {
        throw new Error("Je hebt een verplicht veld niet ingevuld");
    }
    
    const hashedPassword = await bcrypt.hash(password, 10); 

    const user = await userDB.getUserById({ id });
    try {
        return await userDB.UpdateUserById({
            id,
            email,
            name,
            firstName,
            password: hashedPassword,
        });
    } catch (error) {
        throw new Error(error);
    }
};

const authenticate = async ({ email, password }: userInput): Promise<string> => { 
    const user = await userDB.getUserByEmail( { email } );
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
    throw new Error('Incorrect password. ');
    }
    return generateJwtToken(email);

};

const jwtSecret = process.env.JWT_SECRET;

const generateJwtToken = (email: string): string => {
    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'ADMIN' }
    try {
        return jwt.sign({ email }, jwtSecret, options);
    } catch (error) {
        console.log(error); 
        throw new Error('Error generating JWT token, see server log for details.');
};

};

export default { getAllUsers, addUser, getUserById, deleteUserById, updateUserById, getUserByEmail, authenticate }

