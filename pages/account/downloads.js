import Head from "next/head";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import AccountLayout from "../../components/layout/account";
import PublicLayout from "../../components/public-layout";
import productTypeCheck from "../../helpers/productTypeCheck";
import { getDownloadsDataAction } from "../../redux/actions/profile";
import { getServerApiRequest } from "../../utils/serverApi";
import { removeAuthCookie } from "../../utils/commonFunctions";
import { useTranslation } from "react-i18next";

const Downloads = (props) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    props.getDownloadsDataAction();
  }, []);
  const handleChange = (value) => {
    props.getDownloadsDataAction(`page=${value.selected + 1}`);
    setSelected(value.selected);
  };
  return (
    <Fragment>
      <Head>
        <title>{t("My Downloads")}</title>
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
                      <th>{t("Downloads")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!props.downloads?.data?.length && (
                      <tr>
                        <td colSpan={5} className="text-center fw-bold">{t("No Data Found")}</td>
                      </tr> 
                    )}
                    {props.downloads?.data?.map(
                      ({
                        id,
                        title,
                        thumbnail_image,
                        slug,
                        product_type_id,
                        user,
                        customer,
                        download_products_count,
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
                              href={`/[product_details]`}
                              as={`/${slug}`}
                              className="data-text"
                            >
                              {t(title)}
                            </Link>
                          </td>
                          <td>
                            <span className="data-text">
                              {user?.name || customer?.name}
                            </span>
                          </td>
                          <td>
                            <span className="data-text">
                              {t(productTypeCheck(product_type_id))}
                            </span>
                          </td>
                          <td>
                            <span className="data-text">
                              {download_products_count}
                            </span>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
              {props.downloads?.total > props.downloads?.per_page && (
                <nav className="filter-pagination mt-35">
                  <ReactPaginate
                    containerClassName="paginationWrapper"
                    pageCount={
                      props.downloads?.total / props.downloads?.per_page
                    }
                    pageRangeDisplayed={props.downloads?.per_page}
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
  downloads: state.profile.downloads,
});
export default connect(mapStateToProps, {
  getDownloadsDataAction,
})(Downloads);
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
