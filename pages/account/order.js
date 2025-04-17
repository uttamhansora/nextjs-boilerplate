import { Icon } from "@iconify/react";
import moment from "moment/moment";
import Head from "next/head";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import AccountLayout from "../../components/layout/account";
import PublicLayout from "../../components/public-layout";
import { getMyOrdersAction, orderPdfAction } from "../../redux/actions/profile";
import { removeAuthCookie } from "../../utils/commonFunctions";
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
const MyOrders = (props) => {
  const {t} = useTranslation()
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    props.getMyOrdersAction();
  }, []);
  const handleChange = (value) => {
    props.getMyOrdersAction(`page=${value.selected + 1}`);
    setSelected(value.selected);
  };
  const handleDownload = (id) => {
    props.orderPdfAction(id);
  };
  return (
    <Fragment>
      <Head>
        <title>{t("My Orders")}</title>
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
                      <th>{t("Order No")}</th>
                      <th>{t("Amount")}</th>
                      <th>{t("Gateway")}</th>
                      <th>{t("Type")}</th>
                      <th>{t("Data")}</th>
                      <th>{t("Status")}</th>
                      <th>{t("Invoice")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!props.orders?.data?.length && (
                      <tr>
                        <td colSpan={7} className="text-center fw-bold">{t("No Data Found")}</td>
                      </tr> 
                    )}
                    {props.orders?.data?.map(
                      ({
                        id,
                        grand_total,
                        created_at,
                        gateway_currency,
                        gateway,
                        order_number,
                        type,
                        payment_status,
                      }) => (
                        <tr key={id}>
                          <td>
                            <span className="data-text">
                              #{order_number.slice(0, 6)}
                            </span>
                          </td>
                          <td>
                            <span className="data-text">
                              {grand_total} {gateway_currency}
                            </span>
                          </td>
                          <td>
                            <span className="data-text">
                              {t(gateway?.gateway_name)}
                            </span>
                          </td>
                          <td>
                            <span className="data-text status">
                              {type == 1
                                ? t("Plan")
                                : type == 2
                                ? t("Product")
                                : t("Donation")}
                            </span>
                          </td>
                          <td>
                            <span className="data-text status">
                              {moment(created_at).format("DD-MM-Y")}
                            </span>
                          </td>
                          <td>
                            <span className="data-text status">
                              {t(checkStatus(payment_status))}
                            </span>
                          </td>
                          <td>
                            <button onClick={() => handleDownload(id)}>
                              <Icon icon="fa:print" width="20" height="20" />
                            </button>
                          </td>
                        </tr>
                      )
                    )}
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
  getMyOrdersAction,
  orderPdfAction,
})(MyOrders);
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
