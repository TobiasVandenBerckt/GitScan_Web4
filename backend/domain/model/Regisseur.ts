export class Regisseur {
    readonly id?: number;
    readonly name: string;
    readonly firstName: string;
    readonly info: string;

    constructor(regisseur: {
        id: number;
        name: string;
        firstName: string;
        info: string;
    }) {
        this.id = regisseur.id;
        this.name = regisseur.name;
        this.firstName = regisseur.firstName;
        this.info = regisseur.info;
    }
    equals({ id, name, firstName, info }: Regisseur): boolean {
        return (
            this.id === id &&
            this.name === name &&
            this.firstName === firstName &&
            this.info === info
        );
    }

    static create({
        id,
        name,
        firstName,
        info
    }: {
        id: number;
        name: string
        firstName: string;
        info: string;
    }): Regisseur {
        return new Regisseur({ id, name, firstName, info });
    }
}
