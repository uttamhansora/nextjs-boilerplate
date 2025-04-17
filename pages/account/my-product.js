import { Icon } from "@iconify/react";
import Head from "next/head";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import AccountLayout from "../../components/layout/account";
import PublicLayout from "../../components/public-layout";
import { removeAuthCookie } from "../../utils/commonFunctions";
import {
  deleteMyProductDataAction,
  getMyProductDataAction,
} from "../../redux/actions/profile";
import { getServerApiRequest } from "../../utils/serverApi";

const MyProducts = (props) => {
  const {t} = useTranslation()
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    props.getMyProductDataAction();
  }, []);
  const handleChange = (value) => {
    props.getMyProductDataAction(`page=${value.selected + 1}`);
    setSelected(value.selected);
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        props.deleteMyProductDataAction(id);
      }
    });
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
        <title>{t("My Product")}</title>
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
                      <th>{t("Thumbnail")}</th>
                      <th>{t("Title")}</th>
                      <th>{t("Sales")}</th>
                      <th>{t("Downloads")}</th>
                      <th>{t("Earnings")}</th>
                      <th>{t("Action")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!props.products?.data?.length && (
                      <tr>
                        <td colSpan={6} className="text-center fw-bold">{t("No Data Found")}</td>
                      </tr> 
                    )}
                    {props.products?.data?.map(
                      ({
                        id,
                        thumbnail,
                        title,
                        status,
                        slug,
                        uuid,
                        singleSalesCount,
                        singleSalesAmount,
                        downloadSalesAmount,
                        downloadSalesCount,
                      }) => (
                        <tr key={id}>
                          <td>
                            <Link href={`/[product_details]`} as={`/${slug}`}>
                              <div className="product-img">
                                <img src={thumbnail} alt="product-img" />
                              </div>
                            </Link>
                          </td>
                          <td>
                            {status == 1 ? (
                              <Link
                                className="data-text"
                                href={`/[product_details]`}
                                as={`/${slug}`}
                              >
                                {t(title)}
                              </Link>
                            ) : (
                              <span className="data-text">
                                {t(title)}
                              </span>
                            )}
                          </td>
                          <td>
                            <span className="data-text">
                              <strong>{singleSalesCount}</strong> (
                              {getCurrencySymbol(Number(singleSalesAmount))})
                            </span>
                          </td>
                          <td>
                            <span className="data-text">
                              <strong>{downloadSalesCount}</strong> (
                              {getCurrencySymbol(Number(downloadSalesAmount))})
                            </span>
                          </td>
                          <td>
                            <span className="data-text">
                              {getCurrencySymbol(
                                Number(singleSalesAmount + downloadSalesAmount)
                              )}
                            </span>
                          </td>
                          <td>
                            <div className="dropdown my-product-action-dropdown">
                              <a role="button" data-bs-toggle="dropdown">
                                <Icon
                                  icon="bi:three-dots"
                                  width="24"
                                  height="24"
                                />
                              </a>
                              <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                  <Link
                                    className="dropdown-item"
                                    as={`/account/edit-product/${slug}`}
                                    href="/account/edit-product/[slug]"
                                  >
                                    <Icon
                                      icon="fluent:edit-16-regular"
                                      width="20"
                                      height="20"
                                    />
                                    {t("Edit")}
                                  </Link>
                                </li>
                                <li>
                                  <a
                                    className="dropdown-item"
                                    onClick={() => handleDelete(uuid)}
                                  >
                                    <Icon
                                      icon="bx:trash"
                                      width="20"
                                      height="20"
                                    />
                                    {t("Delete")}
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
              {props.products?.total > props.products?.per_page && (
                <nav className="filter-pagination mt-35">
                  <ReactPaginate
                    containerClassName="paginationWrapper"
                    pageCount={props.products?.total / props.products?.per_page}
                    pageRangeDisplayed={props.products?.per_page}
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
  products: state.profile.products,
});
export default connect(mapStateToProps, {
  getMyProductDataAction,
  deleteMyProductDataAction,
})(MyProducts);
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
