import { Icon } from "@iconify/react";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import MetaHead from "../components/MetaHead";
import { signupAction } from "../redux/actions/auth";
import { getServerApiRequest } from "../utils/serverApi";
import { useTranslation } from "react-i18next";

const signUpValidation = Yup.object({
  email: Yup.string()
    .required("Email can not be empty")
    .email("Email must be valid email"),
  password: Yup.string()
    .required("Password can not be empty")
    .min(6, "Password minimum 6 character"),
  firstName: Yup.string()
    .required("First Name can not be empty")
    .min(2, "First Name minimum 2 character"),
  lastName: Yup.string()
    .required("Last Name can not be empty")
    .min(2, "Last Name minimum 2 character"),
  user_name: Yup.string()
    .required("username can not be empty")
    .min(6, "username minimum 6 character"),
  contact_number: Yup.string()
    .required("Phone can not be empty")
    .min(6, "Phone minimum 6 character"),
});

const Signup = (props) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const route = useRouter();
  const initialState = {
    firstName: "",
    lastName: "",
    user_name: "",
    contact_number: "",
    email: "",
    password: "",
  };
  const handleSubmitSignup = (values, actions) => {
    const data = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      password: values.password,
      user_name: values.user_name,
      contact_number: values.contact_number,
    };
    props.signupAction(data, actions, route, setDisabled);
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
              <img src={props.settings.app_footer_logo} alt="Logo" />
            </Link>
            <h2>{t(props.settings.sign_up_left_text_title)}</h2>
            <p>{t(props.settings.sign_up_left_text_subtitle)}</p>
          </div>
        </div>
        <div className="item-right">
          <div className="account__content">
            <div className="item-title mb-33">
              <h2>{t("Create an account")}</h2>
              <h4>
                {t("Already have an account")}?{" "}
                <Link href="/login" replace>
                  {t("Sign In")}
                </Link>
              </h4>
            </div>
            <Formik
              enableReinitialize
              initialValues={initialState}
              validationSchema={signUpValidation}
              onSubmit={handleSubmitSignup}
            >
              {({ values, setFieldValue, errors, touched }) => (
                <Form id="signin">
                  <div className="input__group__between">
                    <div className="input__group mb-25">
                      <label htmlFor="firstName">
                        {t("First Name")}
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        placeholder={t("First Name")}
                        className={`${errors.firstName && "is-invalid"}`}
                        value={values.firstName}
                        onChange={(e) =>
                          setFieldValue("firstName", e.target.value)
                        }
                      />
                      {errors.firstName && (
                        <div className="invalid-feedback">
                          {errors.firstName}
                        </div>
                      )}
                    </div>
                    <div className="input__group mb-25">
                      <label htmlFor="lastName">{t("Last Name")}</label>
                      <input
                        type="text"
                        id="lastName"
                        placeholder={t("Last Name")}
                        className={`${errors.lastName && "is-invalid"}`}
                        value={values.lastName}
                        onChange={(e) =>
                          setFieldValue("lastName", e.target.value)
                        }
                      />
                      {errors.lastName && (
                        <div className="invalid-feedback">
                          {errors.lastName}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="input__group__between">
                    <div className="input__group mb-25">
                      <label htmlFor="user_name">
                        {t("User Name")}
                      </label>
                      <input
                        type="text"
                        id="user_name"
                        placeholder={t("User Name")}
                        className={`${errors.user_name && "is-invalid"}`}
                        value={values.user_name}
                        onChange={(e) =>
                          setFieldValue("user_name", e.target.value)
                        }
                      />
                      {errors.user_name && (
                        <div className="invalid-feedback">
                          {errors.user_name}
                        </div>
                      )}
                    </div>
                    <div className="input__group mb-25">
                      <label htmlFor="contact_number">
                        {t("Phone")}
                      </label>
                      <input
                        type="text"
                        id="contact_number"
                        placeholder={t("Phone")}
                        className={`${errors.contact_number && "is-invalid"}`}
                        value={values.contact_number}
                        onChange={(e) =>
                          setFieldValue("contact_number", e.target.value)
                        }
                      />
                      {errors.contact_number && (
                        <div className="invalid-feedback">
                          {errors.contact_number}
                        </div>
                      )}
                    </div>
                  </div>

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
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                  <div className="item-check">
                    <input type="checkbox" id="terms" defaultChecked />
                    <label htmlFor="terms">
                      {t(
                        "By clicking Create account, I agree that I have read and accepted the"
                      )}{" "}
                      <Link href="/terms-and-condition">
                        {t("Terms & condition")}
                      </Link>{" "}
                      {t("and")}{" "}
                      <Link href="/terms-and-condition">
                        {t("Privacy policy")}
                      </Link>
                      .{" "}
                    </label>
                  </div>
                  <div className="item-button mb-28 mt-4">
                    <button
                      type="submit"
                      disabled={disabled}
                      className="btn btn-black"
                    >
                      {t("Sign Up")}
                    </button>
                    {/*<div className="item-button mb-28">*/}
                    {/*  <button disabled={disabled} type="submit" className="btn btn-black">{t("Sign Up")}</button>*/}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default connect(null, { signupAction })(Signup);
export const getServerSideProps = async ({ req }) => {
  const { user_token } = req.cookies;
  const metaData = await getServerApiRequest("get-meta", {
    meta_type: 1,
    id: 15,
  });
  const setting_data = await getServerApiRequest("setting", null, user_token);

  return {
    props: {
      settings: setting_data.data.data,
      meta: metaData.data.data,
    },
  };
};
