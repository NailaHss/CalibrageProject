import { loadData, query } from "../network/query";
const LoadMode = Object.freeze({
  keep: "keep",
  replace: "replace",
  append: "append",
});

const load = ({ name, set, update, idName, loadMode, params }) => {
  loadMode = loadMode || LoadMode.keep;
  return () => {
    // await timeout(2000);
    update(async (val) => {
      let data = {};
      if (Object.values(val).length > 0 && loadMode == LoadMode.keep) {
        await new Promise((resolve, _) => {
          resolve(0);
        });
        data = val;
      } else {
        data = await loadData({ name, idName, params });
      }
      if (!data) {
        return;
      }
      switch (loadMode) {
        case LoadMode.replace:
          set(data);
          break;
        case LoadMode.append:
          set({ ...val, ...data });
          break;
        case LoadMode.keep:
          set(data);
          break;
      }
    });
  };
};

const create = ({ name, update, idName, params }) => {
  return async (data) => {
    const res = await query(name, { ...params, method: "POST", data: data });
    if (!res.hasError) {
      update((val) => {
        const newVal = { ...val };
        newVal[res.data[idName]] = res.data;
        return newVal;
      });
      return true;
    }
    return false;
  };
};

const upd = ({ name, update, idName, params }) => {
  return async (data) => {
    const id = data[idName];
    const res = await query(name+`/${id}`, { ...params, method: "PATCH", data: data });
    if (!res.hasError) {
      update((val) => {
        const newVal = { ...val };
        newVal[res.data[idName]]=res.data;
        return newVal;
      });
      return true;
    }
    return false;
  };
};

const del = ({ name, update, idName, params }) => {
  return async (instance) => {
    const id = instance[idName];
    const res = await query(name + `/${id}`, {
      ...params,
      method: "DELETE",
    });
    if (!res.hasError) {
      update((val) => {
        const newVal = { ...val };
        delete newVal[id];
        return newVal;
      });
      return true;
    }
    return false;
  };
};

export default { load, create, upd, del, LoadMode };
