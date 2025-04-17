import { Modal } from "react-bootstrap";
import { Form, Formik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import { withdroalAction } from "../../../redux/actions/profile";
import { useTranslation } from "react-i18next";
const validationWithdrow = Yup.object({
  amount: Yup.number().required("Amount can not be empty"),
  gateway_name: Yup.string().required("Gateway Name can not be empty"),
});
const getweys = [
  {
    value: "paypal",
    name: "Withdraw With Paypal",
    icon: "/images/icons/paypal.svg",
  },
  {
    value: "card",
    name: "Withdraw With Card",
    icon: "/images/icons/visa-card.svg",
  },
  {
    value: "bank",
    name: "Withdraw With Bank",
    icon: "",
  },
  {
    value: "mobile_banking",
    name: "Withdraw With Mobile Banking",
    icon: "",
  },
];
const Withdraw = ({
  withdrawShow,
  setWithdrawShow,
  totalAvailableBalance,
  currency,
  withdroalAction,
}) => {

  const initialState = {
    amount: "",
    customer_note: "",
    gateway_name: "",
  };
  const handleSubmit = (values, actions) => {
    withdroalAction(values, actions, setWithdrawShow);
  };
  const getCurrencySymbol = (amount) => {
    if (currency.currency_placement === "after") {
      return amount.toFixed(2) + " " + currency.currency_symbol;
    } else {
      return currency.currency_symbol + " " + amount.toFixed(2);
    }
  };
  const {t} = useTranslation()
  return (
    <>
      <Modal
        show={withdrawShow}
        centered
        onHide={() => setWithdrawShow(false)}
        className="withdraw-modal"
      >
        <Modal.Body>
          <h2 className="text-center mt-3">
            {getCurrencySymbol(Number(totalAvailableBalance))}
          </h2>
          <h3 className="text-center">{t("Available Balance")}</h3>
          <Formik
            enableReinitialize
            initialValues={initialState}
            validationSchema={validationWithdrow}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, errors }) => (
              <Form id="withdropw">
                <div className="mb-3">
                  <label className="label" htmlFor="amount">
                    {t("Amount")}*
                  </label>
                  <input
                    className="amount-input"
                    type="text"
                    id="amount"
                    placeholder={t("Type amount")}
                    value={values.amount}
                    onChange={(e) => setFieldValue("amount", e.target.value)}
                  />
                  {errors.amount && (
                    <div className="invalid-feedback">{errors.amount}</div>
                  )}
                </div>
                <div>
                  <label className="label" htmlFor="note">
                    {t("Note")}
                  </label>
                  <input
                    className="amount-input"
                    type="text"
                    id="note"
                    placeholder={t("Type note")}
                    value={values.customer_note}
                    onChange={(e) =>
                      setFieldValue("customer_note", e.target.value)
                    }
                  />
                </div>
                <label className="label mt-4" htmlFor="amount">
                  {t("Select payment option")}*
                </label>
                {getweys.map((item) => (
                  <div key={item.value} className="withdraw-option">
                    <div className="form-check">
                      <div className="withdrawal-radio-item">
                        <input
                          className="form-check-input"
                          type="radio"
                          id={item.value}
                          value={item.value}
                          name="gateway_name"
                          onChange={(e) =>
                            setFieldValue("gateway_name", e.target.value)
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor={item.value}
                        >
                          {t(item.name)}
                        </label>
                      </div>
                      {item.icon ? (
                        <div className="withdrawal-radio-img">
                          <img src={item.icon} alt={item.name} />
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}
                {errors.gateway_name && (
                  <div className="invalid-feedback">{errors.gateway_name}</div>
                )}
                <button type="submit" className="custom-btn full mb-2">
                  {t("Make Withdraw")}
                </button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default connect(null, { withdroalAction })(Withdraw);
