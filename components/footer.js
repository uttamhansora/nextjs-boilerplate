import { Form, Formik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import * as Yup from "yup";
import { subscriberAction } from "../redux/actions/common";
const loginValidation = Yup.object({
  email: Yup.string()
  .required("Email can not be empty")
  .email("Email must be valid email"),
});
const Footer = (props) => {
  const {t} = useTranslation();
  const initialState = {
    email: "",
  };
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = (values, actions) => {
    props.subscriberAction(values, actions, setDisabled);
    setDisabled(true);
  };
  return (
    <footer className="footer__area">
      <div className="container">
        <div className="subscribe__content">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="subscribe__item">
                <div className="item-title">
                  <h2>{props.footer_info?.settings?.newsletter_title}</h2>
                  <p>{props.footer_info?.settings?.newsletter_subtitle}</p>
                </div>
                <div className="item-input">
                  <Formik
                    enableReinitialize
                    initialValues={initialState}
                    validationSchema={loginValidation}
                    onSubmit={handleSubmit}
                  >
                    {({ values, setFieldValue, errors, touched }) => (
                      <Form id="Subscription">
                        <div className="input__group">
                          <input
                            placeholder="Your email"
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={(e) =>
                              setFieldValue("email", e.target.value)
                            }
                          />
                          {errors.email && (
                            <p className="error-message">{errors.email}</p>
                          )}
                          <div className="input-button">
                            <button type="submit" disabled={disabled}>
                              <i className="fa-solid fa-arrow-right"></i>
                            </button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="subscribe__img">
                <img src="/images/bg/subscribe-img.png" alt="subscribe" />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-12">
            <aside className="footer__info">
              <div className="footer__logo">
                <Link href="/">
                  <img
                    src={props.footer_info?.settings?.app_footer_logo}
                    alt="Logo"
                  />
                </Link>
              </div>
              <ul className="footer-social-menu">
                <li>
                  <a
                    href={
                      props.footer_info?.settings?.facebook_url
                        ? props.footer_info?.settings?.facebook_url
                        : "#"
                    }
                    target="_blank"
                  >
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a
                    href={
                      props.footer_info?.settings?.instagram_url
                        ? props.footer_info?.settings?.instagram_url
                        : "#"
                    }
                  >
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a
                    href={
                      props.footer_info?.settings?.linkedin_url
                        ? props.footer_info?.settings?.linkedin_url
                        : "#"
                    }
                    target="_blank"
                  >
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                </li>
                <li>
                  <a
                    href={
                      props.footer_info?.settings?.twitter_url
                        ? props.footer_info?.settings?.twitter_url
                        : "#"
                    }
                  >
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a
                    href={
                      props.footer_info?.settings?.pinterest_url
                        ? props.footer_info?.settings?.pinterest_url
                        : "#"
                    }
                  >
                    <i className="fa-brands fa-pinterest"></i>
                  </a>
                </li>
                <li>
                  <a
                    href={
                      props.footer_info?.settings?.tiktok_url
                        ? props.footer_info?.settings?.tiktok_url
                        : "#"
                    }
                  >
                    <i className="fa-brands fa-tiktok"></i>
                  </a>
                </li>
              </ul>
            </aside>
          </div>
          <div className="col-lg-9 col-md-12">
            <div className="row">
              <div className="col-md-3 col-6">
                <aside className="footer__widget">
                  <div className="widget__title">
                    <h2>{t("Company")}</h2>
                  </div>
                  <div className="widget__content">
                    <ul className="widget__list">
                      <li>
                        <Link href="/blog">{t("Blog")}</Link>
                      </li>
                      <li>
                        <Link href="/pricing">{t("Pricing")}</Link>
                      </li>
                      <li>
                        <Link href="/about-us">{t("About Us")}</Link>
                      </li>
                      <li>
                        <Link href="/contact-us">{t("Contact Us")}</Link>
                      </li>
                    </ul>
                  </div>
                </aside>
              </div>
              <div className="col-md-3 col-6">
                <aside className="footer__widget">
                  <div className="widget__title">
                    <h2>{t("Product Type")}</h2>
                  </div>
                  <div className="widget__content">
                    <ul className="widget__list">
                      {props.footer_info?.productTypes?.map(
                        ({ slug, name }) => (
                          <li key={slug}>
                            <Link href={`/filter?type=${slug}`}>{name}</Link>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </aside>
              </div>
              <div className="col-md-3 col-6">
                <aside className="footer__widget">
                  <div className="widget__title">
                    <h2>{t("Policy")}</h2>
                  </div>
                  <div className="widget__content">
                    <ul className="widget__list">
                      <li>
                        <Link href="/cookie-policy">{t("Cookie policy")}</Link>
                      </li>
                      <li>
                        <Link href="/privacy-policy">{t("Privacy policy")}</Link>
                      </li>
                      <li>
                        <Link href="/terms-and-condition">
                          {t("Terms & condition")}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </aside>
              </div>
              <div className="col-md-3 col-6">
                <aside className="footer__widget">
                  <div className="widget__title">
                    <h2>{t("Contact Us")}</h2>
                  </div>
                  <div className="widget__content">
                    <ul className="widget__list">
                      <li>
                        <p>
                          {t("Phone")}:{" "}
                          {props.footer_info?.settings?.app_contact_number}
                        </p>
                      </li>
                      <li>
                        <p>Email: {props.footer_info?.settings?.app_email}</p>
                      </li>
                      <li>
                        <p>
                          Location: {props.footer_info?.settings?.app_location}
                        </p>
                      </li>
                    </ul>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="footer__copyright">
              <h2>{props.footer_info?.settings?.app_copyright}</h2>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default connect(null, { subscriberAction })(Footer);
