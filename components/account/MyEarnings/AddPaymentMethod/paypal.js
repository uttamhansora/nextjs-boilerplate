import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import * as Yup from "yup";
import { addWithdroalCardAction } from "../../../../redux/actions/profile";
const paypalValidation = Yup.object({
  paypal_email: Yup.string()
    .required("Paypal Email can not be empty")
    .email("Email must be valid email"),
});
const Paypal = (props) => {
  const {t} = useTranslation()
  const initialState = {
    gateway_name: "paypal",
    paypal_email: props.paypal_info?.paypal_email,
  };
  const handleSubmit = (values, actions) => {
    props.addWithdroalCardAction(values, actions, props.setAddPaymentShow);
  };

  return (
    <div className="col-lg-6 col-12">
      <div className="payout-card mb-35">
        <div className="payout-card-top">
          <h3 className="add-title">{t("Add Card")}</h3>
          <img src="/images/icons/paypal.svg" alt="icon" />
        </div>
        <Formik
          enableReinitialize
          initialValues={initialState}
          validationSchema={paypalValidation}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form id="paypal">
              <div className="input__group">
                <label htmlFor="paypal_email">
                  {t("Paypal Email")}
                </label>
                <input
                  type="email"
                  id="paypal_email"
                  value={values.paypal_email}
                  onChange={(e) =>
                    setFieldValue("paypal_email", e.target.value)
                  }
                  name="paypal_email"
                  className={`${errors.paypal_email && "is-invalid"}`}
                />
                {errors.paypal_email && (
                  <div className="invalid-feedback">{errors.paypal_email}</div>
                )}
              </div>
              <button type="submit" className="custom-btn mt-4">
                {t("Save Paypal")}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default connect(null, { addWithdroalCardAction })(Paypal);
