import { User as UserPrisma } from "@prisma/client";
import { User } from "../model/User";

const mapToUser = ({
    id,
    email,
    name,
    firstName,
    password
}: UserPrisma): User => new User({ id, email, name, firstName, password });

const mapToUsers = (usersPrisma: UserPrisma[]): User[] => usersPrisma.map(mapToUser);

export default { mapToUser, mapToUsers };
