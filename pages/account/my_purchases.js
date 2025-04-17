import { Icon } from "@iconify/react";
import moment from "moment/moment";
import Head from "next/head";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import AccountLayout from "../../components/layout/account";
import PublicLayout from "../../components/public-layout";
import { removeAuthCookie } from "../../utils/commonFunctions";
import {
  getMyPurchaseAction,
  orderProductDownloadAction,
} from "../../redux/actions/profile";
import { getServerApiRequest } from "../../utils/serverApi";
const checkStatus = (status) => {
  switch (status) {
    case 1:
      return "Pending";
    case 2:
      return "Paid";
    case 3:
      return "Unpaid";
    default:
      return "Cancelled";
  }
};

const MyPurchase = (props) => {
  const {t} = useTranslation();
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    props.getMyPurchaseAction();
  }, []);
  const handleChange = (value) => {
    props.getMyPurchaseAction(`page=${value.selected + 1}`);
    setSelected(value.selected);
  };
  const getCurrencySymbol = (amount) => {
    if (props.currency.currency_placement === "after") {
      return amount?.toFixed(2) + " " + props.currency.currency_symbol;
    } else {
      return props.currency.currency_symbol + " " + amount?.toFixed(2);
    }
  };
  const handleDownload = (id) => {
    props.orderProductDownloadAction(id);
  };
  return (
    <Fragment>
      <Head>
        <title>My Orders</title>
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
              <div className="boards__table">
                <table>
                  <thead>
                    <tr>
                      <th>{t("Data")}</th>
                      <th>{t("Title")}</th>
                      <th>{t("Variation")}</th>
                      <th>{t("Price")}</th>
                      <th>{t("License")}</th>
                      <th>{t("Product")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!props.orders?.data?.length && (
                      <tr>
                        <td colSpan={6} className="text-center fw-bold">{t("No Data Found")}</td>
                      </tr> 
                    )}
                    {props.orders?.data?.map((order, id) => (
                      <tr key={id}>
                        <td>
                          <span className="data-text">
                            {moment(order.created_at).format("Y-MM-DD H:mm:ss")}
                          </span>
                        </td>
                        <td>
                          <span className="data-text">{order.title}</span>
                        </td>
                        <td>
                          <span className="data-text">{order.variation}</span>
                        </td>

                        <td>
                          <span className="data-text status">
                            {getCurrencySymbol(order.price)}
                          </span>
                        </td>
                        <td>
                          <span className="data-text status">
                            {order.licence}
                          </span>
                        </td>

                        <td>
                          <button
                            onClick={() => handleDownload(order.variations_id)}
                          >
                            <Icon icon="fa:download" width="20" height="20" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {props.orders?.total > props.orders?.per_page && (
                <nav className="filter-pagination mt-35">
                  <ReactPaginate
                    containerClassName="paginationWrapper"
                    pageCount={props.orders?.total / props.orders?.per_page}
                    pageRangeDisplayed={props.orders?.per_page}
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
  orders: state.profile.orders,
});
export default connect(mapStateToProps, {
  getMyPurchaseAction,
  orderProductDownloadAction,
})(MyPurchase);
export const getServerSideProps = async ({ req, res }) => {
  const { user_token } = req.cookies;

  const auth_data = await getServerApiRequest(`auth-status`, null, user_token);
  if (auth_data.data.auth_status === 'out') {
    removeAuthCookie(res);
    return {
      redirect: { destination: "/", permanent: false },
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
