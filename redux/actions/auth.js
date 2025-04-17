import superagent from "superagent";
import Cookies from "universal-cookie";
import { writeCookie } from "../../utils/commonFunctions";
import { THROW_ERROR, THROW_SUCCESS } from "../types";
const cookie = new Cookies();
export const loginAction =
  (data, actions, route, btnDisabled) => (dispatch) => {
    return superagent
      .post(`${process.env.BASE_URL}login`)
      .send(data)
      .set("accept", "application/json")
      .set("Authorization", cookie.get("user_token"))
      .end((err, res) => {
        if (res) {
          if (res.body.success) {
            dispatch({ type: THROW_SUCCESS, payload: res.body.message });
            const user_info = res.body.data.customer;
            cookie.set("user_token", res.body.data.token, {
              path: "/",
              expires: writeCookie(60),
            });
            cookie.set("user_info", user_info, {
              path: "/",
              expires: writeCookie(60),
            });
            cookie.set("device_id", res.body.data.login_device_id, {
              path: "/",
              expires: writeCookie(60),
            });
            actions.resetForm({});
            btnDisabled(false);
            route.push("/account/profile");
          } else {
            dispatch({ type: THROW_ERROR, payload: res.body.message });
            btnDisabled(false);
          }
        } else {
          dispatch({ type: THROW_ERROR, payload: err.data.message });
        }
      });
  };

export const signupAction =
  (data, actions, route, btnDisabled) => (dispatch) => {
    return superagent
      .post(`${process.env.BASE_URL}register`)
      .send(data)
      .set("accept", "application/json")
      .end((err, res) => {
        if (res) {
          if (res.body.success) {
            dispatch({ type: THROW_SUCCESS, payload: res.body.message });
            const user_info = res.body.data.customer;
            cookie.set("user_token", res.body.data.token, {
              path: "/",
              expires: writeCookie(60),
            });
            cookie.set("user_info", user_info, {
              path: "/",
              expires: writeCookie(60),
            });
            cookie.set("device_id", res.body.data.login_device_id, {
              path: "/",
              expires: writeCookie(60),
            });
            actions.resetForm({});
            btnDisabled(false);
            route.push("/account/profile");
          } else {
            dispatch({ type: THROW_ERROR, payload: res.body.message });
            btnDisabled(false);
          }
        } else {
          dispatch({ type: THROW_ERROR, payload: err.data.message });
        }
      });
  };
export const logoutAction = (router) => (dispatch) => {
  return superagent
    .post(`${process.env.BASE_URL}logout`)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .set("login_device_id", cookie.get("device_id"))
    .end((err, res) => {
      if (res) {
        if (res.body.success) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
        } else {
          // dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
        cookie.remove("user_token", {
          path: "/",
          expires: writeCookie(30),
        });
        cookie.remove("device_id", {
          path: "/",
          expires: writeCookie(30),
        });
        cookie.remove("user_info", {
          path: "/",
          expires: writeCookie(30),
        });

        router.push("/");
        router.reload();
      } else {
        // dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};
export const forgotPasswordAction =
  (data, actions, route, showReset) => (dispatch) => {
    return superagent
      .post(`${process.env.BASE_URL}forget-password-email`)
      .send(data)
      .set("accept", "application/json")
      .set("Authorization", cookie.get("user_token"))
      .end((err, res) => {
        if (res) {
          if (res.body.success) {
            dispatch({ type: THROW_SUCCESS, payload: res.body.message });
            showReset(true);
            actions.resetForm({});
            route.push(`/forgot-password?reset=1`);
            cookie.set("reset_email", data.email);
          } else {
            dispatch({ type: THROW_ERROR, payload: res.body.message });
          }
        } else {
          dispatch({ type: THROW_ERROR, payload: err.data.message });
        }
      });
  };
export const resetPasswordAction = (data, actions, route) => (dispatch) => {
  return superagent
    .post(`${process.env.BASE_URL}reset-password`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.success) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          actions.resetForm({});
          route.push(`/login`);
          cookie.remove("reset_email");
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};
