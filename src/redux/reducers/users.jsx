const initialValue = {
  userData: [],
  addIdData: null,
  errMsg: [],
  isPending: false,
  isRejected: false,
  isFulfilled: false
};

const userReducer = (state = initialValue, action) => {
  switch (action.type) {
    case "LOGIN_USER_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "LOGIN_USER_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "LOGIN_USER_FULFILLED":
      localStorage.setItem("usertoken", action.payload.data.token);
      return {
        ...state,
        isPending: false,
        isFulfilled: true
      };
    case "GET_USERS_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "GET_USERS_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "GET_USERS_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        userData: action.payload.data
      };
    case "ADD_USERS_PENDING":
      return {
        ...state,
        isRejected: false,
        isFulfilled: false
      };
    case "ADD_USERS_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "ADD_USERS_FULFILLED":
      return {
        ...state,
        isPending: false,
        isAddFulfilled: true,
        addIdData: action.payload.data.result.insertId
      };
    case "EDIT_USERS_PENDING":
      return {
        ...state,
        isRejected: false,
        isFulfilled: false
      };
    case "EDIT_USERS_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "EDIT_USERS_FULFILLED":
      return {
        ...state,
        isPending: false,
        isAddFulfilled: true,
        addIdData: action.payload.data.result.insertId
      };
    case "DELETE_USERS_PENDING":
      return {
        ...state,
        isRejected: false,
        isFulfilled: false
      };
    case "DELETE_USERS_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "DELETE_USERS_FULFILLED":
      return {
        ...state,
        isPending: false,
        isAddFulfilled: true
      };
    default:
      return state;
  }
};

export default userReducer;
