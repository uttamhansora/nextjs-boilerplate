import {
  GET_BOARD_STORE_DTAT,
  GET_CITY_DATA,
  GET_CUSTOMER_FOLLOWER_DATA,
  GET_CUSTOMER_FOLLOWING_DATA,
  GET_CUSTOMER_PRODUCTS_DATA,
  GET_FILTER_PRODUCTS_DATA,
  GET_FOOTER_DATA,
  GET_PAYMENT_COUPON_DATA,
  GET_PAYMENT_NOW_DATA,
  GET_PRODUCT_TYPE_DTAT,
  GET_SEARCH_BLOG_DATA,
  GET_SETTINGS_DATA,
  GET_STATE_DATA,
  GET_USER_FOLLOWER_DATA,
  GET_USER_INFO,
  GET_USER_PRODUCTS_DATA,
} from "../types/common";

const init = {
  footer_info: {},
  settings: {},
  user_info: {},
  board_data: [],
  product_types: [],
  search_data: {},
  customer_products: {},
  customer_followers: {},
  customer_following: {},
  user_products: {},
  user_followers: {},
  get_search_blog: [],
  gateway_now: {},
  state: [],
  city: [],
};

const commonReducers = (state = init, action) => {
  switch (action.type) {
    case GET_FOOTER_DATA: {
      return {
        ...state,
        footer_info: action.payload.data,
      };
    }
    case GET_SETTINGS_DATA: {
      return {
        ...state,
        settings: action.payload.data,
      };
    }
    case GET_USER_INFO: {
      return {
        ...state,
        user_info: action.payload.data,
      };
    }
    case GET_BOARD_STORE_DTAT: {
      return {
        ...state,
        board_data: action.payload.data,
      };
    }
    case GET_PRODUCT_TYPE_DTAT: {
      return {
        ...state,
        product_types: action.payload.data,
      };
    }
    case GET_FILTER_PRODUCTS_DATA: {
      return {
        ...state,
        search_data: action.payload.data,
      };
    }
    case GET_CUSTOMER_PRODUCTS_DATA: {
      return {
        ...state,
        customer_products: action.payload.data,
      };
    }
    case GET_CUSTOMER_FOLLOWER_DATA: {
      return {
        ...state,
        customer_followers: action.payload.data,
      };
    }
    case GET_CUSTOMER_FOLLOWING_DATA: {
      return {
        ...state,
        customer_following: action.payload.data,
      };
    }
    case GET_USER_PRODUCTS_DATA: {
      return {
        ...state,
        user_products: action.payload.data,
      };
    }
    case GET_USER_FOLLOWER_DATA: {
      return {
        ...state,
        user_followers: action.payload.data,
      };
    }
    case GET_SEARCH_BLOG_DATA: {
      return {
        ...state,
        get_search_blog: action.payload.data,
      };
    }
    case GET_PAYMENT_NOW_DATA: {
      return {
        ...state,
        gateway_now: action.payload.data,
      };
    }
    case GET_PAYMENT_COUPON_DATA: {
      return {
        ...state,
        gateway_now: {
          ...state.gateway_now,
          grand_total: action.payload.data.grand_total,
          discount: action.payload.data.discount,
          total: action.payload.data.total,
        },
      };
    }
    case GET_STATE_DATA: {
      return {
        ...state,
        state: action.payload.data,
      };
    }
    case GET_CITY_DATA: {
      return {
        ...state,
        city: action.payload.data,
      };
    }
    default:
      return state;
  }
};

export default commonReducers;
