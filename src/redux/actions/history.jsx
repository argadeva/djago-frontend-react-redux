import Axios from "axios";

export const getHistory = () => {
  return {
    type: "GET_HISTORY",
    payload: Axios.get(process.env.REACT_APP_URL_API + `history`, {
      headers: { "x-access-token": localStorage.usertoken }
    })
  };
};
