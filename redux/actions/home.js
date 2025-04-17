import Cookies from "universal-cookie";
import { getRequest } from "../../utils/request";
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

const cookie = new Cookies();

export const getHomeDataAction = (data) => (dispatch) => {
  getRequest(`home`, data, dispatch, GET_HOME_COMMON_DATA);
};

export const getProductDataAction = (slug, data) => (dispatch) => {
  getRequest(`product-type-products/${slug}`, data, dispatch, GET_PRODUCT_DATA);
};
export const getFeaturedDataAction = (slug, data) => (dispatch) => {
  getRequest(
    `featured-gallery-products/${slug}`,
    data,
    dispatch,
    GET_FEATURED_PRODUCT_DATA
  );
};

export const getFevoriteProductDataAction = (slug, data) => (dispatch) => {
  getRequest(
    `featured-gallery-products/${slug}`,
    data,
    dispatch,
    GET_FEVORITE_PRODUCT_DATA
  );
};
export const getDownloadProductDataAction = (slug, data) => (dispatch) => {
  getRequest(
    `most-download-products/${slug}`,
    data,
    dispatch,
    GET_DOWNLOAD_PRODUCT_DATA
  );
};

export const getWhyUsDataAction = (data) => (dispatch) => {
  getRequest(`why-uss`, data, dispatch, GET_WHY_US_DATA);
};

export const getTestmonailDataAction = (data) => (dispatch) => {
  getRequest(`testimonials`, data, dispatch, GET_TESTMONIAL_DATA);
};

export const getBlogsDataAction = (data) => (dispatch) => {
  getRequest(`latest-blogs`, data, dispatch, GET_BLOGS_DATA);
};
