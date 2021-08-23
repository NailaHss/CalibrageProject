import { client } from "./client";
import { get } from "svelte/store";
import { notifier } from "smelte";
import ENDPOINT from "./endpoint";
const getErrorMessage = (statusCode) => {
  switch (statusCode) {
    case 600:
      return "Impossible de joindre le serveur";
    case 404:
      return "Ressource introuvable";
    case 500:
      return "Le serveur a rencontré une erreur";
    case 422:
      return "Requête malformée";
    default:
      return "Une erreur est survenue";
  }
};

const showMessage = (message, type) => {
  if (message && ["notify", "error", "alert"].includes(type)) {
    notifier[type](message);
  }
};
/**
 * @param {string} url
 * @param {object} params with filters, method, headers, data
 */
export const query = async (url, params) => {
  params = params || {};
  const method = params.method || "GET";
  const filters = JSON.stringify(params.filters) || "";
  const headers = params.headers || {};
  const data = params.data;
  let res, code;
  const querySep = filters.length > 0 ? `?filter=` : "";
  const fullUrl = encodeURI(`${ENDPOINT}/${url}${querySep}${filters}`)
  
  try {
      
    res = await fetch( fullUrl, {
      method: method,
      body: JSON.stringify(data),
      headers: { ...get(client).headers, ...headers, ...(params.download ? {responseType: 'blob'} :{}) },
    });
  
    if (params.download) {
      const blob = await res.blob()
      const windowUrl = window.URL || window.webkitURL;
      const url = windowUrl.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      var dateTime= new Date();
      var dateTimeStr = dateTime.getDate()+"/"+ dateTime.getMonth() + "/" + dateTime.getFullYear() + "_" + dateTime.getHours() + "-" + dateTime.getMinutes() + "-" + dateTime.getSeconds();
      anchor.download = 'mesures_' + dateTimeStr + '.csv';
      
      anchor.click();
      windowUrl.revokeObjectURL(url);
      return
    }

    code = res.status;
  } catch (e) {
    console.log(e);
    code = 600;
  }
  if (code < 400) {
    showMessage(params.messageSuccess, "notify");
    return {
      hasError: false,
      data: method === "GET" || method === "POST" ? await res.json() : data,
    };
  } else {
    const message = getErrorMessage(code);
    showMessage(params.messageError, "error");
    return {
      hasError: true,
      error: {
        code: code,
        message: message,
      },
    };
  }
};

export const loadData = async ({ name, idName, params }) => {
  const data = {};
  idName = idName || "id";
  const res = await query(name, params);
  if (!res.hasError) {
    for (const instance of res.data) {
      data[instance[idName]] = instance;
    }
    return data;
  }
  console.log(res);
  return null;
};

