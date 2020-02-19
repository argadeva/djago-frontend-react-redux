import Axios from "axios";

export const getCategories = () => {
  return {
    type: "GET_CATEGORIES",
    payload: Axios.get(process.env.REACT_APP_URL_API + "categories", {
      headers: { "x-access-token": localStorage.usertoken }
    })
  };
};

export const addCategories = data => {
  return {
    type: "ADD_CATEGORIES",
    payload: Axios.post(
      process.env.REACT_APP_URL_API + "categories",
      { name: data },
      {
        headers: { "x-access-token": localStorage.usertoken }
      }
    )
  };
};

export const editCategories = editData => {
  return {
    type: "EDIT_CATEGORIES",
    payload: Axios.patch(
      process.env.REACT_APP_URL_API + `categories/${editData.id}`,
      { name: editData.name },
      {
        headers: { "x-access-token": localStorage.usertoken }
      }
    )
  };
};

export const deleteCategories = id => {
  return {
    type: "DELETE_CATEGORIES",
    payload: Axios.delete(process.env.REACT_APP_URL_API + `categories/${id}`, {
      headers: { "x-access-token": localStorage.usertoken }
    })
  };
};
