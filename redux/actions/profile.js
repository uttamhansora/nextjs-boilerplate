import superagent from "superagent";
import Cookies from "universal-cookie";
import { getRequest } from "../../utils/request";
import { THROW_ERROR, THROW_SUCCESS } from "../types";
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
const cookie = new Cookies();
export const updateProfileAction = (data) => (dispatch) => {
  return superagent
    .post(`${process.env.BASE_URL}profile/update`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.success) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};
export const chnagePasswordAction = (data) => (dispatch) => {
  return superagent
    .post(`${process.env.BASE_URL}change-password`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.success) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};
export const deleteAccountAction = (router) => (dispatch) => {
  return superagent
    .post(`${process.env.BASE_URL}delete-my-account`)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.success) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          router.push("/");
          cookie.remove("user_token", {
            path: "/",
          });
          cookie.remove("user_info", {
            path: "/",
          });
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};
export const getFavouriteDataAction = (data) => (dispatch) => {
  getRequest(`favourites`, data, dispatch, GET_FAVOURITES_DADA);
};
export const deleteFavouriteDataAction = (id) => (dispatch) => {
  return superagent
    .delete(`${process.env.BASE_URL}delete-favourite/${id}`)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.success) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          getRequest(`favourites`, null, dispatch, GET_FAVOURITES_DADA);
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};
export const cancelSubscription = (id) => (dispatch) => {
  return superagent
    .post(`${process.env.BASE_URL}cancel-subscription-plan/${id}`)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.success) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          getRequest(`favourites`, null, dispatch, GET_FAVOURITES_DADA);
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};
export const getMyProductDataAction = (data) => (dispatch) => {
  getRequest(`my-products/index`, data, dispatch, GET_MY_PRODUCT_DATA);
};
export const deleteMyProductDataAction = (id) => (dispatch) => {
  return superagent
    .delete(`${process.env.BASE_URL}my-products/delete/${id}`)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.success) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          getRequest(`my-products/index`, null, dispatch, GET_MY_PRODUCT_DATA);
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};
export const getMyProductSaleDataAction = (data) => (dispatch) => {
  getRequest(
    `my-products/single-sales`,
    data,
    dispatch,
    GET_MY_PRODUCT_SALE_DATA
  );
};

export const getMyDownloadsDataAction = (data) => (dispatch) => {
  getRequest(`my-products/download-sales`, data, dispatch, GET_DOWNLOADS_DATA);
};
export const getWithdroalDataAction = (data) => (dispatch) => {
  getRequest(`my-withdraws`, data, dispatch, GET_WITHDROAL_DATA);
};
export const getDownloadsDataAction = (data) => (dispatch) => {
  getRequest(`my-downloads`, data, dispatch, GET_MY_DOWNLOADS_DATA);
};
export const getFollowingAction = (data) => (dispatch) => {
  getRequest(`get-following`, data, dispatch, GET_FOLLOWING_DATA);
};
export const addFollowAction = (data) => (dispatch) => {
  return superagent
    .post(`${process.env.BASE_URL}following-store-remove`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.success) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          getRequest(`get-following`, null, dispatch, GET_FOLLOWING_DATA);
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};
export const getBoardsAction = (data) => (dispatch) => {
  getRequest(`boards`, data, dispatch, GET_BOARDS_DATA);
};

export const createNewBoardAction =
  (data, showModal, setBoard) => (dispatch) => {
    return superagent
      .post(`${process.env.BASE_URL}board-store`)
      .send(data)
      .set("accept", "application/json")
      .set("Authorization", cookie.get("user_token"))
      .end((err, res) => {
        if (res) {
          if (res.body.success) {
            dispatch({ type: THROW_SUCCESS, payload: res.body.message });
            getRequest(`boards`, null, dispatch, GET_BOARDS_DATA);
            showModal(false);
            setBoard("");
          } else {
            dispatch({ type: THROW_ERROR, payload: res.body.message });
          }
        } else {
          dispatch({ type: THROW_ERROR, payload: err.data.message });
        }
      });
  };

export const deleteBoardAction = (id) => (dispatch) => {
  return superagent
    .delete(`${process.env.BASE_URL}board-delete/${id}`)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.success) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          getRequest(`boards`, null, dispatch, GET_BOARDS_DATA);
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};
export const editBoardAction = (data, id, showModal) => (dispatch) => {
  return superagent
    .post(`${process.env.BASE_URL}board-update/${id}`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.success) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          getRequest(`boards`, null, dispatch, GET_BOARDS_DATA);
          showModal(false);
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};
export const getBoardsDetailsAction = (uuid, slug, data) => (dispatch) => {
  getRequest(
    `board-products/${uuid}/${slug}`,
    data,
    dispatch,
    GET_BOARDS_DETAILS_DATA
  );
};
export const deleteBoardProductAction = (id, uuid, slug) => (dispatch) => {
  return superagent
    .delete(`${process.env.BASE_URL}delete-board-product/${id}`)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.success) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          getRequest(
            `board-products/${uuid}/${slug}`,
            null,
            dispatch,
            GET_BOARDS_DETAILS_DATA
          );
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};
export const getLoginDevicesAction = (data) => (dispatch) => {
  getRequest(`login-devices`, data, dispatch, GET_LOGIN_DEVICE_DATA);
};
export const getMyOrdersAction = (data) => (dispatch) => {
  getRequest(`my-order-list`, data, dispatch, GET_MY_ORDERS_DATA);
};
export const getMyPurchaseAction = (data) => (dispatch) => {
  getRequest(`my-purchase-list`, data, dispatch, GET_MY_ORDERS_DATA);
};
export const getMyWalletAction = (data) => (dispatch) => {
  getRequest(`wallet-money-setting`, data, dispatch, GET_MY_WALLET_DATA);
};
export const getMyDepositAction = (data) => (dispatch) => {
  getRequest(`wallet-deposit-history`, data, dispatch, GET_MY_DEPOSIT_DATA);
};
export const orderPdfAction = (id) => (dispatch) => {
  return superagent
    .get(`${process.env.BASE_URL}invoice-download/${id}`)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.success) {
          const link = document.createElement("a");
          link.href = res.body.data;
          link.click();
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};
export const orderProductDownloadAction = (id) => (dispatch) => {
  return superagent
    .get(`${process.env.BASE_URL}variation-download/${id}`)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.success) {
          const link = document.createElement("a");
          link.href = res.body.data;
          link.click();
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};
export const getMySubscriptionPlanAction = (data) => (dispatch) => {
  getRequest(
    `my-subscription-plan`,
    data,
    dispatch,
    GET_MY_SUBSCRIPTION_PLAN_DATA
  );
};
export const cancelSubscriptionAction = (id) => (dispatch) => {
  return superagent
    .post(`${process.env.BASE_URL}cancel-subscription-plan/${id}`)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.success) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          getRequest(
            `my-subscription-plan`,
            null,
            dispatch,
            GET_MY_SUBSCRIPTION_PLAN_DATA
          );
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};
export const addWithdroalCardAction =
  (data, actions, modalClose) => (dispatch) => {
    return superagent
      .post(`${process.env.BASE_URL}my-withdraw-card/store`)
      .send(data)
      .set("accept", "application/json")
      .set("Authorization", cookie.get("user_token"))
      .end((err, res) => {
        if (res) {
          if (res.body.success) {
            dispatch({ type: THROW_SUCCESS, payload: res.body.message });
            actions.resetForm({});
            modalClose(false);
          } else {
            dispatch({ type: THROW_ERROR, payload: res.body.message });
            actions.resetForm({});
            modalClose(false);
          }
        } else {
          dispatch({ type: THROW_ERROR, payload: err.data.message });
        }
      });
  };
export const withdroalAction = (data, actions, closeModal) => (dispatch) => {
  return superagent
    .post(`${process.env.BASE_URL}withdraw-request/store`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.success) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          actions.resetForm({});
          closeModal(false);
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
          closeModal(false);
          actions.resetForm({});
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};
export const getProductTypeCategoryAction = (id, data) => (dispatch) => {
  getRequest(
    `my-products/product-type-category/${id}`,
    data,
    dispatch,
    GET_PRODUCT_TYPE_CATEGORY
  );
};
export const myProductAction = (data, actions) => (dispatch) => {
  return superagent
    .post(`${process.env.BASE_URL}my-products/store`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.success) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          actions.resetForm({});
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
          // actions.resetForm({});
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};

export const myProductEditAction = (data, actions) => (dispatch) => {
  return superagent
    .post(`${process.env.BASE_URL}my-products/update`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.success) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          // actions.resetForm({});
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
          // actions.resetForm({});
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};

export const deviceLogOut = (id, router) => (dispatch) => {
  return superagent
    .post(`${process.env.BASE_URL}single-device-logout/${id}`)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.success) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          router.push("/account/devices");
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};