import Head from "next/head";
import React, { Fragment } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useTranslation } from "react-i18next";
import AccountLayout from "../../components/layout/account";
import ChangePassword from "../../components/private/change-password";
import DeleteAccount from "../../components/private/delete-account";
import UpdateProfile from "../../components/private/profile";
import PublicLayout from "../../components/public-layout";
import { removeAuthCookie } from "../../utils/commonFunctions";
import { getServerApiRequest } from "../../utils/serverApi";
const Profile = (props) => {
  const {t} = useTranslation()
  return (
    <Fragment>
      <Head>
        <title>{t("My Profile")}</title>
      </Head>
      <PublicLayout
        settings={props.settings}
        footer_info={props.footer_info}
        user_info={props.user_info}
        token={props.token}
      >
        <AccountLayout user_info={props.user_info}>
          <div className="dashboard__content">
            <div className="profile__content">
              <Tabs defaultActiveKey="personal-information" className="mb-3">
                <Tab
                  eventKey="personal-information"
                  title={t("Personal Information")}
                >
                  <UpdateProfile user_info={props.user_info} />
                </Tab>
                <Tab
                  eventKey="change-password"
                  title={t("Change Password")}
                >
                  <ChangePassword />
                </Tab>
                <Tab
                  eventKey="delete-account"
                  title={t("Delete Account")}
                >
                  <DeleteAccount />
                </Tab>
              </Tabs>
            </div>
          </div>
        </AccountLayout>
      </PublicLayout>
    </Fragment>
  );
};

export default Profile;
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
