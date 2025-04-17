import {
  GET_BOARDS_DATA,
  GET_BOARDS_DETAILS_DATA,
  GET_DOWNLOADS_DATA,
  GET_FAVOURITES_DADA,
  GET_FOLLOWING_DATA,
  GET_LOGIN_DEVICE_DATA,
  GET_MY_DEPOSIT_DATA,
  GET_MY_DOWNLOADS_DATA,
  GET_MY_ORDERS_DATA,
  GET_MY_PRODUCT_DATA,
  GET_MY_PRODUCT_SALE_DATA,
  GET_MY_SUBSCRIPTION_PLAN_DATA,
  GET_MY_WALLET_DATA,
  GET_PRODUCT_TYPE_CATEGORY,
  GET_WITHDROAL_DATA,
} from "../types/profile";

const init = {
  favourites: {},
  products: {},
  my_sales: {},
  all_downloads: {},
  my_withdrow: {},
  downloads: {},
  following: {},
  boards: [],
  board_details: {},
  login_devices: {},
  orders: {},
  my_subscripion: {},
  my_wallet: {},
  deposit: {},
  type_category: [],
};

const profileReducers = (state = init, action) => {
  switch (action.type) {
    case GET_FAVOURITES_DADA: {
      return {
        ...state,
        favourites: action.payload.data,
      };
    }
    case GET_MY_PRODUCT_DATA: {
      return {
        ...state,
        products: action.payload.data,
      };
    }
    case GET_MY_PRODUCT_SALE_DATA: {
      return {
        ...state,
        my_sales: action.payload.data,
      };
    }
    case GET_DOWNLOADS_DATA: {
      return {
        ...state,
        all_downloads: action.payload.data,
      };
    }
    case GET_WITHDROAL_DATA: {
      return {
        ...state,
        my_withdrow: action.payload.data.withdraws,
      };
    }
    case GET_MY_DOWNLOADS_DATA: {
      return {
        ...state,
        downloads: action.payload.data,
      };
    }
    case GET_FOLLOWING_DATA: {
      return {
        ...state,
        following: action.payload.data,
      };
    }
    case GET_BOARDS_DATA: {
      return {
        ...state,
        boards: action.payload.data,
      };
    }
    case GET_BOARDS_DETAILS_DATA: {
      return {
        ...state,
        board_details: action.payload.data,
      };
    }
    case GET_LOGIN_DEVICE_DATA: {
      return {
        ...state,
        login_devices: action.payload.data,
      };
    }
    case GET_MY_ORDERS_DATA: {
      return {
        ...state,
        orders: action.payload.data,
      };
    }
    case GET_MY_SUBSCRIPTION_PLAN_DATA: {
      return {
        ...state,
        my_subscripion: action.payload.data,
      };
    }
    case GET_MY_WALLET_DATA: {
      return {
        ...state,
        my_wallet: action.payload.data,
      };
    }
    case GET_MY_DEPOSIT_DATA: {
      return {
        ...state,
        deposit: action.payload.data,
      };
    }
    case GET_PRODUCT_TYPE_CATEGORY: {
      return {
        ...state,
        type_category: action.payload.data,
      };
    }
    default:
      return state;
  }
};

export default profileReducers;
