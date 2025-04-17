import moment from "moment/moment";
import Head from "next/head";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import AccountLayout from "../../components/layout/account";
import PublicLayout from "../../components/public-layout";
import { getWithdroalDataAction } from "../../redux/actions/profile";
import { getServerApiRequest } from "../../utils/serverApi";
import { removeAuthCookie } from "../../utils/commonFunctions";

const WithdrawHistory = (props) => {
  const {t} = useTranslation();
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    props.getWithdroalDataAction();
  }, []);
  const handleChange = (value) => {
    props.getWithdroalDataAction(`page=${value.selected + 1}`);
    setSelected(value.selected);
  };
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
        <title>{t("Withdraw History")}</title>
      </Head>
      <PublicLayout
        settings={props.settings}
        footer_info={props.footer_info}
        user_info={props.user_info}
        token={props.token}
      >
        <AccountLayout user_info={props.user_info}>
          <div className="dashboard__content">
            <div className="my-product__content">
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
                    {!props.my_withdrow?.data?.length && (
                      <tr>
                        <td colSpan={4} className="text-center fw-bold">{t("No Data Found")}</td>
                      </tr> 
                    )}
                    {props.my_withdrow?.data?.map(
                      ({ id, amount, gateway_name, status, created_at }) => (
                        <tr key={id}>
                          <td>
                            <span className="data-text">
                              {getCurrencySymbol(amount)}
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
                                ? t("Pending")
                                : status === 2
                                ? t("Completed")
                                : t("Cancelled")}
                            </span>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
              {props.my_withdrow?.total > props.my_withdrow?.per_page && (
                <nav className="filter-pagination mt-35">
                  <ReactPaginate
                    containerClassName="paginationWrapper"
                    pageCount={
                      props.my_withdrow?.total / props.my_withdrow?.per_page
                    }
                    pageRangeDisplayed={props.my_withdrow?.per_page}
                    onPageChange={handleChange}
                    nextLabel={<i className="fa fa-angle-right"></i>}
                    previousLabel={<i className="fa fa-angle-left"></i>}
                    forcePage={selected}
                  />
                </nav>
              )}
            </div>
          </div>
          <div className="row g-4 mt-2">
            <div className="col-sm-4 offset-sm-8">
              <Link href="/account/my-earnings" className="btn bg-theme w-100">
                {t("Back To Earning")}
              </Link>
            </div>
          </div>
        </AccountLayout>
      </PublicLayout>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  my_withdrow: state.profile.my_withdrow,
});
export default connect(mapStateToProps, {
  getWithdroalDataAction,
})(WithdrawHistory);
export const getServerSideProps = async ({ req, res }) => {
  const { user_token } = req.cookies;

  const auth_data = await getServerApiRequest(`auth-status`, null, user_token);
  if (auth_data.data.auth_status === 'out') {
    removeAuthCookie(res);
    return {
      redirect: { destination: "/", permanent: false },
    };
  }
  if (auth_data.data.customer.role !== 2) {
    return {
      redirect: { destination: "/account/profile", permanent: false },
    };
  }
  const currency_data = await getServerApiRequest(`get-current-currency`, null);
  const setting_data = await getServerApiRequest("setting", null);
  const footer_data = await getServerApiRequest("footer-details", null);
  return {
    props: {
      currency: currency_data.data.data ? currency_data.data.data : null,
      user_info: auth_data.data.customer ? auth_data.data.customer : null,
      settings: setting_data.data.data ? setting_data.data.data : null,
      footer_info: footer_data.data.data ? footer_data.data.data : null,
      token: user_token || null,
    },
  };
};
