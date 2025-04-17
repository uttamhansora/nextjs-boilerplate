import Head from "next/head";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import AccountLayout from "../../components/layout/account";
import PublicLayout from "../../components/public-layout";
import { removeAuthCookie } from "../../utils/commonFunctions";
import {
  addFollowAction,
  getFollowingAction,
} from "../../redux/actions/profile";
import { getServerApiRequest } from "../../utils/serverApi";

const Following = (props) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    props.getFollowingAction();
  }, []);
  const handleChange = (value) => {
    props.getFollowingAction(`page=${value.selected + 1}`);
    setSelected(value.selected);
  };
  const handleRemoveFllow = (user_id, customer_id) => {
    const data = {
      following_customer_id: customer_id,
      following_user_id: user_id,
    };
    props.addFollowAction(data);
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
            <div className="following___area">
              {!props.following?.data?.length && (
                <div className="following__item">
                    <h6 className="text-center fw-bold">{t("No Data Found")}</h6>
                </div>
              )}
              {props.following?.data?.map(
                ({
                  id,
                  following_customer,
                  following_user,
                  user_followers_count,
                  contributor_followers_count,
                  contributor_products_count,
                  user_products_count,
                }) => (
                  <div key={id} className="following__item">
                    <div className="item-top">
                      <div className="item-left">
                        <div className="user-info">
                          <div className="user-img">
                            <img
                              src={
                                following_customer?.image ||
                                following_user?.image
                              }
                              alt="img"
                            />
                          </div>
                          <div className="user-text">
                            <h2>
                              {following_customer?.name || following_user?.name}
                            </h2>
                            <ul className="user-meta">
                              <li>
                                {user_followers_count ||
                                  contributor_followers_count}{" "}
                                {t("Followers")}
                              </li>
                              <li>
                                {contributor_products_count ||
                                  user_products_count}{" "}
                                {t("Resources")}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="item-right">
                        <a
                          onClick={() =>
                            handleRemoveFllow(
                              following_user?.id,
                              following_customer?.id
                            )
                          }
                          className="btn bg-theme"
                        >
                          {t("Unfollow")}
                        </a>
                      </div>
                    </div>
                  </div>
                )
              )}
              {props.following?.total > props.following?.per_page && (
                <nav className="filter-pagination mt-35">
                  <ReactPaginate
                    containerClassName="paginationWrapper"
                    pageCount={
                      props.following?.total / props.following?.per_page
                    }
                    pageRangeDisplayed={props.following?.per_page}
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
  following: state.profile.following,
});
export default connect(mapStateToProps, {
  getFollowingAction,
  addFollowAction,
})(Following);
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
