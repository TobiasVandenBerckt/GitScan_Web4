export class User {
    readonly id?: number;
    readonly email: string;
    readonly name: string;
    readonly firstName: string;
    readonly password: string;

    constructor(user: { id?: number; email: string; name: string; firstName: string; password: string; }) {
        this.id = user.id;
        this.email = user.email;
        this.name = user.name;
        this.firstName = user.firstName;
        this.password = user.password;
    }
    equals({ id, email, name, firstName, password }: User): boolean {
        return (this.id === id && this.email === email && this.name === name && this.firstName === firstName && this.password === password);
    }

    static create({ id, email, name, firstName, password }: {
        id?: number;
        email: string;
        name: string;
        firstName: string;
        password: string;
    }): User {
        return new User({ id, email, name, firstName, password });
    }
}


