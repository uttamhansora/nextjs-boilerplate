import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import * as Yup from "yup";
import { addWithdroalCardAction } from "../../../../redux/actions/profile";
const loginValidation = Yup.object({
  card_number: Yup.string().required("Card Number can not be empty"),
  card_holder_name: Yup.string().required("Card Holder Name can not be empty"),
  expiration_month: Yup.string().required("Expiration month can not be empty"),
  expiration_year: Yup.string().required("Expiration year can not be empty"),
});
const CardPayment = (props) => {
  const {t} = useTranslation()
  const initialState = {
    gateway_name: "card",
    card_number: props.card_info?.card_number,
    card_holder_name: props.card_info?.card_holder_name,
    expiration_month: props.card_info?.expiration_month,
    expiration_year: props.card_info?.expiration_year,
  };

  const handleSubmit = (values, actions) => {
    props.addWithdroalCardAction(values, actions, props.setAddPaymentShow);
  };
  return (
    <div className="col-lg-6 col-12">
      <div className="payout-card mb-35">
        <div className="payout-card-top">
          <h3 className="add-title">{t("Add Card")}</h3>
          <img src="/images/icons/visa-card.svg" alt="icon" />
        </div>
        <Formik
          enableReinitialize
          initialValues={initialState}
          validationSchema={loginValidation}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form id="card">
              <div className="input__group__between">
                <div className="input__group mb-25">
                  <label htmlFor="card-holder">
                    {t("Card Number")}
                  </label>
                  <input
                    type="text"
                    id="card-holder"
                    value={values.card_number}
                    onChange={(e) =>
                      setFieldValue("card_number", e.target.value)
                    }
                    name="card_number"
                    className={`${errors.card_number && "is-invalid"}`}
                  />
                  {errors.card_number && (
                    <div className="invalid-feedback">{errors.card_number}</div>
                  )}
                </div>
                <div className="input__group mb-25">
                  <label htmlFor="card-number">
                    {t("Card Holder Name")}
                  </label>
                  <input
                    type="text"
                    id="card-number"
                    value={values.card_holder_name}
                    onChange={(e) =>
                      setFieldValue("card_holder_name", e.target.value)
                    }
                    name="card_holder_name"
                    className={`${errors.card_holder_name && "is-invalid"}`}
                  />
                  {errors.card_holder_name && (
                    <div className="invalid-feedback">
                      {errors.card_holder_name}
                    </div>
                  )}
                </div>
              </div>
              <div className="input__group__between">
                <div className="input__group">
                  <label htmlFor="exp-date">
                    {t("Expiration Month")}
                  </label>
                  <input
                    type="text"
                    id="card-holder"
                    value={values.expiration_month}
                    onChange={(e) =>
                      setFieldValue("expiration_month", e.target.value)
                    }
                    name="expiration_month"
                    className={`${errors.expiration_month && "is-invalid"}`}
                  />
                  {errors.expiration_month && (
                    <div className="invalid-feedback">
                      {errors.expiration_month}
                    </div>
                  )}
                </div>
                <div className="input__group">
                  <label htmlFor="cvv">{t("Expiration Year")}</label>
                  <input
                    type="text"
                    id="card-holder"
                    value={values.expiration_year}
                    onChange={(e) =>
                      setFieldValue("expiration_year", e.target.value)
                    }
                    name="expiration_year"
                    className={`${errors.expiration_year && "is-invalid"}`}
                  />
                  {errors.expiration_year && (
                    <div className="invalid-feedback">
                      {errors.expiration_year}
                    </div>
                  )}
                </div>
              </div>
              <button className="custom-btn mt-4">
                {t("Save Card")}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default connect(null, { addWithdroalCardAction })(CardPayment);
