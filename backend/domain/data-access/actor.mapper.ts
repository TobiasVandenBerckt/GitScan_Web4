import { Actor } from '../model/Actor';
import { Actor as ActorPrisma } from '@prisma/client';

const mapToActor = ({
    id,
    name,
    firstName,
    info
}: ActorPrisma): Actor =>
    new Actor({ id, name, firstName, info });

const mapToActors = (actorsPrisma: ActorPrisma[]): Actor[] => actorsPrisma.map(mapToActor);

export default { mapToActor, mapToActors }

export { mapToActor, mapToActors }