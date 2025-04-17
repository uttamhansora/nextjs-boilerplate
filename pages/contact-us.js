import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { Form, Formik } from "formik";
import Head from "next/head";
import * as Yup from "yup";
import Breadcrumb from "../components/common/breadcumb";
import PublicLayout from "../components/public-layout";
import { contactAction } from "../redux/actions/common";
import { getServerApiRequest } from "../utils/serverApi";
import MetaHead from "../components/MetaHead";

const contactValidation = Yup.object({
  name: Yup.string()
    .required("Name can not be empty")
    .min(10, "Name at least 3 caracters"),
  message: Yup.string()
    .required("Message can not be empty")
    .min(10, "Message at least 10 caracters"),
  contact_issue_id: Yup.string().required("Contact issue can not be empty"),
  email: Yup.string()
    .required("Email can not be empty")
    .email("Email must be valid email"),
});

const ContactUs = (props) => {
  const { t } = useTranslation();
  const [disabled, setDisabled] = useState(false);

  const initialState = {
    name: "",
    email: "",
    contact_issue_id: "",
    message: "",
  };
  const handleSubmit = (values, actions) => {
    props.contactAction(values, actions, setDisabled);
    setDisabled(true);
  };
  return (
    <Fragment>
      <MetaHead
        seo_title={props.meta.meta_title}
        seo_description={props.meta.meta_description}
        seo_keyword={props.meta.meta_keyword}
        seo_image={props.settings.app_logo}
      />
      <PublicLayout
        settings={props.settings}
        footer_info={props.footer_info}
        user_info={props.user_info}
        token={props.token}
      >
        <Breadcrumb page="Contact Us" />
        <section className="contact__area">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="contact__content">
                  <div className="item-left">
                    <div className="item-title mb-40">
                      <h2>{t("Get in Touch")}</h2>
                    </div>
                    <ul className="contact-list">
                      <li>
                        <div className="list-item">
                          <div className="item-icon">
                            <img
                              src="/images/icons/map-location.svg"
                              alt="map"
                            />
                          </div>
                          <div className="item-text">
                            <p>{props.contact.settings.contact_us_location}</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="list-item">
                          <div className="item-icon">
                            <img src="/images/icons/gmail.svg" alt="gmail" />
                          </div>
                          <div className="item-text">
                            <p>
                              {props.contact.settings.contact_us_first_email}{" "}
                              <br />{" "}
                              {props.contact.settings.contact_us_second_email}
                            </p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="list-item">
                          <div className="item-icon">
                            <img
                              src="/images/icons/telephone.svg"
                              alt="telephone"
                            />
                          </div>
                          <div className="item-text">
                            <p>
                              {
                                props.contact.settings
                                  .contact_us_first_contact_number
                              }{" "}
                              <br />{" "}
                              {
                                props.contact.settings
                                  .contact_us_second_contact_number
                              }
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <div className="item-bottom">
                      <h4>{props.contact.settings.contact_us_description}</h4>
                    </div>
                  </div>
                  <div className="item-right">
                    <div className="item-title mb-50">
                      <h2>{t("Send Us a Message")}</h2>
                    </div>
                    <Formik
                      enableReinitialize
                      initialValues={initialState}
                      validationSchema={contactValidation}
                      onSubmit={handleSubmit}
                    >
                      {({ values, setFieldValue, errors, touched }) => (
                        <Form id="contact">
                          <div className="input__group__between">
                            <div className="input__group mb-24">
                              <input
                                type="text"
                                placeholder={t("Your name")}
                                className={`${errors.name && "is-invalid"}`}
                                onChange={(e) =>
                                  setFieldValue("name", e.target.value)
                                }
                                name="name"
                                value={values.name}
                              />
                              {errors.name && (
                                <div className="invalid-feedback">
                                  {errors.name}
                                </div>
                              )}
                            </div>
                            <div className="input__group mb-24">
                              <input
                                type="text"
                                placeholder={t("Your Email")}
                                className={`${errors.email && "is-invalid"}`}
                                onChange={(e) =>
                                  setFieldValue("email", e.target.value)
                                }
                                name="email"
                                value={values.email}
                              />
                              {errors.email && (
                                <div className="invalid-feedback">
                                  {errors.email}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="input__group mb-24">
                            <select
                              className={`form-control ${
                                errors.contact_issue_id && "is-invalid"
                              }`}
                              value={values.contact_issue_id}
                              name="contact_issue_id"
                              onChange={(e) =>
                                setFieldValue(
                                  "contact_issue_id",
                                  e.target.value
                                )
                              }
                            >
                              <option value="">
                                {t("Select a issue")}
                              </option>
                              {props.contact.contactIssues.map(
                                ({ id, name }) => (
                                  <option key={id} value={id}>
                                    {t(name)}
                                  </option>
                                )
                              )}
                            </select>
                            {errors.contact_issue_id && (
                              <div className="invalid-feedback">
                                {errors.contact_issue_id}
                              </div>
                            )}
                          </div>
                          <div className="input__group mb-30">
                            <textarea
                              cols="30"
                              rows="5"
                              placeholder={t("Your message")}
                              name="message"
                              className={`${errors.message && "is-invalid"}`}
                              value={values.message}
                              onChange={(e) =>
                                setFieldValue("message", e.target.value)
                              }
                            ></textarea>
                            {errors.message && (
                              <div className="invalid-feedback">
                                {errors.message}
                              </div>
                            )}
                          </div>
                          <div className="item-button">
                            <button
                              type="submit"
                              className="btn btn-black w-100"
                              disabled={disabled}
                            >
                              {t("Submit")}
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PublicLayout>
    </Fragment>
  );
};

export default connect(null, { contactAction })(ContactUs);
export const getServerSideProps = async ({ req }) => {
  const { user_token, user_info } = req.cookies;
  const setting_data = await getServerApiRequest("setting", null);
  const footer_data = await getServerApiRequest("footer-details", null);
  const contact_data = await getServerApiRequest(`contact-us`, null);
  const metaData = await getServerApiRequest("get-meta", {'meta_type' : 1, 'slug' : 4});

  return {
    props: {
      settings: setting_data.data.data,
      footer_info: footer_data.data.data,
      user_info: user_info ? JSON.parse(user_info) : null,
      token: user_token || null,
      contact: contact_data.data.data,
      meta: metaData.data.data,
    },
  };
};
