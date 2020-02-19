import Axios from "axios";

export const checkout = bodyFormData => {
  return {
    type: "CHECKOUT_ORDER",
    payload: Axios.post(
      process.env.REACT_APP_URL_API + "checkout/cart",
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

export const getCheckoutDetail = idCheckout => {
  return {
    type: "GET_CHECKOUT_DETAIL",
    payload: Axios.get(
      process.env.REACT_APP_URL_API + `checkout/${idCheckout}`,
      {
        headers: { "x-access-token": localStorage.usertoken }
      }
    )
  };
};

export const getCheckout = () => {
  return {
    type: "GET_CHECKOUT",
    payload: Axios.get(process.env.REACT_APP_URL_API + `checkout`, {
      headers: { "x-access-token": localStorage.usertoken }
    })
  };
};
