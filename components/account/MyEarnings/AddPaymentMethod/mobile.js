import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import * as Yup from "yup";
import { addWithdroalCardAction } from "../../../../redux/actions/profile";
const mobileValidation = Yup.object({
  mobile_banking_number: Yup.string().required(
    "Mobile Banking Number can not be empty"
  ),
  mobile_banking_name: Yup.string().required(
    "Mobile Banking Name can not be empty"
  ),
});
const MobileBanking = (props) => {
  const {t} = useTranslation()
  const initialState = {
    gateway_name: "mobile_banking",
    mobile_banking_number: props.mobile_info?.mobile_banking_number,
    mobile_banking_name: props.mobile_info?.mobile_banking_name,
  };
  const handleSubmit = (values, actions) => {
    props.addWithdroalCardAction(values, actions, props.setAddPaymentShow);
  };
  return (
    <div className="col-lg-6 col-12">
      <div className="payout-card">
        <div className="payout-card-top">
          <h3 className="add-title">{t("Mobile Banking")}</h3>
        </div>
        <Formik
          enableReinitialize
          initialValues={initialState}
          validationSchema={mobileValidation}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form id="mobile">
              <div className="input__group__between">
                <div className="input__group">
                  <label htmlFor="number">
                    {t("Mobile Banking Number")}
                  </label>
                  <input
                    type="text"
                    id="number"
                    value={values.mobile_banking_number}
                    onChange={(e) =>
                      setFieldValue("mobile_banking_number", e.target.value)
                    }
                    name="mobile_banking_number"
                    className={`${
                      errors.mobile_banking_number && "is-invalid"
                    }`}
                  />
                  {errors.mobile_banking_number && (
                    <div className="invalid-feedback">
                      {errors.mobile_banking_number}
                    </div>
                  )}
                </div>
                <div className="input__group">
                  <label htmlFor="mobile-bank-name">
                    {t("Mobile Banking Name")}
                  </label>
                  <input
                    type="text"
                    id="mobile-bank-name"
                    value={values.mobile_banking_name}
                    onChange={(e) =>
                      setFieldValue("mobile_banking_name", e.target.value)
                    }
                    name="mobile_banking_name"
                    className={`${errors.mobile_banking_name && "is-invalid"}`}
                  />
                  {errors.mobile_banking_name && (
                    <div className="invalid-feedback">
                      {errors.mobile_banking_name}
                    </div>
                  )}
                </div>
              </div>
              <button type="submit" className="custom-btn mt-4">
                {t("Save Mobile")}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default connect(null, { addWithdroalCardAction })(MobileBanking);
