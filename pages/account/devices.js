import { Icon } from "@iconify/react";
import Head from "next/head";
import React, { Fragment } from "react";
import AccountLayout from "../../components/layout/account";
import PublicLayout from "../../components/public-layout";
import { useTranslation } from "react-i18next";
import { getServerApiRequest } from "../../utils/serverApi";
import { removeAuthCookie } from "../../utils/commonFunctions";
import { useRouter } from "next/router";
import {
  deviceLogOut,
} from "../../redux/actions/profile";
import { connect } from "react-redux";

const Devices = (props) => {
  const { t } = useTranslation();
  const router = useRouter();
  const logoutOtherDevice = (id) => {
    props.deviceLogOut(id, router);
  }

  return (
    <Fragment>
      <Head>
        <title>{t("Device Manager")}</title>
      </Head>
      <PublicLayout
        settings={props.settings}
        footer_info={props.footer_info}
        user_info={props.user_info}
        token={props.token}
      >
        <AccountLayout user_info={props.user_info}>
          <div className="dashboard__content">
            <div className="device__content">
              <div className="item-title">
                <h2>{t("Device Manager")}</h2>
                <p>
                  {t(
                    "List of all devices from which you have logged in."
                  )}
                </p>
              </div>
              <div className="item-top">
                <div className="item-left">
                  <h2>
                    <Icon icon="ep:monitor" width="24" height="24" />
                    <span>{t("My Device")}</span>
                  </h2>
                </div>
                <div className="item-right">
                  <h3>
                    {props.login_devices?.used_device}/
                    {props.login_devices?.device_limit} {t("Devices")}
                  </h3>
                </div>
              </div>
              <div className="device__table">
                <table>
                  <thead>
                    <tr>
                      <th>{t("OS")}</th>
                      <th>{t("Browser")}</th>
                      <th>{t("IP")}</th>
                      <th>{t("Action")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.login_devices?.loginDevices?.map(
                      ({ id, browser, os, ip }) => (
                        <tr key={id}>
                          <td>
                            <span className="data-text">{t(os)}</span>
                          </td>
                          <td>
                            <span className="data-text">
                              {t(browser)}
                            </span>
                          </td>
                          <td>
                            <span className="data-text">{ip}</span>
                          </td>
                          <td>
                            {id == props.device_id ? (
                              <button
                                className="btn btn-outline-theme w-100"
                                disabled
                              >
                                {t("Current")}
                              </button>
                            ) : (
                              <button
                                onClick={() => logoutOtherDevice(id)}
                                className="btn btn-outline-theme w-100"
                              >
                                {t("Logout")}
                              </button>
                            )}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </AccountLayout>
      </PublicLayout>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, {
  deviceLogOut,
})(Devices);

export const getServerSideProps = async ({ req, res }) => {
  const { user_token, device_id } = req.cookies;
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
  const login_devices_data = await getServerApiRequest(
    "login-devices",
    null,
    user_token
  );
  return {
    props: {
      currency: currency_data.data.data ? currency_data.data.data : null,
      device_id: device_id,
      user_info: auth_data.data.customer ? auth_data.data.customer : null,
      settings: setting_data.data.data ? setting_data.data.data : null,
      footer_info: footer_data.data.data ? footer_data.data.data : null,
      token: user_token || null,
      login_devices: login_devices_data.data.data,
    },
  };
};
