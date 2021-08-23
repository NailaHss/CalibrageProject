import { writable } from "svelte/store";
const { subscribe, update } = writable(
  {
    headers: { "Content-Type": "application/json" },
  },
  () => {
    return () => {};
  }
);
const setAuth = (token) => {  //fonction qui enregistre le token == lors de la connection
  window.localStorage.setItem("token", token);
  update((val) => ({
    ...val,
    headers: { ...val.headers, Authorization: `Bearer ${token}` },
  }));
};

const removeAuth = () => {  //fct qui supprime le token == deconnection
  window.localStorage.removeItem("token")
  update((val) => {
    const newVal = {...val}
    delete newVal.headers.Authorization
    return newVal
  });
}
/*
  @params {string} message
  @params {string} type {notify, error, alert}
*/

export const client = { subscribe, setAuth, removeAuth };