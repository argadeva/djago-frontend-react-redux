const initialValue = {
  productData: [],
  paginationData: [],
  addIdData: "",
  sort: "",
  page: "",
  errMsg: [],
  isPending: false,
  isRejected: false,
  isFulfilled: false
};

const productsReducer = (state = initialValue, action) => {
  switch (action.type) {
    case "GET_PRODUCTS_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "GET_PRODUCTS_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "GET_PRODUCTS_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        productData: action.payload.data
      };
    case "DELETE_PRODUCTS_PENDING":
      return {
        ...state,
        isRejected: false,
        isFulfilled: false
      };
    case "DELETE_PRODUCTS_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "DELETE_PRODUCTS_FULFILLED":
      return {
        ...state,
        isPending: false,
        isAddFulfilled: true
      };
    case "ADD_PRODUCTS_PENDING":
      return {
        ...state,
        isRejected: false,
        isFulfilled: false
      };
    case "ADD_PRODUCTS_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "ADD_PRODUCTS_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        addIdData: action.payload.data.result.insertId
      };
    case "EDIT_PRODUCTS_PENDING":
      return {
        ...state,
        isRejected: false,
        isFulfilled: false
      };
    case "EDIT_PRODUCTS_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "EDIT_PRODUCTS_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true
      };
    case "GET_PRODUCTS_PAGINATION_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "GET_PRODUCTS_PAGINATION_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "GET_PRODUCTS_PAGINATION_FULFILLED":
      const url = action.payload.config.url;
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        paginationData: action.payload.data,
        page: action.payload.data.page,
        sort: url.substr(url.lastIndexOf("/") + 1)
      };
    default:
      return state;
  }
};

export default productsReducer;
