import { Icon } from "@iconify/react";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import * as Yup from "yup";
import { updateProfileAction } from "../../redux/actions/profile";
const profileValidation = Yup.object({
  first_name: Yup.string().required("First Name can not be empty"),
  last_name: Yup.string().required("Last Name can not be empty"),
  email: Yup.string()
    .required("Email can not be empty")
    .email("Email must be valid email"),
  contact_number: Yup.string().required("Number can not be empty"),
  address: Yup.string().required("address can not be empty"),
});
const UpdateProfile = (props) => {
  const {t} = useTranslation()
  const [files, setFiles] = useState([]);
  const initialState = {
    email: props.user_info.email,
    first_name: props.user_info.first_name,
    last_name: props.user_info.last_name,
    contact_number: props.user_info.contact_number,
    address: props.user_info.address,
  };
  const { getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  const handleSubmit = (data) => {
    const formData = new FormData();

    if (files.length !== 0) {
      formData.append("profile_image", files[0]);
    }
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    formData.append("contact_number", data.contact_number);
    formData.append("address", data.address);
    props.updateProfileAction(formData);
  };

  const thumbs = files.map((file, i) => (
    <img
      key={i}
      src={file.preview}
      onLoad={() => {
        URL.revokeObjectURL(file.preview);
      }}
    />
  ));
  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);
  return (
    <Formik
      enableReinitialize
      initialValues={initialState}
      validationSchema={profileValidation}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form id="profile">
          <div className="user-info">
            <div className="user-img position-relative">
              {files.length === 0 ? (
                <img src={props.user_info.image} alt="img" />
              ) : (
                thumbs
              )}
              <div className="overlay">
                <label htmlFor="user-img">
                  <Icon icon="eva:edit-outline" width="20" height="20" />
                </label>
                <input {...getInputProps()} type="file" id="user-img" />
              </div>
            </div>
            <div className="user-text">
              <h2>{props.user_info.fullname}</h2>
            </div>
          </div>
          <div className="input__group__between">
            <div className="input__group mb-20">
              <label htmlFor="f-name">{t("First Name")}</label>
              <input
                type="text"
                id="f-name"
                className={`${errors.first_name && "is-invalid"}`}
                onChange={(e) => setFieldValue("first_name", e.target.value)}
                name="first_name"
                value={values.first_name}
              />
              {errors.first_name && (
                <div className="invalid-feedback">{errors.first_name}</div>
              )}
            </div>
            <div className="input__group mb-20">
              <label htmlFor="l-name">{t("Last Name")}</label>
              <input
                type="text"
                id="l-name"
                className={`${errors.last_name && "is-invalid"}`}
                onChange={(e) => setFieldValue("last_name", e.target.value)}
                name="last_name"
                value={values.last_name}
              />
              {errors.last_name && (
                <div className="invalid-feedback">{errors.last_name}</div>
              )}
            </div>
          </div>
          <div className="input__group__between">
            <div className="input__group mb-20">
              <label htmlFor="email">{t("Email")}</label>
              <input
                type="text"
                id="email"
                className={`${errors.email && "is-invalid"}`}
                onChange={(e) => setFieldValue("email", e.target.value)}
                name="email"
                value={values.email}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="input__group mb-20">
              <label htmlFor="phone">{t("Phone")}</label>
              <input
                type="text"
                id="phone"
                className={`${errors.contact_number && "is-invalid"}`}
                onChange={(e) =>
                  setFieldValue("contact_number", e.target.value)
                }
                name="contact_number"
                value={values.contact_number}
              />
              {errors.contact_number && (
                <div className="invalid-feedback">{errors.contact_number}</div>
              )}
            </div>
          </div>
          <div className="input__group__between">
            <div className="input__group mb-20">
              <label htmlFor="address">{t("Address")}</label>
              <input
                type="text"
                id="address"
                className={`${errors.address && "is-invalid"}`}
                onChange={(e) => setFieldValue("address", e.target.value)}
                name="address"
                value={values.address}
              />
              {errors.address && (
                <div className="invalid-feedback">{errors.address}</div>
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

export default connect(null, { updateProfileAction })(UpdateProfile);
