import Axios from "axios";

export const getProducts = () => {
  return {
    type: "GET_PRODUCTS",
    payload: Axios.get(process.env.REACT_APP_URL_API + "products/onstock", {
      headers: { "x-access-token": localStorage.usertoken }
    })
  };
};

export const addProducts = editData => {
  const bodyFormData = new FormData();
  bodyFormData.append("name", editData.name);
  bodyFormData.append("description", editData.description);
  bodyFormData.append("price", editData.price);
  bodyFormData.append("stock", editData.stock);
  bodyFormData.append("category_id", editData.category_id);
  bodyFormData.append("image", editData.image);
  return {
    type: "ADD_PRODUCTS",
    payload: Axios.post(
      process.env.REACT_APP_URL_API + "products",
      bodyFormData,
      {
        headers: {
          "content-type": "multipart/form-data",
          "x-access-token": localStorage.usertoken
        }
      }
    )
  };
};

export const editProducts = editData => {
  console.log(editData.category_id);

  const bodyFormData = new FormData();
  bodyFormData.append("name", editData.name);
  bodyFormData.append("description", editData.description);
  bodyFormData.append("price", editData.price);
  bodyFormData.append("stock", editData.stock);
  bodyFormData.append("category_id", editData.category_id);
  bodyFormData.append("image", editData.image);
  return {
    type: "EDIT_PRODUCTS",
    payload: Axios.patch(
      process.env.REACT_APP_URL_API + `products/${editData.id}`,
      bodyFormData,
      {
        headers: {
          "content-type": "multipart/form-data",
          "x-access-token": localStorage.usertoken
        }
      }
    )
  };
};

export const deleteProducts = id => {
  return {
    type: "DELETE_PRODUCTS",
    payload: Axios.delete(process.env.REACT_APP_URL_API + `products/${id}`, {
      headers: { "x-access-token": localStorage.usertoken }
    })
  };
};

export const paginationProducts = (page, sort) => {
  return {
    type: "GET_PRODUCTS_PAGINATION",
    payload: Axios.get(
      process.env.REACT_APP_URL_API + `products/pagination/${page}/${sort}`,
      {
        headers: { "x-access-token": localStorage.usertoken }
      }
    )
  };
};
