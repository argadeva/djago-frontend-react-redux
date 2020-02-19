const initialValue = {
  categoriesData: [],
  addIdData: null,
  errMsg: [],
  isPending: true,
  isRejected: false,
  isFulfilled: false
};

const userReducer = (state = initialValue, action) => {
  switch (action.type) {
    case "GET_CATEGORIES_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "GET_CATEGORIES_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "GET_CATEGORIES_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        categoriesData: action.payload.data
      };
    case "ADD_CATEGORIES_PENDING":
      return {
        ...state,
        isRejected: false,
        isFulfilled: false
      };
    case "ADD_CATEGORIES_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "ADD_CATEGORIES_FULFILLED":
      return {
        ...state,
        isPending: false,
        isAddFulfilled: true,
        addIdData: action.payload.data.result.insertId
      };
    case "EDIT_CATEGORIES_PENDING":
      return {
        ...state,
        isRejected: false,
        isFulfilled: false
      };
    case "EDIT_CATEGORIES_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "EDIT_CATEGORIES_FULFILLED":
      return {
        ...state,
        isPending: false,
        isAddFulfilled: true,
        addIdData: action.payload.data.result.insertId
      };
    case "DELETE_CATEGORIES_PENDING":
      return {
        ...state,
        isRejected: false,
        isFulfilled: false
      };
    case "DELETE_CATEGORIES_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "DELETE_CATEGORIES_FULFILLED":
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
