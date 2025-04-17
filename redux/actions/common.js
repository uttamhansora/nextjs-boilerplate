import superagent from "superagent";
import Cookies from "universal-cookie";
import { getRequest } from "../../utils/request";
import { THROW_ERROR, THROW_SUCCESS } from "../types";
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

const cookie = new Cookies();

export const getFooterDataAction = (data) => (dispatch) => {
  getRequest(`footer-details`, data, dispatch, GET_FOOTER_DATA);
};
export const getSettingsDataAction = (data) => (dispatch) => {
  getRequest(`setting`, data, dispatch, GET_SETTINGS_DATA);
};
export const getUserInfoDataAction = (data) => (dispatch) => {
  getRequest(`auth-status`, data, dispatch, GET_USER_INFO);
};
export const getBoardStoreAction = (data) => (dispatch) => {
  getRequest(`boards`, data, dispatch, GET_BOARD_STORE_DTAT);
};

export const getProductTypesAction = (data) => (dispatch) => {
  getRequest(`product-type`, data, dispatch, GET_PRODUCT_TYPE_DTAT);
};

export const handleFevourteAction =
  (data, steFev, count, setFavourite, favourite) => (dispatch) => {
    return superagent
      .post(`${process.env.BASE_URL}favourite-store`)
      .send(data)
      .set("accept", "application/json")
      .set("Authorization", cookie.get("user_token"))
      .end((err, res) => {
        if (res) {
          if (res.body.success) {
            dispatch({ type: THROW_SUCCESS, payload: res.body.message });
            if (steFev) {
              steFev(data.product_id);
            }

            if (count) {
              count(res.body.data.favourite_products_count);
              setFavourite(!favourite);
            }
          } else {
            dispatch({ type: THROW_ERROR, payload: res.body.message });
          }
        } else {
          dispatch({ type: THROW_ERROR, payload: err.data.message });
        }
      });
  };
export const addBoardProductAction = (data, setIsNewBoard) => (dispatch) => {
  return superagent
    .post(`${process.env.BASE_URL}add-board-product`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.success) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          setIsNewBoard(false);
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};

export const createNewBoardAction =
  (data, showData, setBoard) => (dispatch) => {
    return superagent
      .post(`${process.env.BASE_URL}board-store`)
      .send(data)
      .set("accept", "application/json")
      .set("Authorization", cookie.get("user_token"))
      .end((err, res) => {
        if (res) {
          if (res.body.success) {
            dispatch({ type: THROW_SUCCESS, payload: res.body.message });
            getRequest(`boards`, data, dispatch, GET_BOARD_STORE_DTAT);
            setBoard("");
            showData(true);
          } else {
            dispatch({ type: THROW_ERROR, payload: res.body.message });
          }
        } else {
          dispatch({ type: THROW_ERROR, payload: err.data.message });
        }
      });
  };

export const productDownloadAction = (id, countUpdate) => (dispatch) => {
  return superagent
    .get(`${process.env.BASE_URL}product-download/${id}`)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.success) {
          const link = document.createElement("a");
          link.href = res.body.data.downloadLink;
          link.click();
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          countUpdate(res.body.data.download_products_count);
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};

export const addProductCommentAction =
  (data, actions, newComment) => (dispatch) => {
    return superagent
      .post(`${process.env.BASE_URL}product-comment`)
      .send(data)
      .set("accept", "application/json")
      .set("Authorization", cookie.get("user_token"))
      .end((err, res) => {
        if (res) {
          if (res.body.success) {
            dispatch({ type: THROW_SUCCESS, payload: res.body.message });
            actions.resetForm({});

            newComment(res.body.data);
          } else {
            dispatch({ type: THROW_ERROR, payload: res.body.message });
          }
        } else {
          dispatch({ type: THROW_ERROR, payload: err.data.message });
        }
      });
  };

export const addReportProductAction = (data, closeModal) => (dispatch) => {
  return superagent
    .post(`${process.env.BASE_URL}product-report/store`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.success) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          closeModal(false);
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};

export const addFollowAction = (data, setFollow, follow) => (dispatch) => {
  return superagent
    .post(`${process.env.BASE_URL}following-store-remove`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.success) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          if (follow) {
            setFollow(!follow);
          }
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};
export const getSearchFilterAction = (data) => (dispatch) => {
  getRequest(`get-filter-products`, data, dispatch, GET_FILTER_PRODUCTS_DATA);
};

export const getCustomerProductsAction =
  (customer_id, type_id, data) => (dispatch) => {
    getRequest(
      `customer-products/${customer_id}/${type_id}`,
      data,
      dispatch,
      GET_CUSTOMER_PRODUCTS_DATA
    );
  };
export const getCustomerFollowerAction = (customer_id, data) => (dispatch) => {
  getRequest(
    `customer-follower/${customer_id}`,
    data,
    dispatch,
    GET_CUSTOMER_FOLLOWER_DATA
  );
};
export const getCustomerFollowingAction = (customer_id, data) => (dispatch) => {
  getRequest(
    `customer-following/${customer_id}`,
    data,
    dispatch,
    GET_CUSTOMER_FOLLOWING_DATA
  );
};
export const getUserProductsAction = (user_id, type_id, data) => (dispatch) => {
  getRequest(
    `user-products/${user_id}/${type_id}`,
    data,
    dispatch,
    GET_USER_PRODUCTS_DATA
  );
};
export const getUserFollowerAction = (customer_id, data) => (dispatch) => {
  getRequest(
    `user-follower/${customer_id}`,
    data,
    dispatch,
    GET_USER_FOLLOWER_DATA
  );
};

export const addReportUserAction = (data, closeModal) => (dispatch) => {
  return superagent
    .post(`${process.env.BASE_URL}member-report/store`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.success) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          closeModal(false);
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};
export const getSearchBlogAction = (data) => (dispatch) => {
  getRequest(`search-blog-list`, data, dispatch, GET_SEARCH_BLOG_DATA);
};
export const addBlogCommentAction =
  (data, setComment, setBlogComment) => (dispatch) => {
    return superagent
      .post(`${process.env.BASE_URL}blog-comment/store`)
      .send(data)
      .set("accept", "application/json")
      .set("Authorization", cookie.get("user_token"))
      .end((err, res) => {
        if (res) {
          if (res.body.success) {
            dispatch({ type: THROW_SUCCESS, payload: res.body.message });
            setComment("");
            setBlogComment(res.body.data.blogComments);
          } else {
            dispatch({ type: THROW_ERROR, payload: res.body.message });
          }
        } else {
          dispatch({ type: THROW_ERROR, payload: err.data.message });
        }
      });
  };
export const addBlogReplayAction =
  (data, setComment, setBlogComment, setShow) => (dispatch) => {
    return superagent
      .post(`${process.env.BASE_URL}blog-comment-reply/store`)
      .send(data)
      .set("accept", "application/json")
      .set("Authorization", cookie.get("user_token"))
      .end((err, res) => {
        if (res) {
          if (res.body.success) {
            dispatch({ type: THROW_SUCCESS, payload: res.body.message });
            setComment("");
            setBlogComment(res.body.data.blogComments);
            setShow(false);
          } else {
            dispatch({ type: THROW_ERROR, payload: res.body.message });
          }
        } else {
          dispatch({ type: THROW_ERROR, payload: err.data.message });
        }
      });
  };
export const contactAction = (data, actions, btnDisabled) => (dispatch) => {
  return superagent
    .post(`${process.env.BASE_URL}contact-us/store`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.success) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          actions.resetForm({});
          btnDisabled(false);
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
          btnDisabled(false);
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};
export const subscriberAction = (data, actions, btnDisabled) => (dispatch) => {
  return superagent
    .post(`${process.env.BASE_URL}subscriber`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.success) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          actions.resetForm({});
          btnDisabled(false);
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
          btnDisabled(false);
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};

export const getGatewayNowAction = (data, setShow) => (dispatch) => {
  return superagent
    .post(`${process.env.BASE_URL}pay`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.success) {
          dispatch({ type: GET_PAYMENT_NOW_DATA, payload: res.body });
          setShow(true);
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};

export const getApplyCouponAction = (data) => (dispatch) => {
  return superagent
    .post(`${process.env.BASE_URL}apply-coupon`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.success) {
          dispatch({ type: GET_PAYMENT_COUPON_DATA, payload: res.body });
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};
export const checkoutAction = (data, router) => (dispatch) => {
  return superagent
    .post(`${process.env.BASE_URL}checkout`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.success) {
          if (res.body.data.self_redirect) {
            dispatch({ type: THROW_SUCCESS, payload: res.body.message });
            router.push("/thank-you");
          } else {
            const link = document.createElement("a");
            link.href = res.body.data.checkout_url;
            link.click();
          }
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};
export const bankCheckoutAction = (data, router) => (dispatch) => {
  return superagent
    .post(`${process.env.BASE_URL}bank-payment`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.success) {
          router.push("/thank-you");
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};
export const walletCheckoutAction = (data, router) => (dispatch) => {
  return superagent
    .post(`${process.env.BASE_URL}wallet-payment`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.success) {
          router.push("/thank-you");
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};
export const getPaymentVerifyAction =
  (id, payer_id, payment_id, type, router) => (dispatch) => {
    return superagent
      .get(
        `${process.env.BASE_URL}payment-verify?id=${id}&payer_id=${payer_id}&payment_id=${payment_id}&type=${type}`
      )
      .set("accept", "application/json")
      .set("Authorization", cookie.get("user_token"))
      .end((err, res) => {
        if (res) {
          if (res.body.success) {
            router.push("/thank-you");
            dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          } else {
            router.push("/cancel-payment");
            dispatch({ type: THROW_ERROR, payload: res.body.message });
          }
        } else {
          dispatch({ type: THROW_ERROR, payload: err.data.message });
        }
      });
  };
export const getStateAction = (country_id, data) => (dispatch) => {
  getRequest(`country-states/${country_id}`, data, dispatch, GET_STATE_DATA);
};
export const getCityAction = (state_id, data) => (dispatch) => {
  getRequest(`state-cities/${state_id}`, data, dispatch, GET_CITY_DATA);
};
export const contributorAction = (data, actions, hideModal) => (dispatch) => {
  return superagent
    .post(`${process.env.BASE_URL}be-a-contributor/store`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.success) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          actions.resetForm({});
          hideModal(false);
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
          hideModal(false);
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};
