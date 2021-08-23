import { query } from "../network/query";
import { client } from "../network/client";
import { get } from "svelte/store";
import { writable } from "svelte/store";
//import * as nodeoutlook from 'nodejs-nodemailer-outlook';


const { subscribe, set, update } = writable({}, () => {
  return () => {
    // Last subscriber removed
  };
});
//export let userRole;
const urlname = "users";


const login = async (email, password) => {
  const res = await query(`${urlname}/login`, {
    method: "POST",
    data: { email, password },
    messageError: "Email ou mot-de-passe incorrect"
  });
  //console.log(res.data);
  if (!res.hasError && res.data) {
    set(res.data);
    client.setAuth(res.data.token);
    return true;
  }

  return false;
};

const logout = () => {
  client.removeAuth()
  set({})
}
const verifyToken = async () => {
  const token = window.localStorage.getItem("token");
  if (!token) return false;
  const res = await query(`${urlname}/current`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.hasError && res.data) {
    //console.log("current "+res.data.role)
    set(res.data);
    client.setAuth(token);
    return true;
  }
  return false;
};

const updateProfil = async ({id, name, email, role}) => {
  const res = await query(`${urlname}/${id}`, {
    method: "PATCH",
    data: {id, name, email, role},
    messageError: "Impossible de modifier les informations de cet utilisateur",
    messageSuccess: "Profil modifié avec succès"
  });
  if (!res.hasError && res.data) {
    update(data=>({...data, id: id, name: name, email: email, role: role}))
    return true;
  } 
  return false;
}

const updateName = async (fullName) => {
  const current = get({subscribe})
  if (current.name == fullName) return false;
  const res = await query(`${urlname}/${current.id}`, {
    method: "PATCH",
    data: {name: fullName},
    messageError: "Une erreur est survenue",
    messageSuccess: "Nom modifié avec succès"
  });
  if (!res.hasError && res.data) {
    update(data=>({...data, name: fullName}))
    return true;
  }
  return false;
}

const changePassword = async ({password, newPassword, refreshToken}) => {
  if (password === newPassword) return false;
  const current = get({subscribe})
  const res = await query(`${urlname}/change-password`, {
    method: "POST",
    data: {email: current.email, password, newPassword, refreshToken},
    messageError: "Le mot-de-passe n'a pas pu être changé",
    messageSuccess: "Mot-de-passe changé avec succès"
  });
  if (!res.hasError && res.data) {
    client.setAuth(res.data.token)
    return true;
  } 
  return false;
}



export const user = { subscribe, login, logout, verifyToken, updateProfil, updateName, changePassword};