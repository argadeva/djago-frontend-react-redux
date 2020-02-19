const initialValue = {
  checkoutData: [],
  checkoutDetailData: [],
  errMsg: [],
  isPending: false,
  isRejected: false,
  isFulfilled: false,
  isDetailFulfilled: false
};

const checkoutReducer = (state = initialValue, action) => {
  switch (action.type) {
    case "CHECKOUT_ORDER_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "CHECKOUT_ORDER_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "CHECKOUT_ORDER_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true
      };
    case "GET_CHECKOUT_DETAIL_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isDetailFulfilled: false
      };
    case "GET_CHECKOUT_DETAIL_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "GET_CHECKOUT_DETAIL_FULFILLED":
      return {
        ...state,
        isPending: false,
        isDetailFulfilled: true,
        checkoutDetailData: action.payload.data
      };
    case "GET_CHECKOUT_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "GET_CHECKOUT_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "GET_CHECKOUT_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        checkoutData: action.payload.data
      };
    default:
      return state;
  }
};

export default checkoutReducer;
