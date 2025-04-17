import moment from "moment/moment";
import Head from "next/head";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import AccountLayout from "../../components/layout/account";
import PublicLayout from "../../components/public-layout";
import productTypeCheck from "../../helpers/productTypeCheck";
import { getMyProductSaleDataAction } from "../../redux/actions/profile";
import { getServerApiRequest } from "../../utils/serverApi";
import { removeAuthCookie } from "../../utils/commonFunctions";
import { useTranslation } from "react-i18next";

const AllSales = (props) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    props.getMyProductSaleDataAction();
  }, []);
  const handleChange = (value) => {
    props.getMyProductSaleDataAction(`page=${value.selected + 1}`);
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
        <title>{t("My Sales")}</title>
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
                      <th>{t("My Sales")}</th>
                      <th>{t("Name")}</th>
                      <th>{t("Type")}</th>
                      <th>{t("Date")}</th>
                      <th>{t("Earnings")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!props.my_sales?.data?.length && (
                      <tr>
                        <td colSpan={5} className="text-center fw-bold">{t("No Data Found")}</td>
                      </tr> 
                    )}
                    {props.my_sales?.data?.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="data-info">
                            <Link
                              href={`/[product_details]`}
                              as={`/${item.product.slug}`}
                            >
                              <div className="product-img">
                                <img
                                  src={item.product.thumbnail_image}
                                  alt="product-img"
                                />
                              </div>
                            </Link>
                          </div>
                        </td>
                        <td>
                          <Link
                            className="data-text"
                            href={`/[product_details]`}
                            as={`/${item.product.slug}`}
                          >
                            {t(item.product.title)}
                          </Link>
                        </td>
                        <td>
                          <span className="data-text">
                            {t(productTypeCheck(item.product_type_id))}
                          </span>
                        </td>
                        <td>
                          <span className="data-text">
                            {moment(item.updated_at).format("DD MMM Y")}
                          </span>
                        </td>
                        <td>
                          <span className="data-text">
                            {getCurrencySymbol(
                              Number(item.contributor_commission)
                            )}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {props.my_sales?.total > props.my_sales?.per_page && (
                <nav className="filter-pagination mt-35">
                  <ReactPaginate
                    containerClassName="paginationWrapper"
                    pageCount={props.my_sales?.total / props.my_sales?.per_page}
                    pageRangeDisplayed={props.my_sales?.per_page}
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
  my_sales: state.profile.my_sales,
});
export default connect(mapStateToProps, {
  getMyProductSaleDataAction,
})(AllSales);
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
      user_info: auth_data.data.customer ? auth_data.data.customer : null,
      currency: currency_data.data.data ? currency_data.data.data : null,
      settings: setting_data.data.data ? setting_data.data.data : null,
      footer_info: footer_data.data.data ? footer_data.data.data : null,
      token: user_token || null,
    },
  };
};
