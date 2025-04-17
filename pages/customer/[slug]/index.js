import { Icon } from "@iconify/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import CreateBoard from "../../../components/common/createBoard";
import ReportUser from "../../../components/members/report";
import PublicLayout from "../../../components/public-layout";
import SingleAudio from "../../../components/singleAudio";
import SingleImage from "../../../components/singleImage";
import SingleVideo from "../../../components/singleVideo";
import {
  addFollowAction,
  getCustomerProductsAction,
} from "../../../redux/actions/common";
import { getServerApiRequest } from "../../../utils/serverApi";
const CustomerDetails = (props) => {
  const {t} = useTranslation()
  const router = useRouter();
  const [reportShow, setReportShow] = useState(false);
  const [activeId, setActiveId] = useState(
    props.customer_details.productTypes[0].id
  );
  const [saveModal, setSaveModal] = useState(false);
  const [selected, setSelected] = useState(0);
  const [productId, setProductId] = useState(null);
  const handleOpenSave = () => {
    setSaveModal(true);
  };
  const [follow, setFollow] = useState(
    props.customer_details.customer.customer_follow_by_auth_customer
      ? true
      : false
  );
  const handleFollow = () => {
    const data = {
      following_customer_id: props.customer_details.customer.id,
    };
    props.addFollowAction(data, setFollow, follow);
  };
  const handleChnageProduct = (id) => {
    setActiveId(id);
    props.getCustomerProductsAction(props.customer_details.customer.id, id);
  };
  useEffect(() => {
    props.getCustomerProductsAction(
      props.customer_details.customer.id,
      activeId
    );
  }, [props.customer_details.customer.id]);
  const handleChange = (value) => {
    props.getCustomerProductsAction(
      props.customer_details.customer.id,
      activeId,
      `page=${value.selected + 1}`
    );
    setSelected(value.selected);
  };
  return (
    <Fragment>
      <Head>
        <title>{props.customer_details.customer.name}</title>
        <meta name="description" content="Details Description" />
        <meta name="keywords" content="Details Keywords" />
        <meta
          property="og:image"
          content={props.customer_details.customer.image}
        />
        <meta
          property="og:title"
          content={props.customer_details.customer.name}
        />
        <meta property="og:description" content="Details Description" />
        <meta
          name="twitter:title"
          content={props.customer_details.customer.name}
        />
        <meta name="twitter:description" content="Details Description" />
        <meta
          name="twitter:image"
          content={props.customer_details.customer.image}
        />
        <meta name="robots" content="max-image-preview:large" />
      </Head>
      <PublicLayout
        settings={props.settings}
        footer_info={props.footer_info}
        user_info={props.user_info}
        token={props.token}
      >
        <div className="user-profile-area">
          <div className="user-banner-wrapper">
            <img
              className="img"
              src={props.customer_details.customer.cover_image}
              alt={props.customer_details.customer.name}
            />
          </div>
          <div className="profile-header-wrapper">
            <div className="container">
              <div className="user-profile-header">
                <div className="left">
                  <div className="img-box">
                    <img
                      src={props.customer_details.customer.image}
                      alt={props.customer_details.customer.name}
                    />
                  </div>
                  <div>
                    <h4>{props.customer_details.customer.name}</h4>
                    {props.customer_details.customer?.address && (
                      <span>
                        <Icon
                          icon="akar-icons:location"
                          width="18"
                          height="18"
                        />{" "}
                        {props.customer_details?.customer.address}
                      </span>
                    )}
                  </div>
                </div>
                {props.user_info?.id != props.customer_details.customer.id && (
                  <div className="right">
                    <button
                      onClick={handleFollow}
                      className={`btn btn-black follow-unfollow ${
                        follow ? "yes" : ""
                      }`}
                    >
                      <span className="follow">{t("Follow")}</span>
                      <span className="unfollow">{t("Unfollow")}</span>
                    </button>
                    <span
                      onClick={() => setReportShow(true)}
                      className="flag-icon"
                    >
                      <Icon icon="charm:flag" width="20" height="20" />
                    </span>
                  </div>
                )}
              </div>
              <div className="profile-menu">
                <Link
                  as={`/customer/${router.query.slug}`}
                  href="/customer/[slug]"
                  className={
                    router.asPath == `/customer/${router.query.slug}`
                      ? "active"
                      : ""
                  }
                >
                  {t("Products")}
                </Link>
                <Link
                  as={`/customer/${router.query.slug}/follower`}
                  href="/customer/[slug]/follower"
                  className={
                    router.asPath == `/customer/${router.query.slug}/follower`
                      ? "active"
                      : ""
                  }
                >
                  {t("Follower")}
                </Link>
                <Link
                  as={`/customer/${router.query.slug}/following`}
                  href="/customer/[slug]/following"
                  className={
                    router.asPath == `/customer/${router.query.slug}/following`
                      ? "active"
                      : ""
                  }
                >
                  {t("Following")}
                </Link>
              </div>
            </div>
          </div>
          <div className="profile-area">
            <div className="profile-header">
              <div className="container">
                <div className="header-type-btns">
                  {props.customer_details.productTypes.map(
                    ({ id, slug, name }) => (
                      <button
                        className={activeId == id ? "active" : null}
                        key={id}
                        onClick={() => handleChnageProduct(id)}
                      >
                        {name}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row g-4 gallery">
                {props.products?.data?.length === 0 ? (
                  <h2 className="text-center pt-5">{t("No Data Found")}</h2>
                ) : (
                  props.products?.data?.map((item, i) => (
                    <div className="col-xl-3 col-lg-4 col-md-6 col-12" key={i}>
                      {item.product_type_id === 5 ? (
                        <SingleAudio
                          item={item}
                          handleOpenSave={() => {
                            handleOpenSave;
                            setProductId(item.id);
                          }}
                        />
                      ) : item.product_type_id === 3 ? (
                        <SingleVideo
                          item={item}
                          handleOpenSave={() => {
                            handleOpenSave;
                            setProductId(item.id);
                          }}
                        />
                      ) : (
                        <SingleImage
                          item={item}
                          handleOpenSave={() => {
                            handleOpenSave;
                            setProductId(item.id);
                          }}
                        />
                      )}
                    </div>
                  ))
                )}
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
        </div>
      </PublicLayout>
      <CreateBoard
        isOpen={saveModal}
        hideModal={() => setSaveModal(false)}
        productId={productId}
      />
      <ReportUser
        reportShow={reportShow}
        setReportShow={setReportShow}
        reportedCategories={props.customer_details.reportedCategories}
        customer_id={props.customer_details.customer.id}
      />
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  products: state.common.customer_products,
});

export default connect(mapStateToProps, {
  addFollowAction,
  getCustomerProductsAction,
})(CustomerDetails);
export const getServerSideProps = async ({ req, query }) => {
  const { user_token, user_info } = req.cookies;
  const auth_data = await getServerApiRequest(`auth-status`, null, user_token);
  const setting_data = await getServerApiRequest("setting", null);
  const footer_data = await getServerApiRequest("footer-details", null);
  const get_details_data = await getServerApiRequest(
    `customer-details/${query.slug}`,
    null
  );
  const product_type_data = await getServerApiRequest(`product-type`, null);

  return {
    props: {
      settings: setting_data.data.data ? setting_data.data.data : null,
      footer_info: footer_data.data.data ? footer_data.data.data : null,
      user_info: user_info ? JSON.parse(user_info) : null,
      token: user_token || null,
      product_types: product_type_data.data.data
        ? product_type_data.data.data
        : null,
      customer_details: get_details_data.data.data
        ? get_details_data.data.data
        : null,
    },
  };
};
