import { writable } from "svelte/store";
import factory from "./_factory";
const { subscribe, set, update } = writable({}, () => {
  return () => {
    // Last subscriber removed
  };
});
const name = "users";
const idName = "id";
const load = factory.load({ name, set, update, idName });
const create = factory.create({
  name,
  set,
  update,
  idName,
  params: {
    messageSuccess: "Utilisateur créé avec succès",
    messageError: "Cet email existe déjà",
  },
});

const upd = factory.upd({
  name,
  set,
  update,
  idName,
  params: {
    messageSuccess: "Utilisateur modifié avec succès",
    messageError: "Echec de la modification de l'utilisateur ",
  },
});

const del = factory.del({ 
  name, 
  update, 
  idName,
  params: {
    messageSuccess: "Utilisateur supprimé",
    messageError: "Echec de la suppression de l'utilisateur",
  },
 });
export const users = { subscribe, load, create, upd, del};

export const ROLE_NAMES = Object.freeze({
  1: "Admin",
  2: "Manager",
  3: "Opérateur",
});

export const ROLE = Object.freeze({
  admin: 1,
  manager: 2,
  operator: 3
});