import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import * as Yup from "yup";
import { addWithdroalCardAction } from "../../../../redux/actions/profile";


const bankValidation = Yup.object({
  bank_account_number: Yup.string().required("Account Number can not be empty"),
  bank_routing_number: Yup.string().required(
    "Bank Routing Number can not be empty"
  ),
  bank_name: Yup.string().required("Bank Name can not be empty"),
  bank_branch_name: Yup.string().required("Branch can not be empty"),
});
const Bank = (props) => {
  const {t} = useTranslation()
  const bankState = {
    gateway_name: "bank",
    bank_account_number: props.bank_info?.bank_account_number,
    bank_routing_number: props.bank_info?.bank_routing_number,
    bank_name: props.bank_info?.bank_name,
    bank_branch_name: props.bank_info?.bank_branch_name,
  };

  const handleSubmit = (values, actions) => {
    props.addWithdroalCardAction(values, actions, props.setAddPaymentShow);
  };

  return (
    <div className="col-lg-6 col-12">
      <div className="payout-card mb-35">
        <div className="payout-card-top">
          <h3 className="add-title">{t("Add Bank Account")}</h3>
        </div>
        <Formik
          enableReinitialize
          initialValues={bankState}
          validationSchema={bankValidation}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, errors }) => (
            <Form id="bank">
              <div className="input__group__between">
                <div className="input__group mb-25">
                  <label htmlFor="acount-number">
                    {t("Account Number")}
                  </label>
                  <input
                    type="text"
                    id="acount-number"
                    name="bank_account_number"
                    value={values.bank_account_number}
                    onChange={(e) =>
                      setFieldValue("bank_account_number", e.target.value)
                    }
                  />
                  {errors.bank_account_number && (
                    <div className="invalid-feedback">
                      {errors.bank_account_number}
                    </div>
                  )}
                </div>
                <div className="input__group mb-25">
                  <label htmlFor="routing-number">
                    {t("Routing Number")}
                  </label>
                  <input
                    type="text"
                    id="routing-number"
                    name="bank_account_number"
                    value={values.bank_routing_number}
                    onChange={(e) =>
                      setFieldValue("bank_routing_number", e.target.value)
                    }
                  />
                  {errors.bank_routing_number && (
                    <div className="invalid-feedback">
                      {errors.bank_routing_number}
                    </div>
                  )}
                </div>
              </div>
              <div className="input__group__between">
                <div className="input__group">
                  <label htmlFor="bank-name">{t("Bank Name")}</label>
                  <input
                    type="text"
                    id="bank-name"
                    name="bank_name"
                    value={values.bank_name}
                    onChange={(e) => setFieldValue("bank_name", e.target.value)}
                  />
                  {errors.bank_name && (
                    <div className="invalid-feedback">{errors.bank_name}</div>
                  )}
                </div>
                <div className="input__group">
                  <label htmlFor="branch-name">
                    {t("Branch Name")}
                  </label>
                  <input
                    type="text"
                    id="branch-name"
                    name="bank_branch_name"
                    value={values.bank_branch_name}
                    onChange={(e) =>
                      setFieldValue("bank_branch_name", e.target.value)
                    }
                  />
                  {errors.bank_branch_name && (
                    <div className="invalid-feedback">
                      {errors.bank_branch_name}
                    </div>
                  )}
                </div>
              </div>
              <button type="submit" className="custom-btn mt-4">
                {t("Save Bank")}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default connect(null, { addWithdroalCardAction })(Bank);
