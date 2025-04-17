import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import * as Yup from "yup";
import MetaHead from "../components/MetaHead";
import {
  forgotPasswordAction,
  resetPasswordAction,
} from "../redux/actions/auth";
import { useTranslation } from "react-i18next";
import { getServerApiRequest } from "../utils/serverApi";
const cookie = new Cookies();
const loginValidation = Yup.object({
  email: Yup.string()
    .required("Email can not be empty")
    .email("Email must be valid email"),
});
const resetCodeValidation = Yup.object({
  forgot_code: Yup.string().required("Code can not be empty"),
  password: Yup.string().required("Password can not be empty"),
  password_confirmation: Yup.string()
    .required(`Confirm password can not be empty`)
    .oneOf([Yup.ref("password"), null], `Password dose not match`),
});
const ForgotPassword = (props) => {
  const { t } = useTranslation();
  const route = useRouter();
  const [isReset, setIsReset] = useState(
    route.query.reset ? route.query.reset : false
  );

  const initialState = {
    email: "",
  };
  const codeInitialState = {
    forgot_code: "",
    password: "",
    password_confirmation: "",
  };
  const handleSubmit = (values, actions) => {
    const data = {
      email: values.email,
    };
    props.forgotPasswordAction(data, actions, route, setIsReset);
  };
  const codeHandleSubmit = (values, actions) => {
    const data = {
      email: cookie.get("reset_email"),
      forgot_code: values.forgot_code,
      password: values.password,
      password_confirmation: values.password_confirmation,
    };
    props.resetPasswordAction(data, actions, route);
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
              <h2>{t("Forgot Password?")}</h2>
              <p>
                {t(
                  "Enter your email and instructions will sent to you!"
                )}
              </p>
            </div>
            {isReset ? (
              <Formik
                enableReinitialize
                initialValues={codeInitialState}
                validationSchema={resetCodeValidation}
                onSubmit={codeHandleSubmit}
              >
                {({ values, setFieldValue, errors }) => (
                  <Form id="forgot_password">
                    <div className="input__group mb-25">
                      <label>{t("Reset code")}</label>
                      <input
                        type="text"
                        placeholder={t("Reset code")}
                        className={`${errors.forgot_code && "is-invalid"}`}
                        value={values.forgot_code}
                        name="forgot_code"
                        onChange={(e) =>
                          setFieldValue("forgot_code", e.target.value)
                        }
                      />
                      {errors.forgot_code && (
                        <div className="invalid-feedback">
                          {errors.forgot_code}
                        </div>
                      )}
                    </div>
                    <div className="input__group mb-25">
                      <label>{t("New password")}</label>
                      <input
                        type="password"
                        placeholder={t("New password")}
                        className={`${errors.password && "is-invalid"}`}
                        name="password"
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
                    </div>
                    <div className="input__group mb-25">
                      <label>{t("Confirm password")}</label>
                      <input
                        type="password"
                        placeholder={t("Confirm password")}
                        className={`${
                          errors.password_confirmation && "is-invalid"
                        }`}
                        name="password_confirmation"
                        value={values.password_confirmation}
                        onChange={(e) =>
                          setFieldValue("password_confirmation", e.target.value)
                        }
                      />
                      {errors.password_confirmation && (
                        <div className="invalid-feedback">
                          {errors.password_confirmation}
                        </div>
                      )}
                    </div>
                    <div className="item-button">
                      <button type="submit" className="btn btn-black">
                        {t("Save")}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            ) : (
              <Formik
                enableReinitialize
                initialValues={initialState}
                validationSchema={loginValidation}
                onSubmit={handleSubmit}
              >
                {({ values, setFieldValue, errors }) => (
                  <Form id="forgot_password">
                    <div className="input__group mb-25">
                      <label>{t("Email")}</label>
                      <input
                        type="email"
                        placeholder={t("Your email")}
                        className={`${errors.email && "is-invalid"}`}
                        value={values.email}
                        onChange={(e) => setFieldValue("email", e.target.value)}
                        name="email"
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>
                    <div className="item-button">
                      <button type="submit" className="btn btn-black">
                        {t("Send Reset Instructions")}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default connect(null, { forgotPasswordAction, resetPasswordAction })(
  ForgotPassword
);
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
