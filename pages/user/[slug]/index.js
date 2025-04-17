import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import CreateBoard from "../../../components/common/createBoard";
import ReportUser from "../../../components/members/report";
import PublicLayout from "../../../components/public-layout";
import SingleAudio from "../../../components/singleAudio";
import SingleImage from "../../../components/singleImage";
import SingleVideo from "../../../components/singleVideo";
import MetaHead from "../../../components/MetaHead";
import {
  addFollowAction,
  getUserProductsAction,
} from "../../../redux/actions/common";
import { getServerApiRequest } from "../../../utils/serverApi";
import { useTranslation } from "react-i18next";
const UserDetails = (props) => {
  const {t} = useTranslation();
  const router = useRouter();
  const [reportShow, setReportShow] = useState(false);
  const [activeId, setActiveId] = useState(
    props.user_details.productTypes[0].id
  );
  const [saveModal, setSaveModal] = useState(false);
  const [selected, setSelected] = useState(0);
  const [productId, setProductId] = useState(null);
  const handleOpenSave = () => {
    setSaveModal(true);
  };
  const [follow, setFollow] = useState(
    props.user_details.user.user_follow_by_auth_customer ? true : false
  );
  const handleFollow = () => {
    const data = {
      following_customer_id: props.user_details.user.id,
    };
    props.addFollowAction(data, setFollow, follow);
  };
  const handleChnageProduct = (id) => {
    setActiveId(id);
    props.getUserProductsAction(props.user_details.user.id, id);
  };
  useEffect(() => {
    props.getUserProductsAction(props.user_details.user.id, activeId);
  }, [props.user_details.user.id]);
  const handleChange = (value) => {
    props.getUserProductsAction(
      props.user_details.user.id,
      activeId,
      `page=${value.selected + 1}`
    );
    setSelected(value.selected);
  };
  return (
    <Fragment>
      <MetaHead
        seo_title={props.user_details.user.name}
        seo_description={props.user_details.user.name}
        seo_keyword={props.meta?.meta_description}
        seo_image={props.user_details.user.image}
      />
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
              src={props.user_details.user.cover_image}
              alt={props.user_details.user.name}
            />
          </div>
          <div className="profile-header-wrapper">
            <div className="container">
              <div className="user-profile-header">
                <div className="left">
                  <div className="img-box">
                    <img
                      src={props.user_details.user.image}
                      alt={props.user_details.user.name}
                    />
                  </div>
                  <div>
                    <h4>{props.user_details.user.name}</h4>
                    {props.user_details.customer?.address && (
                      <span>
                        <Icon
                          icon="akar-icons:location"
                          width="18"
                          height="18"
                        />{" "}
                        {props.user_details?.user.address}
                      </span>
                    )}
                  </div>
                </div>
                {props.user_info?.id != props.user_details.user.id && (
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
                  as={`/user/${router.query.slug}`}
                  href="/user/[slug]"
                  className={
                    router.asPath == `/user/${router.query.slug}`
                      ? "active"
                      : ""
                  }
                >
                  {t("Products")}
                </Link>
                <Link
                  as={`/user/${router.query.slug}/follower`}
                  href="/user/[slug]/follower"
                  className={
                    router.asPath == `/user/${router.query.slug}/follower`
                      ? "active"
                      : ""
                  }
                >
                  {t("Follower")}
                </Link>
              </div>
            </div>
          </div>
          <div className="profile-area">
            <div className="profile-header">
              <div className="container">
                <div className="header-type-btns">
                  {props.user_details.productTypes.map(({ id, slug, name }) => (
                    <button
                      className={activeId == id ? "active" : null}
                      key={id}
                      onClick={() => handleChnageProduct(id)}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row g-4 gallery">
                {props.products?.data?.length === 0 ? (
                  <h2 className="text-center pt-5">No Data Found</h2>
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
        reportedCategories={props.user_details.reportedCategories}
        customer_id={props.user_details.user.id}
      />
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  products: state.common.user_products,
});
export default connect(mapStateToProps, {
  addFollowAction,
  getUserProductsAction,
})(UserDetails);
export const getServerSideProps = async ({ req, query }) => {
  const { user_token, user_info } = req.cookies;
  const setting_data = await getServerApiRequest("setting", null);
  const footer_data = await getServerApiRequest("footer-details", null);
  const get_details_data = await getServerApiRequest(
    `user-details/${query.slug}`,
    null
  );
  const product_type_data = await getServerApiRequest(`product-type`, null);

  return {
    props: {
      settings: setting_data.data.data,
      footer_info: footer_data.data.data,
      user_info: user_info ? JSON.parse(user_info) : null,
      token: user_token || null,
      user_details: get_details_data.data.data,
      product_types: product_type_data.data.data,
    },
  };
};
