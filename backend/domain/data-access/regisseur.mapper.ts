import { Regisseur } from "../model/Regisseur";
import { Regisseur as RegisseurPrisma } from "@prisma/client";

const mapToRegisseur = ({
  id,
  name,
  firstName,
  info
}: RegisseurPrisma): Regisseur =>
  new Regisseur({
    id, name, firstName, info
  });

const mapToRegisseurs = (regisseursPrisma: RegisseurPrisma[]): Regisseur[] => regisseursPrisma.map(mapToRegisseur);

export default { mapToRegisseur, mapToRegisseurs };

export { mapToRegisseur, mapToRegisseurs };
