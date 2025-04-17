import { Form, Formik } from "formik";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import Select from "react-select";
import * as Yup from "yup";
import {
  contributorAction,
  getCityAction,
  getStateAction,
} from "../../redux/actions/common";

const loginValidation = Yup.object({
  email: Yup.string()
    .required("Email can not be empty")
    .email("Email must be valid email"),
  first_name: Yup.string().required("First Name can not be empty"),
  last_name: Yup.string().required("Last Name can not be empty"),
  contact_number: Yup.string().required("Number can not be empty"),
  portfolio_link: Yup.string()
    .url("Url Must be a valid url")
    .required("Portfolio can not be empty"),
  source_id: Yup.number().required("Source can not be empty"),
  country_id: Yup.number().required("Country can not be empty"),
  state_id: Yup.number().required("State can not be empty"),
  city_id: Yup.number().required("City can not be empty"),
});
const ApplyModals = ({
  show,
  handleClose,
  sources,
  countries,
  state_data,
  city_data,
  getStateAction,
  getCityAction,
  user_info,
  setClose,
  contributorAction,
}) => {
  const initialState = {
    first_name: user_info?.first_name,
    last_name: user_info?.last_name,
    email: user_info?.email,
    contact_number: "",
    portfolio_link: "",
    source_id: 2,
    country_id: "",
    state_id: "",
    city_id: "",
  };

  const handleGetState = (id) => {
    getStateAction(id);
  };
  const handleStateChange = (id) => {
    getCityAction(id);
  };

  const handleSubmit = (values, actions) => {
    const newData = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      contact_number: values.contact_number,
      portfolio_link: values.portfolio_link,
      source_id: values.source_id,
      country_id: values.country_id,
      state_id: values.state_id,
      city_id: values.city_id,
    };
    contributorAction(newData, actions, setClose);
  };
  const {t} = useTranslation()
  return (
    <Modal
      show={show}
      className="contributorModal"
      centered
      onHide={handleClose}
      animation={false}
    >
      <Modal.Body>
        <Formik
          enableReinitialize
          initialValues={initialState}
          validationSchema={loginValidation}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form id="login">
              <div className="item-title mb-24">
                <h2>
                  {t("Please share some basic details about yourself.")}
                </h2>
              </div>
              <div className="input__group__between">
                <div className="input__group mb-20">
                  <label htmlFor="f-name">{t("First Name")}</label>
                  <input
                    type="text"
                    id="f-name"
                    value={values.first_name}
                    disabled
                    readOnly
                  />
                </div>
                <div className="input__group mb-20">
                  <label htmlFor="l-name">{t("Last Name")}</label>
                  <input
                    type="text"
                    id="l-name"
                    value={values.last_name}
                    disabled
                    readOnly
                  />
                </div>
              </div>
              <div className="input__group__between">
                <div className="input__group mb-20">
                  <label htmlFor="email">{t("Email")}</label>
                  <input
                    type="text"
                    id="email"
                    value={values.email}
                    disabled
                    readOnly
                  />
                </div>
                <div className="input__group mb-20">
                  <label htmlFor="phone">{t("Phone")}</label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder={t("Your Phone")}
                    value={values.contact_number}
                    name="contact_number"
                    className={`${errors.contact_number && "is-invalid"}`}
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
              <div className="input__group__between">
                <div className="input__group mb-20">
                  <label htmlFor="portfolio_link">
                    {t("Portfolio Link")}
                  </label>
                  <input
                    type="text"
                    id="portfolio_link"
                    placeholder={t("Your Portfolio Link")}
                    className={`${errors.portfolio_link && "is-invalid"}`}
                    value={values.portfolio_link}
                    onChange={(e) =>
                      setFieldValue("portfolio_link", e.target.value)
                    }
                  />
                  {errors.portfolio_link && (
                    <div className="invalid-feedback">
                      {errors.portfolio_link}
                    </div>
                  )}
                </div>
                <div className="input__group mb-20">
                  <label htmlFor="country_id">
                    {t("Where find our website?")}
                  </label>

                  <Select
                    options={sources}
                    id="source_id"
                    name="source_id"
                    getOptionValue={(option) => option.id}
                    getOptionLabel={(option) => option.name}
                    placeholder="Sources"
                    onChange={(e) => setFieldValue("source_id", e.id)}
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                  {errors.source_id && (
                    <div className="invalid-feedback">{errors.source_id}</div>
                  )}
                </div>
              </div>
              <div className="input__group__between">
                <div className="input__group mb-20">
                  <label>{t("Country")}</label>
                  <Select
                    options={countries}
                    getOptionValue={(option) => option.id}
                    getOptionLabel={(option) => option.country_name}
                    placeholder="Select Country"
                    onChange={(e) => {
                      setFieldValue("country_id", e.id);
                      handleGetState(e.id);
                    }}
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                  {errors.country_id && (
                    <div className="invalid-feedback">{errors.country_id}</div>
                  )}
                </div>
                <div className="input__group mb-20">
                  <label>{t("State")}</label>
                  <Select
                    options={state_data}
                    getOptionValue={(option) => option.id}
                    getOptionLabel={(option) => option.name}
                    placeholder="Select state"
                    onChange={(e) => {
                      setFieldValue("state_id", e.id);
                      handleStateChange(e.id);
                    }}
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                  {errors.state_id && (
                    <div className="invalid-feedback">{errors.state_id}</div>
                  )}
                </div>
              </div>
              <div className="input__group__between">
                <div className="input__group mb-20">
                  <label>{t("City")}</label>
                  <Select
                    options={city_data}
                    getOptionValue={(option) => option.id}
                    getOptionLabel={(option) => option.name}
                    placeholder="Select city"
                    onChange={(e) => setFieldValue("city_id", e.id)}
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                  {errors.city_id && (
                    <div className="invalid-feedback">{errors.city_id}</div>
                  )}
                </div>
              </div>
              <div className="item-button">
                <button type="submit" className="btn btn-black w-100">
                  {t("Submit")}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};
const mapStateToProps = (state) => ({
  state_data: state.common.state,
  city_data: state.common.city,
});
export default connect(mapStateToProps, {
  getStateAction,
  getCityAction,
  contributorAction,
})(ApplyModals);
