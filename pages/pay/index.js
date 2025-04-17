import React, { Fragment, useState } from "react";
import { connect } from "react-redux";

import Head from "next/head";
import { useRouter } from "next/router";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import Breadcrumb from "../../components/common/breadcumb";
import PublicLayout from "../../components/public-layout";
import {
  checkoutAction,
  // bankCheckoutAction,
  // walletCheckoutAction,
  getApplyCouponAction,
  getGatewayNowAction,
} from "../../redux/actions/common";
import { getServerApiRequest } from "../../utils/serverApi";
import { useTranslation } from "react-i18next";

const PaymentGetways = (props) => {
  const {t} = useTranslation()
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [showDonation, setShowDonation] = useState(false);
  const [coupon, setCoupon] = useState("");
  const getCurrencySymbol = (amount) => {
    if (props.currency.currency_placement === "after") {
      return amount + props.currency.currency_symbol;
    } else {
      return props.currency.currency_symbol + amount;
    }
  };
  const handleGateway = (name) => {
    if (props.token) {
      const data = {
        gateway_name: name,
        type: router.query.type,
        id: router.query.id,
        variation_id: router.query.variation_id,
        amount: router.query.amount,
        duration: router.query.duration,
      };

      if (data.type == "plan") {
        props.getGatewayNowAction(data, setShow);
      } else if (data.type == "wallet") {
        props.getGatewayNowAction(data, setShowWallet);
      } else if (data.type == "product") {
        props.getGatewayNowAction(data, setShowProduct);
      } else if (data.type == "donation") {
        props.getGatewayNowAction(data, setShowDonation);
      }
    } else {
      toast.error("Please Login first");
      router.push("/login");
    }
  };
  const handleHideModal = () => {
    setShow(false);
    setShowWallet(false);
    setShowProduct(false);
    setShowDonation(false);
    setCoupon("");
  };

  const handleGetCoupon = () => {
    if (coupon) {
      const data = {
        id: props.gateway_now.id,
        coupon_name: coupon,
        type: router.query.type,
      };
      props.getApplyCouponAction(data);
    } else {
      toast.error("coupon code can not be empty");
    }
  };

  const handleClickCheckout = (e) => {
    const formData = new FormData();
    formData.append("id", props.gateway_now.id);
    formData.append("type", router.query.type);
    if (props.gateway_now.gateway_name == "bank") {
      formData.append(
        "deposit_by",
        document.getElementById("deposit_by").value
      );
      if (document.getElementById("bank_deposit_slip").files.length) {
        formData.append(
          "bank_deposit_slip",
          document.getElementById("bank_deposit_slip").files[0]
        );
      }
    } else {
      formData.append(
        "callback_url",
        `${document.location.origin}/payment-processing`
      );
    }
    props.checkoutAction(formData, router);
  };
  return (
    <Fragment>
      <Head>
        <title>{t("Payment Gateways")}</title>
        <meta name="description" content="Payment Gateways Description" />
        <meta name="keywords" content="Payment Gateways Keywords" />
        <meta property="og:image" content="/images/preview.png" />
        <meta property="og:title" content="Payment Gateways" />
        <meta
          property="og:description"
          content="Payment Gateways Description"
        />
        <meta name="twitter:title" content="Payment Gateways" />
        <meta
          name="twitter:description"
          content="Payment Gateways Description"
        />
        <meta name="twitter:image" content="/images/preview.png" />
        <meta name="robots" content="max-image-preview:large" />
      </Head>
      <PublicLayout
        settings={props.settings}
        footer_info={props.footer_info}
        user_info={props.user_info}
        token={props.token}
      >
        <Breadcrumb page="Select Payment Option" />
        <section className="pricing-plan__area">
          <div className="container">
            <div className="row">
              {props.gateways.map((item) =>
                item.gateway_name === "wallet" &&
                router.query.type === "wallet" ? (
                  ""
                ) : (
                  <div key={item.id} className="col-md-4 col-lg-3">
                    <div className="payment-option text-center">
                      <span className="option-name">
                        {item.gateway_name} - {item.gateway_currency}
                      </span>
                      <div className="option-img">
                        <img src={item.image} alt="" />
                      </div>
                      <button
                        onClick={() => handleGateway(item.gateway_name)}
                        className="payment"
                      >
                        {t("Payment Now")}
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      </PublicLayout>
      <Modal
        show={show}
        onHide={handleHideModal}
        centered
        className="payment-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {t("Payment With")} {props.gateway_now?.gateway_name} -{" "}
            {props.gateway_now?.gateway_currency}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-3">
            {t("Package Name")} :{" "}
            <strong>{props.gateway_now?.plan_name}</strong>
          </p>
          <div className="coupon-form">
            <div className="coupon-box">
              <input
                type="text"
                id="coupon"
                placeholder={t("Enter your coupon code")}
                onChange={(e) => setCoupon(e.target.value)}
                value={coupon}
              />
              <button onClick={handleGetCoupon} type="button">
                {t("Apply Now")}
              </button>
            </div>
            <p className="coupon-error">{props.gateway_now?.message}</p>
          </div>
          <div>
            <div className="option-item">
              <span>{t("Subtotal")}:</span>
              <span>{getCurrencySymbol(props.gateway_now?.subtotal)}</span>
            </div>
            <div className="option-item">
              <span>{t("Discount")}:</span>
              <span>{getCurrencySymbol(props.gateway_now?.discount)}</span>
            </div>
            <div className="option-item">
              <span>{t("Tax")}:</span>
              <span>{getCurrencySymbol(props.gateway_now?.tax)}</span>
            </div>
            <div className="option-item">
              <span>{t("Total")}:</span>
              <span>{getCurrencySymbol(props.gateway_now?.total)}</span>
            </div>
            <div className="option-item">
              <span>{t("Conversion Rate")}:</span>
              <span>
                {getCurrencySymbol(1)} = {props.gateway_now.conversion_rate}{" "}
                {props.gateway_now?.gateway_currency}
              </span>
            </div>
            <div className="option-item">
              <span>{t("Grand Total")}:</span>
              <span>
                {props.gateway_now.grand_total}{" "}
                {props.gateway_now?.gateway_currency}
              </span>
            </div>
            {props.gateway_now.gateway_name == "bank" && (
              <div className="border">
                <div className="pay-now-details px-4">
                  <div className="option-bank-item">
                    <span>{t("Bank Name")}:</span>
                    <span>{props.gateway_now.bank_name}</span>
                  </div>
                  <div className="option-bank-item">
                    <span>{t("Bank Branch Name")}:</span>
                    <span>{props.gateway_now.bank_branch_name}</span>
                  </div>
                  <div className="option-bank-item">
                    <span>{t("Bank Account Number")}:</span>
                    <span>{props.gateway_now.bank_account_number}</span>
                  </div>
                  <div className="option-bank-item">
                    <span>{t("Bank Routing Number")}:</span>
                    <span>{props.gateway_now.bank_routing_number}</span>
                  </div>
                </div>

                <form
                  action="/api/form"
                  className="card-form mt-4 px-4"
                  method="post"
                >
                  <div className="card-input">
                    <label for="deposit_by">{t("Deposit By*")}</label>
                    <input
                      className="input"
                      type="text"
                      id="deposit_by"
                      placeholder={t("Deposit By")}
                      required=""
                      name="deposit_by"
                    ></input>
                  </div>
                  <div className="card-input">
                    <label for="bank_deposit_slip">
                      {t("Deposit Slip*")}
                    </label>
                    <input
                      type="file"
                      className="form-control form-control-lg"
                      id="bank_deposit_slip"
                      required=""
                      name="bank_deposit_slip"
                    ></input>
                  </div>
                </form>
              </div>
            )}
          </div>
          <button className="pay-now mt-4 mb-2" onClick={handleClickCheckout}>
            {t("Checkout")}
          </button>
        </Modal.Body>
      </Modal>
      <Modal
        show={showWallet}
        onHide={handleHideModal}
        centered
        className="payment-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {t("Payment With")} {props.gateway_now?.gateway_name} -{" "}
            {props.gateway_now?.gateway_currency}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="option-item">
              <span>{t("Total")}:</span>
              <span>{getCurrencySymbol(props.gateway_now?.total)}</span>
            </div>
            <div className="option-item">
              <span>{t("Conversion Rate")}:</span>
              <span>
                {getCurrencySymbol(1)} = {props.gateway_now.conversion_rate}{" "}
                {props.gateway_now?.gateway_currency}
              </span>
            </div>
            <div className="option-item">
              <span>{t("Grand Total")}:</span>
              <span>
                {props.gateway_now.grand_total}{" "}
                {props.gateway_now?.gateway_currency}
              </span>
            </div>
            {props.gateway_now.gateway_name == "bank" && (
              <div className="border">
                <div className="pay-now-details px-4">
                  <div className="option-bank-item">
                    <span>{t("Bank Name")}:</span>
                    <span>{props.gateway_now.bank_name}</span>
                  </div>
                  <div className="option-bank-item">
                    <span>{t("Bank Branch Name")}:</span>
                    <span>{props.gateway_now.bank_branch_name}</span>
                  </div>
                  <div className="option-bank-item">
                    <span>{t("Bank Account Number")}:</span>
                    <span>{props.gateway_now.bank_account_number}</span>
                  </div>
                  <div className="option-bank-item">
                    <span>{t("Bank Routing Number")}:</span>
                    <span>{props.gateway_now.bank_routing_number}</span>
                  </div>
                </div>

                <form
                  action="/api/form"
                  className="card-form mt-4 px-4"
                  method="post"
                >
                  <div className="card-input">
                    <label for="deposit_by">{t("Deposit By*")}</label>
                    <input
                      className="input"
                      type="text"
                      id="deposit_by"
                      placeholder={t("Deposit By")}
                      required=""
                      name="deposit_by"
                    ></input>
                  </div>
                  <div className="card-input">
                    <label for="bank_deposit_slip">
                      {t("Deposit Slip*")}
                    </label>
                    <input
                      type="file"
                      className="form-control form-control-lg"
                      id="bank_deposit_slip"
                      required=""
                      name="bank_deposit_slip"
                    ></input>
                  </div>
                </form>
              </div>
            )}
          </div>
          <button className="pay-now mt-4 mb-2" onClick={handleClickCheckout}>
            {t("Checkout")}
          </button>
        </Modal.Body>
      </Modal>
      <Modal
        show={showDonation}
        onHide={handleHideModal}
        centered
        className="payment-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {t("Payment With")} {props.gateway_now?.gateway_name} -{" "}
            {props.gateway_now?.gateway_currency}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="option-item">
              <span>{t("Total")}:</span>
              <span>{getCurrencySymbol(props.gateway_now?.total)}</span>
            </div>
            <div className="option-item">
              <span>{t("Conversion Rate")}:</span>
              <span>
                {getCurrencySymbol(1)} = {props.gateway_now.conversion_rate}{" "}
                {props.gateway_now?.gateway_currency}
              </span>
            </div>
            <div className="option-item">
              <span>{t("Grand Total")}:</span>
              <span>
                {props.gateway_now.grand_total}{" "}
                {props.gateway_now?.gateway_currency}
              </span>
            </div>
            {props.gateway_now.gateway_name == "bank" && (
              <div className="border">
                <div className="pay-now-details px-4">
                  <div className="option-bank-item">
                    <span>{t("Bank Name")}:</span>
                    <span>{props.gateway_now.bank_name}</span>
                  </div>
                  <div className="option-bank-item">
                    <span>{t("Bank Branch Name")}:</span>
                    <span>{props.gateway_now.bank_branch_name}</span>
                  </div>
                  <div className="option-bank-item">
                    <span>{t("Bank Account Number")}:</span>
                    <span>{props.gateway_now.bank_account_number}</span>
                  </div>
                  <div className="option-bank-item">
                    <span>{t("Bank Routing Number")}:</span>
                    <span>{props.gateway_now.bank_routing_number}</span>
                  </div>
                </div>

                <form
                  action="/api/form"
                  className="card-form mt-4 px-4"
                  method="post"
                >
                  <div className="card-input">
                    <label for="deposit_by">{t("Deposit By*")}</label>
                    <input
                      className="input"
                      type="text"
                      id="deposit_by"
                      placeholder={t("Deposit By")}
                      required=""
                      name="deposit_by"
                    ></input>
                  </div>
                  <div className="card-input">
                    <label for="bank_deposit_slip">
                      {t("Deposit Slip*")}
                    </label>
                    <input
                      type="file"
                      className="form-control form-control-lg"
                      id="bank_deposit_slip"
                      required=""
                      name="bank_deposit_slip"
                    ></input>
                  </div>
                </form>
              </div>
            )}
          </div>
          <button className="pay-now mt-4 mb-2" onClick={handleClickCheckout}>
            {t("Checkout")}
          </button>
        </Modal.Body>
      </Modal>
      <Modal
        show={showProduct}
        onHide={handleHideModal}
        centered
        className="payment-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {t("Payment With")} {props.gateway_now?.gateway_name} -{" "}
            {props.gateway_now?.gateway_currency}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-3">
            {t("Product Name")} :{" "}
            <strong>{props.gateway_now?.title}</strong>
          </p>
          <div className="coupon-form">
            <div className="coupon-box">
              <input
                type="text"
                id="coupon"
                placeholder={t("Enter your coupon code")}
                onChange={(e) => setCoupon(e.target.value)}
                value={coupon}
              />
              <button onClick={handleGetCoupon} type="button">
                {t("Apply Now")}
              </button>
            </div>
            <p className="coupon-error">{props.gateway_now?.message}</p>
          </div>
          <div>
            <div className="option-item">
              <span>{t("Subtotal")}:</span>
              <span>{getCurrencySymbol(props.gateway_now?.subtotal)}</span>
            </div>
            <div className="option-item">
              <span>{t("Discount")}:</span>
              <span>{getCurrencySymbol(props.gateway_now?.discount)}</span>
            </div>
            <div className="option-item">
              <span>{t("Tax")}:</span>
              <span>{getCurrencySymbol(props.gateway_now?.tax)}</span>
            </div>
          </div>
          <div className="option-item">
            <span>{t("Total")}:</span>
            <span>{getCurrencySymbol(props.gateway_now?.total)}</span>
          </div>
          <div className="option-item">
            <span>{t("Conversion Rate")}:</span>
            <span>
              {getCurrencySymbol(1)} = {props.gateway_now.conversion_rate}{" "}
              {props.gateway_now?.gateway_currency}
            </span>
          </div>
          <div className="option-item">
            <span>{t("Grand Total")}:</span>
            <span>
              {props.gateway_now.grand_total}{" "}
              {props.gateway_now?.gateway_currency}
            </span>
          </div>
          {props.gateway_now.gateway_name == "bank" && (
            <div className="border">
              <div className="pay-now-details px-4">
                <div className="option-bank-item">
                  <span>{t("Bank Name")}:</span>
                  <span>{props.gateway_now.bank_name}</span>
                </div>
                <div className="option-bank-item">
                  <span>{t("Bank Branch Name")}:</span>
                  <span>{props.gateway_now.bank_branch_name}</span>
                </div>
                <div className="option-bank-item">
                  <span>{t("Bank Account Number")}:</span>
                  <span>{props.gateway_now.bank_account_number}</span>
                </div>
                <div className="option-bank-item">
                  <span>{t("Bank Routing Number")}:</span>
                  <span>{props.gateway_now.bank_routing_number}</span>
                </div>
              </div>

              <form
                action="/api/form"
                className="card-form mt-4 px-4"
                method="post"
              >
                <div className="card-input">
                  <label for="deposit_by">{t("Deposit By*")}</label>
                  <input
                    className="input"
                    type="text"
                    id="deposit_by"
                    placeholder={t("Deposit By")}
                    required=""
                    name="deposit_by"
                  ></input>
                </div>
                <div className="card-input">
                  <label for="bank_deposit_slip">
                    {t("Deposit Slip*")}
                  </label>
                  <input
                    type="file"
                    className="form-control form-control-lg"
                    id="bank_deposit_slip"
                    required=""
                    name="bank_deposit_slip"
                  ></input>
                </div>
              </form>
            </div>
          )}
          <button className="pay-now mt-4 mb-2" onClick={handleClickCheckout}>
            {t("Checkout")}
          </button>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  gateway_now: state.common.gateway_now,
  coupon_data: state.common.coupon_data,
});

export default connect(mapStateToProps, {
  getGatewayNowAction,
  checkoutAction,
  // bankCheckoutAction,
  // walletCheckoutAction,
  getApplyCouponAction,
})(PaymentGetways);

export const getServerSideProps = async ({ req }) => {
  const { user_token, user_info } = req.cookies;
  const setting_data = await getServerApiRequest("setting", null);
  const footer_data = await getServerApiRequest("footer-details", null);
  const gateways_data = await getServerApiRequest(`payment-gateways`, null);
  const currency_data = await getServerApiRequest(`get-current-currency`, null);

  return {
    props: {
      settings: setting_data.data.data ? setting_data.data.data : null,
      footer_info: footer_data.data.data ? footer_data.data.data : null,
      user_info: user_info ? JSON.parse(user_info) : null,
      token: user_token || null,
      gateways: gateways_data.data.data ? gateways_data.data.data : null,
      currency: currency_data.data.data ? currency_data.data.data : null,
    },
  };
};
