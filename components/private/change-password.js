import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import * as Yup from "yup";
import { chnagePasswordAction } from "../../redux/actions/profile";
const profileValidation = Yup.object({
  old_password: Yup.string()
    .required("Password can not be empty")
    .min(6, "Password minimum 6 digit"),
  new_password: Yup.string()
    .required("Password can not be empty")
    .min(6, "Password minimum 6 digit"),
});
const ChangePassword = (props) => {
  const {t} = useTranslation()
  const initialState = {
    old_password: "",
    new_password: "",
  };
  const handleSubmit = (data) => {
    props.chnagePasswordAction(data);
  };
  return (
    <Formik
      enableReinitialize
      initialValues={initialState}
      validationSchema={profileValidation}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form id="profile">
          <div className="input__group__between">
            <div className="input__group mb-20">
              <label htmlFor="old_password">{t("Old Password")}</label>
              <input
                type="password"
                id="old_password"
                className={`${errors.old_password && "is-invalid"}`}
                onChange={(e) => setFieldValue("old_password", e.target.value)}
                name="old_password"
                value={values.old_password}
              />
              {errors.old_password && (
                <div className="invalid-feedback">{errors.old_password}</div>
              )}
            </div>
            <div className="input__group mb-20">
              <label htmlFor="new_password">{t("New Password")}</label>
              <input
                type="password"
                id="new_password"
                className={`${errors.new_password && "is-invalid"}`}
                onChange={(e) => setFieldValue("new_password", e.target.value)}
                name="new_password"
                value={values.new_password}
              />
              {errors.new_password && (
                <div className="invalid-feedback">{errors.new_password}</div>
              )}
            </div>
          </div>
          <div className="item-button">
            <button type="submit" className="btn bg-theme">
              {t("Update")}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default connect(null, { chnagePasswordAction })(ChangePassword);
