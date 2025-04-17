import {
  GET_BLOGS_DATA,
  GET_DOWNLOAD_PRODUCT_DATA,
  GET_FEATURED_PRODUCT_DATA,
  GET_FEVORITE_PRODUCT_DATA,
  GET_HOME_COMMON_DATA,
  GET_PRODUCT_DATA,
  GET_TESTMONIAL_DATA,
  GET_WHY_US_DATA,
} from "../types/home";

const init = {
  home_default_data: {},
  get_products: [],
  featured_products: [],
  download_products: [],
  fevorite_products: [],
  why_us: {},
  testmonial: {},
  blog_data: {},
};

const homeReducers = (state = init, action) => {
  switch (action.type) {
    case GET_HOME_COMMON_DATA: {
      return {
        ...state,
        home_default_data: action.payload.data,
      };
    }
    case GET_PRODUCT_DATA: {
      return {
        ...state,
        get_products: action.payload.data.products,
      };
    }
    case GET_FEATURED_PRODUCT_DATA: {
      return {
        ...state,
        featured_products: action.payload.data?.products,
      };
    }
    case GET_DOWNLOAD_PRODUCT_DATA: {
      return {
        ...state,
        download_products: action.payload.data?.products,
      };
    }
    case GET_FEVORITE_PRODUCT_DATA: {
      return {
        ...state,
        fevorite_products: action.payload.data?.products,
      };
    }
    case GET_WHY_US_DATA: {
      return {
        ...state,
        why_us: action.payload.data,
      };
    }
    case GET_TESTMONIAL_DATA: {
      return {
        ...state,
        testmonial: action.payload.data,
      };
    }
    case GET_BLOGS_DATA: {
      return {
        ...state,
        blog_data: action.payload.data,
      };
    }
    default:
      return state;
  }
};

export default homeReducers;
