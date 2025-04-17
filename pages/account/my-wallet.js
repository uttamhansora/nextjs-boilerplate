import Head from "next/head";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
// import Withdraw from "../../components/account/MyEarnings/Withdraw";
import moment from "moment/moment";
import ReactPaginate from "react-paginate";
import AccountLayout from "../../components/layout/account";
import PublicLayout from "../../components/public-layout";
import { removeAuthCookie } from "../../utils/commonFunctions";
import {
  getMyDepositAction,
  getMyWalletAction,
} from "../../redux/actions/profile";
import { getServerApiRequest } from "../../utils/serverApi";
import { useTranslation } from "react-i18next";

const MyWallet = (props) => {
  const {t} = useTranslation()
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [selected, setSelected] = useState(0);

  const handleChange = (value) => {
    props.getMyDepositAction(`page=${value.selected + 1}`);
    setSelected(value.selected);
  };
  const getCurrencySymbol = (amount) => {
    if (props.currency.currency_placement === "after") {
      return amount?.toFixed(2) + " " + props.currency.currency_symbol;
    } else {
      return props.currency.currency_symbol + " " + amount?.toFixed(2);
    }
  };
  useEffect(() => {
    props.getMyWalletAction();
    props.getMyDepositAction();
  }, []);
  const handleSubmit = () => {
    if (amount) {
      router.push(`/pay?type=wallet&amount=${amount}`);
    } else {
      toast.error("amount can not be empty");
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
          <div className="wallet-area mb-5">
            <div className="balance-wrapper">
              <div>
                <h3>
                  {getCurrencySymbol(parseInt(props.my_wallet?.wallet_balance))}
                </h3>
                <p>{t("Funds available in your account")}</p>
              </div>
            </div>
            <div className="diposit-area mt-4">
              <div className="mb-2">
                {t("Add Wallet Money Range")}{" "}
                <b>
                  (
                  {getCurrencySymbol(
                    parseInt(props.my_wallet?.min_wallet_amount)
                  )}{" "}
                  -{" "}
                  {getCurrencySymbol(
                    parseInt(props.my_wallet?.max_wallet_amount)
                  )}
                  )
                </b>
              </div>
              <form>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="amount-input"
                  placeholder={t("Amount")}
                  required
                />

                <button
                  type="button"
                  className="btn btn-black w-100 mt-4"
                  onClick={handleSubmit}
                >
                  {t("Add Funds")}
                </button>
              </form>
            </div>
          </div>
          <div className="dashboard__content ">
            <div className="my-product__content">
              <h4 className="mb-3">{t("Withdraw History")}</h4>
              <div className="my-product__table">
                <table>
                  <thead>
                    <tr>
                      <th>{t("Amount")}</th>
                      <th>{t("Method")}</th>
                      <th>{t("Date")}</th>
                      <th>{t("Status")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.deposit?.data?.map(
                      ({ id, amount, gateway_name, status, created_at }) => (
                        <tr key={id}>
                          <td>
                            <span className="data-text">
                              {getCurrencySymbol(parseInt(amount))}
                            </span>
                          </td>
                          <td>
                            <span className="data-text">{gateway_name}</span>
                          </td>
                          <td>
                            <span className="data-text">
                              {moment(created_at).format("DD-MM-YY")}
                            </span>
                          </td>
                          <td>
                            <span className="data-text status">
                              {status === 1
                                ? "Paid"
                                : status === 2
                                ? "Pending"
                                : "Cancelled"}
                            </span>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
              {props.deposit?.total > props.deposit?.per_page && (
                <nav className="filter-pagination mt-35">
                  <ReactPaginate
                    containerClassName="paginationWrapper"
                    pageCount={props.deposit?.total / props.deposit?.per_page}
                    pageRangeDisplayed={props.deposit?.per_page}
                    onPageChange={handleChange}
                    nextLabel={<i className="fa fa-angle-right"></i>}
                    previousLabel={<i className="fa fa-angle-left"></i>}
                    forcePage={selected}
                  />
                </nav>
              )}
            </div>
          </div>
        </AccountLayout>
      </PublicLayout>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  my_wallet: state.profile.my_wallet,
  deposit: state.profile.deposit,
});
export default connect(mapStateToProps, {
  getMyWalletAction,
  getMyDepositAction,
})(MyWallet);
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
  return {
    props: {
      currency: currency_data.data.data ? currency_data.data.data : null,
      earning: earning_data.data.data ? earning_data.data.data : null,
      user_info: auth_data.data.customer ? auth_data.data.customer : null,
      settings: setting_data.data.data ? setting_data.data.data : null,
      footer_info: footer_data.data.data ? footer_data.data.data : null,
      token: user_token || null,
    },
  };
};
