import { Icon } from "@iconify/react";
import Head from "next/head";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import AddPaymentMethod from "../../components/account/MyEarnings/AddPaymentMethod/index";
import Withdraw from "../../components/account/MyEarnings/Withdraw";
import AccountLayout from "../../components/layout/account";
import PublicLayout from "../../components/public-layout";
import { getServerApiRequest } from "../../utils/serverApi";
import { removeAuthCookie } from "../../utils/commonFunctions";
const MyEarning = (props) => {
  const {t} = useTranslation();
  const [addPaymentShow, setAddPaymentShow] = useState(false);
  const [withdrawShow, setWithdrawShow] = useState(false);
  const getCurrencySymbol = (amount) => {
    if (props.currency.currency_placement === "after") {
      return amount.toFixed(2) + " " + props.currency.currency_symbol;
    } else {
      return props.currency.currency_symbol + " " + amount.toFixed(2);
    }
  };
  return (
    <Fragment>
      <Head>
        <title>{t("My Earning")}</title>
      </Head>
      <PublicLayout
        settings={props.settings}
        footer_info={props.footer_info}
        user_info={props.user_info}
        token={props.token}
      >
        <AccountLayout user_info={props.user_info}>
          <div className="my-earnings__content">
            <div className="row">
              <div className="col-xl-4 col-md-6">
                <div className="earning-status">
                  <div className="status-img">
                    <Icon icon="bi:currency-dollar" width="24" height="24" />
                  </div>
                  <div className="status-info">
                    <p>{t("Total Earnings")}</p>
                    <h2>
                      {getCurrencySymbol(
                        Number(props.earning.totalEarningBalance)
                      )}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-6">
                <div className="earning-status">
                  <div className="status-img">
                    <Icon icon="bi:currency-dollar" width="24" height="24" />
                  </div>
                  <div className="status-info">
                    <p>{t("Available Balance")}</p>
                    <h2>
                      {getCurrencySymbol(
                        Number(props.earning.totalAvailableBalance)
                      )}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-6">
                <div className="earning-status">
                  <div className="status-img">
                    <Icon icon="bi:currency-dollar" width="24" height="24" />
                  </div>
                  <div className="status-info">
                    <p>{t("Wallet Balance")}</p>
                    <h2>
                      {getCurrencySymbol(
                        Number(props.earning.totalWalletBalance)
                      )}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-6">
                <div className="earning-status">
                  <div className="status-img">
                    <Icon icon="bi:currency-dollar" width="24" height="24" />
                  </div>
                  <div className="status-info">
                    <p>{t("Total Download")}</p>
                    <h2>{props.earning.totalDownload}</h2>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-6">
                <div className="earning-status">
                  <div className="status-img">
                    <Icon icon="bi:currency-dollar" width="24" height="24" />
                  </div>
                  <div className="status-info">
                    <p>{t("Withdraw Completed")}</p>
                    <h2>
                      {getCurrencySymbol(
                        Number(props.earning.totalWithdrawCompletedAmount)
                      )}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-6">
                <div className="earning-status">
                  <div className="status-img">
                    <Icon icon="bi:currency-dollar" width="24" height="24" />
                  </div>
                  <div className="status-info">
                    <p>{t("Withdraw Pending")}</p>
                    <h2>
                      {getCurrencySymbol(
                        Number(props.earning.totalWithdrawPendingAmount)
                      )}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-sm-4">
              <button
                onClick={() => setAddPaymentShow(true)}
                className="btn btn-black w-100"
              >
                {t("Add Payment Method")}
              </button>
            </div>
            <div className="col-sm-4">
              <button
                onClick={() => setWithdrawShow(true)}
                className="btn btn-outline-theme w-100"
              >
                {t("Withdraw")}
              </button>
            </div>
            <div className="col-sm-4">
              <Link
                href="/account/withdraw-history"
                className="btn bg-theme w-100"
              >
                {t("Withdraw History")}
              </Link>
            </div>
          </div>
        </AccountLayout>
      </PublicLayout>
      <AddPaymentMethod
        addPaymentShow={addPaymentShow}
        setAddPaymentShow={setAddPaymentShow}
        card_info={props.card_info}
      />
      <Withdraw
        withdrawShow={withdrawShow}
        setWithdrawShow={setWithdrawShow}
        totalAvailableBalance={props.earning.totalAvailableBalance}
        currency={props.currency}
      />
    </Fragment>
  );
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {})(MyEarning);
export const getServerSideProps = async ({ req, res }) => {
  const { user_token } = req.cookies;

  const auth_data = await getServerApiRequest(`auth-status`, null, user_token);
  if (auth_data.data.auth_status === 'out') {
    removeAuthCookie(res);
    return {
      redirect: { destination: "/", permanent: false },
    };
  }
  const earning_data = await getServerApiRequest(
    `my-earning`,
    null,
    user_token
  );
  const currency_data = await getServerApiRequest(`get-current-currency`, null);
  const setting_data = await getServerApiRequest("setting", null);
  const footer_data = await getServerApiRequest("footer-details", null);
  const card_info_data = await getServerApiRequest(
    "my-withdraw-cards",
    null,
    user_token
  );

  return {
    props: {
      currency: currency_data.data.data ? currency_data.data.data : null,
      earning: earning_data.data.data ? earning_data.data.data : null,
      user_info: auth_data.data.customer ? auth_data.data.customer : null,
      settings: setting_data.data.data ? setting_data.data.data : null,
      footer_info: footer_data.data.data ? footer_data.data.data : null,
      card_info: card_info_data.data ? card_info_data.data : null,
      token: user_token || null,
    },
  };
};
