export class Actor {
    readonly id?: number;
    readonly name: string;
    readonly firstName: string;
    readonly info: string;

    constructor(actor: { id: number; name: string; firstName: string; info: string; }) {
        this.id = actor.id;
        this.name = actor.name;
        this.firstName = actor.firstName;
        this.info = actor.info;
    }
    equals({ id, name, firstName, info }: Actor): boolean {
        return (this.id === id && this.name === name && this.firstName === firstName && this.info === info);
    }

    static create({ id, name, firstName, info }: {
        id: number;
        name: string;
        firstName: string;
        info: string;

    }): Actor {
        return new Actor({ id, name, firstName, info });
    }

}

