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
  deleteFavouriteDataAction,
  getFavouriteDataAction,
} from "../../redux/actions/profile";
import { getServerApiRequest } from "../../utils/serverApi";


const Favourites = (props) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    props.getFavouriteDataAction();
  }, []);
  const handleChange = (value) => {
    props.getFavouriteDataAction(`page=${value.selected + 1}`);
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
        props.deleteFavouriteDataAction(id);
      }
    });
  };
  return (
    <Fragment>
      <Head>
        <title>{t("My Favourtes")}</title>
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
                      <th>{t("Product")}</th>
                      <th>{t("Name")}</th>
                      <th>{t("Author")}</th>
                      <th>{t("Type")}</th>
                      <th>{t("Action")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.favourites?.data?.map(
                      ({ id, product, product_type, product_id }) => (
                        <tr key={id}>
                          <td>
                            <Link
                              href={`/[product_details]`}
                              as={`/${product.slug}`}
                            >
                              <div className="product-img">
                                <img
                                  src={product.thumbnail_image}
                                  alt="product-img"
                                />
                              </div>
                            </Link>
                          </td>
                          <td>
                            <Link
                              href={`/[product_details]`}
                              as={`/${product.slug}`}
                            >
                              <span className="data-text">
                                {t(product.title)}
                              </span>
                            </Link>
                          </td>
                          <td>
                            <span className="data-text">
                              {product?.user?.name || product?.customer?.name}
                            </span>
                          </td>
                          <td>
                            <span>{t(product_type.name)}</span>
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
                                  <a
                                    className="dropdown-item"
                                    onClick={() => handleDelete(product_id)}
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
                     {!props.favourites?.data?.length && (
                      <tr>
                        <td colSpan={5} className="text-center fw-bold">{t("No Data Found")}</td>
                      </tr> 
                    )}
                  </tbody>
                </table>
              </div>
              {props.favourites?.total > props.favourites?.per_page && (
                <nav className="filter-pagination mt-35">
                  <ReactPaginate
                    containerClassName="paginationWrapper"
                    pageCount={
                      props.favourites?.total / props.favourites?.per_page
                    }
                    pageRangeDisplayed={props.favourites?.per_page}
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
  favourites: state.profile.favourites,
});
export default connect(mapStateToProps, {
  getFavouriteDataAction,
  deleteFavouriteDataAction,
})(Favourites);
export const getServerSideProps = async ({ req, res }) => {
  const { user_token } = req.cookies;

  const auth_data = await getServerApiRequest(`auth-status`, null, user_token);
  if (auth_data.data.auth_status === 'out') {
    removeAuthCookie(res);
    return {
      redirect: { destination: "/", permanent: false },
    };
  }
  const setting_data = await getServerApiRequest("setting", null);
  const footer_data = await getServerApiRequest("footer-details", null);
  return {
    props: {
      user_info: auth_data.data.customer ? auth_data.data.customer : null,
      settings: setting_data.data.data ? setting_data.data.data : null,
      footer_info: footer_data.data.data ? footer_data.data.data : null,
      token: user_token || null,
    },
  };
};
