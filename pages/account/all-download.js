import moment from "moment/moment";
import Head from "next/head";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import AccountLayout from "../../components/layout/account";
import PublicLayout from "../../components/public-layout";
import productTypeCheck from "../../helpers/productTypeCheck";
import { getMyDownloadsDataAction } from "../../redux/actions/profile";
import { getServerApiRequest } from "../../utils/serverApi";
import { removeAuthCookie } from "../../utils/commonFunctions";
import { useTranslation } from "react-i18next";

const AllDownload = (props) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    props.getMyDownloadsDataAction();
  }, []);
  const handleChange = (value) => {
    props.getMyDownloadsDataAction(`page=${value.selected + 1}`);
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
        <title>{t("All Downloads")}</title>
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
              <div className="download__table">
                <table>
                  <thead>
                    <tr>
                      <th>{t("Products")}</th>
                      <th>{t("Customer")}</th>
                      <th>{t("Name")}</th>
                      <th>{t("Type")}</th>
                      <th>{t("Date")}</th>
                      <th>{t("Earnings")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!props.all_downloads?.data?.length && (
                      <tr>
                        <td colSpan={6} className="text-center fw-bold">{t("No Data Found")}</td>
                      </tr> 
                    )}
                    {props.all_downloads?.data?.map(
                      ({
                        id,
                        thumbnail_image,
                        name,
                        slug,
                        earn_money,
                        updated_at,
                        product_type_id,
                        title,
                      }) => (
                        <tr key={id}>
                          <td>
                            <div className="data-info">
                              <Link href={`/[product_details]`} as={`/${slug}`}>
                                <div className="product-img">
                                  <img
                                    src={thumbnail_image}
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
                              as={`/${slug}`}
                            >
                              {name}
                            </Link>
                          </td>
                          <td>
                            <span className="data-text">
                              {t(title)}
                            </span>
                          </td>
                          <td>
                            <span className="data-text">
                              {t(productTypeCheck(product_type_id))}
                            </span>
                          </td>
                          <td>
                            <span className="data-text">
                              {moment(updated_at).format("DD MMM Y")}
                            </span>
                          </td>
                          <td>
                            <span className="data-text">
                              {getCurrencySymbol(Number(earn_money))}
                            </span>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
              {props.all_downloads?.total > props.all_downloads?.per_page && (
                <nav className="filter-pagination mt-35">
                  <ReactPaginate
                    containerClassName="paginationWrapper"
                    pageCount={
                      props.all_downloads?.total / props.all_downloads?.per_page
                    }
                    pageRangeDisplayed={props.all_downloads?.per_page}
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
  all_downloads: state.profile.all_downloads,
});
export default connect(mapStateToProps, {
  getMyDownloadsDataAction,
})(AllDownload);
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
