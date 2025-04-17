import { Icon } from "@iconify/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import ReportUser from "../../../components/members/report";
import PublicLayout from "../../../components/public-layout";
import MetaHead from "../../../components/MetaHead";
import {
  addFollowAction,
  getUserFollowerAction,
} from "../../../redux/actions/common";
import { getServerApiRequest } from "../../../utils/serverApi";
import { useTranslation } from "react-i18next";
const UserDetailsFollower = (props) => {
  const {t} = useTranslation()
  const router = useRouter();
  const [reportShow, setReportShow] = useState(false);

  const [selected, setSelected] = useState(0);

  const [follow, setFollow] = useState(
    props.user_details.user.user_follow_by_auth_customer ? true : false
  );
  const handleFollow = () => {
    const data = {
      following_customer_id: props.user_details.user.id,
    };
    props.addFollowAction(data, setFollow, follow);
  };

  useEffect(() => {
    props.getUserFollowerAction(props.user_details.user.id);
  }, [props.user_details.user.id]);
  const handleChange = (value) => {
    props.getUserFollowerAction(
      props.user_details.user.id,
      `page=${value.selected + 1}`
    );
    setSelected(value.selected);
  };
  const handleFollowSingle = (id) => {
    const data = {
      following_customer_id: id,
    };
    props.addFollowAction(data);
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
          <div className="follower-area">
            <div className="container">
              <div className="row g-4 gallery">
                {props.user_followers?.data?.length === 0 ? (
                  <h2 className="text-center pt-5">{t("No Data Found")}</h2>
                ) : (
                  props.user_followers?.data?.map((item, i) => (
                    <div className="col-lg-4 col-md-6 col-12" key={i}>
                      <div className="single-follower">
                        <div className="left">
                          <img
                            className="img"
                            src={item.customer?.image}
                            alt=""
                          />
                          <div>
                            <h4>{item.customer?.name}</h4>
                            {item.customer?.address && (
                              <span>
                                <Icon icon="akar-icons:location" />{" "}
                                {item.customer?.address}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="right">
                          <button
                            onClick={(e) =>
                              handleFollowSingle(item.customer?.id)
                            }
                            className={`btn btn-black follow-unfollow ${
                              item.customer?.customer_follow_by_auth_customer
                                ? "yes"
                                : ""
                            }`}
                          >
                            <span className="follow">{t("Follow")}</span>
                            <span className="unfollow">{t("Unfollow")}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {props.user_followers?.total > props.user_followers?.per_page && (
                <nav className="filter-pagination mt-35">
                  <ReactPaginate
                    containerClassName="paginationWrapper"
                    pageCount={
                      props.user_followers?.total /
                      props.user_followers?.per_page
                    }
                    pageRangeDisplayed={props.user_followers?.per_page}
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
  user_followers: state.common.user_followers,
});
export default connect(mapStateToProps, {
  addFollowAction,
  getUserFollowerAction,
})(UserDetailsFollower);
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
