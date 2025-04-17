import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import PublicLayout from "../components/public-layout";
import { getServerApiRequest } from "../utils/serverApi";
import MetaHead from "../components/MetaHead";

const PaymentProcessing = (props) => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <MetaHead
        seo_title={props.meta?.meta_title ?? translate("Thank You")}
        seo_description={props.meta.meta_description}
        seo_keyword={props.meta.meta_keyword}
        seo_image={props.settings.app_logo}
      />
      <PublicLayout
        settings={props.settings}
        footer_info={props.footer_info}
        user_info={props.user_info}
        token={props.token}
      >
        <div className="big-img-bg">
          <div className="thank-you-wrapper text-center">
            <div className="thank-you-container text-center">
              <div className="thank-you-text">
                <img src="/images/logo/thank-you-bg.png" alt="bg-image" />
                <h2>{t("You payment has been successful")}</h2>
              </div>
            </div>
          </div>
        </div>
      </PublicLayout>
    </Fragment>
  );
};

export default PaymentProcessing;

export const getServerSideProps = async ({ req }) => {
  const { user_token, user_info } = req.cookies;
  const setting_data = await getServerApiRequest("setting", null);
  const footer_data = await getServerApiRequest("footer-details", null);
  const metaData = await getServerApiRequest("get-meta", {'meta_type' : 1, 'page' : 14});
  return {
    props: {
      settings: setting_data.data.data,
      footer_info: footer_data.data.data,
      user_info: user_info ? JSON.parse(user_info) : null,
      token: user_token || null,
      meta: metaData.data.data,
    },
  };
};
