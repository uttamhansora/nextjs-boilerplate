import moment from "moment/moment";
import Head from "next/head";
import React, { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import AccountLayout from "../../components/layout/account";
import PublicLayout from "../../components/public-layout";
import { removeAuthCookie } from "../../utils/commonFunctions";

import {
  cancelSubscription,
  getMySubscriptionPlanAction,
} from "../../redux/actions/profile";
import { getServerApiRequest } from "../../utils/serverApi";

const MySubscription = (props) => {
  const {t} = useTranslation();
  const getCurrencySymbol = (amount) => {
    if (props.currency.currency_placement === "after") {
      return amount + props.currency.currency_symbol;
    } else {
      return props.currency.currency_symbol + amount;
    }
  };
  useEffect(() => {
    props.getMySubscriptionPlanAction();
  }, []);

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
        props.cancelSubscription(id);
      }
    });
  };

  return (
    <Fragment>
      <Head>
        <title>{t("My Subscription")}</title>
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
              {props.my_subscripion && props.my_subscripion.plan_details ? (
                <div className="dashboard__content">
                  <div className="subscription__plan mb-43">
                    <h2>{t("Current Plan")}</h2>
                    <div className="plan__item">
                      <div className="item-top">
                        <div className="item-left">
                          <h2>
                            {t(props.my_subscripion?.plan_details.name)}
                          </h2>
                          <p>
                            {props.my_subscripion.plan_details
                              ?.duration_type === 1
                              ? t("Yearly")
                              : t("Monthly")}{" "}
                            {t("Plan")}
                          </p>
                        </div>
                        <div className="item-right">
                          <button
                            onClick={() =>
                              handleDelete(props.my_subscripion.id)
                            }
                            className="btn btn-outline-theme"
                          >
                            {t("Cancel Subscription")}
                          </button>
                        </div>
                      </div>
                      <div className="item-content">
                        <p>
                          {t("Your package price")}{" "}
                          <span>
                            {getCurrencySymbol(
                              props.my_subscripion.plan_details?.price
                            )}
                          </span>
                          , {t("duration")}{" "}
                          <span>
                            {props.my_subscripion.plan_details?.duration}{" "}
                            {props.my_subscripion.plan_details
                              ?.duration_type === 1
                              ? t("Yearly")
                              : t("Monthly")}
                          </span>
                          , {t("device limit")}{" "}
                          <span>
                            {props.my_subscripion.plan_details?.device_limit}
                          </span>
                          , {t("download limit")}{" "}
                          <span>
                            {props.my_subscripion.plan_details
                              ?.download_limit_type === 1
                              ? t("Unlimited")
                              : `${
                                  props.my_subscripion.plan_details
                                    ?.download_limit
                                } ${t("products per day")}`}
                          </span>
                          .
                        </p>
                        <p>
                          {t("Your subscription plan will expire on")}{" "}
                          <span>
                            {moment(props.my_subscripion?.end_date).format(
                              "MMMM DD, Y"
                            )}
                          </span>
                          .
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <h5 className="text-center">{t("No Data Found")}</h5>
              )}
            </div>
          </div>
        </AccountLayout>
      </PublicLayout>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  my_subscripion: state.profile.my_subscripion,
});
export default connect(mapStateToProps, {
  getMySubscriptionPlanAction,
  cancelSubscription,
})(MySubscription);
export const getServerSideProps = async ({ req, res }) => {
  const { user_token } = req.cookies;

  const auth_data = await getServerApiRequest(`auth-status`, null, user_token);
  if (auth_data.data.auth_status === 'out') {
    removeAuthCookie(res);
    return {
      redirect: { destination: "/", permanent: false },
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
