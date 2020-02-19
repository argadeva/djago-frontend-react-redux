import Axios from "axios";
import qs from "qs";

export const loginUser = user => {
  return {
    type: "LOGIN_USER",
    payload: Axios.post(process.env.REACT_APP_URL_API + "users/login", {
      email: user.email,
      password: user.password
    })
  };
};

export const getUsers = () => {
  return {
    type: "GET_USERS",
    payload: Axios.get(process.env.REACT_APP_URL_API + "users", {
      headers: { "x-access-token": localStorage.usertoken }
    })
  };
};

export const addUsers = data => {
  const bodyFormData = qs.stringify({
    name: data.name,
    email: data.email,
    password: data.password
  });
  return {
    type: "ADD_USERS",
    payload: Axios.post(process.env.REACT_APP_URL_API + "users", bodyFormData, {
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        "x-access-token": localStorage.usertoken
      }
    })
  };
};

export const editUsers = editData => {
  const bodyFormData = qs.stringify({
    name: editData.name,
    email: editData.email,
    password: editData.password
  });
  return {
    type: "EDIT_USERS",
    payload: Axios.patch(
      process.env.REACT_APP_URL_API + `users/${editData.id}`,
      bodyFormData,
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
          "x-access-token": localStorage.usertoken
        }
      }
    )
  };
};

export const deleteUsers = id => {
  return {
    type: "EDIT_CATEGORIES",
    payload: Axios.delete(process.env.REACT_APP_URL_API + `users/${id}`, {
      headers: { "x-access-token": localStorage.usertoken }
    })
  };
};
