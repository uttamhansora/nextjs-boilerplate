import { Icon } from "@iconify/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import ReportUser from "../../../components/members/report";
import PublicLayout from "../../../components/public-layout";
import {
  addFollowAction,
  getCustomerFollowingAction,
} from "../../../redux/actions/common";
import { getServerApiRequest } from "../../../utils/serverApi";
const CustomerDetails = (props) => {
  const {t} = useTranslation()
  const router = useRouter();
  const [reportShow, setReportShow] = useState(false);
  const [selected, setSelected] = useState(0);

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

  useEffect(() => {
    props.getCustomerFollowingAction(props.customer_details.customer.id);
  }, [props.customer_details.customer.id]);
  const handleChange = (value) => {
    props.getCustomerFollowingAction(
      props.customer_details.customer.id,
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
      <Head>
        <title>{props.customer_details.customer.name} {t("Followers")}</title>
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
          <div className="follower-area">
            <div className="container">
              <div className="row g-4 gallery">
                {props.customer_following?.data?.length === 0 ? (
                  <h2 className="text-center pt-5">{t("No Data Found")}</h2>
                ) : (
                  props.customer_following?.data?.map((item, i) => (
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
              {props.customer_following?.total >
                props.customer_following?.per_page && (
                <nav className="filter-pagination mt-35">
                  <ReactPaginate
                    containerClassName="paginationWrapper"
                    pageCount={
                      props.customer_following?.total /
                      props.customer_following?.per_page
                    }
                    pageRangeDisplayed={props.customer_following?.per_page}
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
        reportedCategories={props.customer_details.reportedCategories}
        customer_id={props.customer_details.customer.id}
      />
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  customer_following: state.common.customer_following,
});
export default connect(mapStateToProps, {
  addFollowAction,
  getCustomerFollowingAction,
})(CustomerDetails);
export const getServerSideProps = async ({ req, query }) => {
  const { user_token, user_info } = req.cookies;
  const setting_data = await getServerApiRequest("setting", null);
  const footer_data = await getServerApiRequest("footer-details", null);
  const get_details_data = await getServerApiRequest(
    `customer-details/${query.slug}`,
    null
  );

  return {
    props: {
      settings: setting_data.data.data ? setting_data.data.data : null,
      footer_info: footer_data.data.data ? footer_data.data.data : null,
      user_info: user_info ? JSON.parse(user_info) : null,
      token: user_token || null,
      customer_details: get_details_data.data.data
        ? get_details_data.data.data
        : null,
    },
  };
};
