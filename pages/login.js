import { Icon } from "@iconify/react";
import { Form, Formik } from "formik";
import { ReCaptchaProvider } from "next-recaptcha-v3";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { connect } from "react-redux";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import * as Yup from "yup";
import MetaHead from "../components/MetaHead";
import { loginAction } from "../redux/actions/auth";
import { getServerApiRequest } from "../utils/serverApi";
import { useTranslation } from "react-i18next";
const loginValidation = Yup.object({
  email: Yup.string()
    .required("Email can not be empty")
    .email("Email must be valid email"),
  password: Yup.string()
    .required("Password can not be empty")
    .min(6, "Password minimum 6 digit"),
});
const Login = (props) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const route = useRouter();
  const initialState = {
    email: "",
    password: "",
  };
  const handleSubmit = (values, actions) => {
    props.loginAction(values, actions, route, setDisabled);
    setDisabled(true);
  };
  const togglePasswordShow = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Fragment>
      <MetaHead
        seo_title={props.meta.meta_title}
        seo_description={props.meta.meta_description}
        seo_keyword={props.meta.meta_keyword}
        seo_image={props.settings.app_logo}
      />
      <section className="account__area">
        <div className="item-left">
          <div className="account__left">
            <Link href="/">
              <img src={props.settings?.app_footer_logo} alt="Logo" />
            </Link>
            <h2>{props.settings?.sign_up_left_text_title}</h2>
            <p>{props.settings?.sign_up_left_text_subtitle}</p>
          </div>
        </div>
        <div className="item-right">
          <div className="account__content">
            <div className="item-title mb-33">
              <h2>{t("Sign In")}</h2>
              <h4>
                {t("New user")} ? <Link href="/signup">{t("Create an account")}</Link>
              </h4>
            </div>
            <Formik
              enableReinitialize
              initialValues={initialState}
              validationSchema={loginValidation}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue, errors, touched }) => (
                <Form id="login">
                  <div className="input__group mb-25">
                    <label htmlFor="email">{t("Email")}</label>
                    <input
                      type="email"
                      id="email"
                      placeholder={t("Your email")}
                      className={`${errors.email && "is-invalid"}`}
                      value={values.email}
                      onChange={(e) => setFieldValue("email", e.target.value)}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="input__group mb-25">
                    <label htmlFor="password">{t("Password")}</label>
                    <div className="input-overlay">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder={t("Your password")}
                        className={`${errors.password && "is-invalid"}`}
                        value={values.password}
                        onChange={(e) =>
                          setFieldValue("password", e.target.value)
                        }
                      />
                      {errors.password && (
                        <div className="invalid-feedback">
                          {errors.password}
                        </div>
                      )}
                      <div
                        onClick={togglePasswordShow}
                        className={`password-visibility ${
                          showPassword && "show"
                        }`}
                      >
                        <Icon
                          icon="ic:round-remove-red-eye"
                          color="#84818a"
                          width="18"
                          height="18"
                        />
                      </div>
                    </div>
                   
                  </div>
                  <div className="item-link mb-25">
                    <Link href="/forgot-password">{t("Forgot password")}</Link>
                  </div>

                  {props.login_info.google_recaptcha_status == 1 && (
                    <>
                      <ReCaptchaProvider
                        reCaptchaKey={
                          props.login_info.google_recaptcha_site_key
                        }
                      ></ReCaptchaProvider>
                      {/* {error && <p style={{ color: "#ed4337" }}>{error}</p>} */}
                    </>
                  )}
                  <div className="item-button mb-28 mt-4">
                    <button
                      type="submit"
                      disabled={disabled}
                      className="btn btn-black"
                    >
                      {t("Sign In")}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            <div className="item-bg mb-28">
              <p>{t("Or continue with")}</p>
            </div>
            <div className="button-group">
              {props.login_info.google_login_status == 1 && (
                <>
                  {/* <LoginSocialGoogle
                    client_id={props.login_info.google_client_id}
                    onResolve={({ provider, data }) => {
                      dispatch(socialLogin({ data, navigate }));
                    }}
                  >
                    <GoogleLoginButton text="Google" />
                  </LoginSocialGoogle> */}
                  <GoogleLoginButton text="Google" align="center" />
                </>
              )}
              {props.login_info.facebook_login_status == 1 && (
                <>
                  {/* <LoginSocialFacebook
                    appId={props.login_info.facebook_client_id}
                    onResolve={({ provider, data }) => {
                      dispatch(socialLogin({ data, navigate }));
                    }}
                  >
                    <FacebookLoginButton text="Facebook" />
                  </LoginSocialFacebook> */}
                  <FacebookLoginButton text="Facebook" align="center" />
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default connect(null, { loginAction })(Login);
export const getServerSideProps = async ({ req }) => {
  const { user_token } = req.cookies;
  const metaData = await getServerApiRequest("get-meta", {
    meta_type: 1,
    id: 15,
  });
  const { data } = await getServerApiRequest(
    "login-credential",
    null,
    user_token
  );
  const setting_data = await getServerApiRequest("setting", null, user_token);

  if (user_token) {
    return {
      redirect: { destination: "/account/profile", permanent: false },
    };
  }

  return {
    props: {
      login_info: data.data.loginCredential,
      settings: setting_data.data.data,
      meta: metaData.data.data,
    },
  };
};
