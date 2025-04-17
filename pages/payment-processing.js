import React, { Fragment, useEffect } from "react";

import { useRouter } from "next/router";
import { connect } from "react-redux";
import PublicLayout from "../components/public-layout";
import { getPaymentVerifyAction } from "../redux/actions/common";
import { useTranslation } from "react-i18next";
import { getServerApiRequest } from "../utils/serverApi";
import MetaHead from "../components/MetaHead";

const PaymentProcessing = (props) => {
  const { t } = useTranslation();
  const router = useRouter();
  useEffect(() => {
    let payment_id;
    if(typeof router.query.payment_id == 'undefined'){
      payment_id = router.query.paymentId;
    }
    else{
      payment_id = router.query.payment_id;
    }
    props.getPaymentVerifyAction(router.query.id, router.query.PayerID, payment_id, router.query.type, router);
  }, [router.query.id]);
  return (
    <Fragment>
      <MetaHead
        seo_title={props.meta.meta_title}
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
              <div className="thank-you-text payment-processing">
                {/* <img src="/images/logo/thank-you-bg.png" alt="bg-image" /> */}
                <div className="spinner-border text-info loader" role="status">
                  <span className="visually-hidden">{t("Loading...")}</span>
                </div>
                <h2>{t("Your payment is bing processing")}</h2>
                <h6>{t("Please do not close this page")}</h6>
              </div>
            </div>
          </div>
        </div>
      </PublicLayout>
    </Fragment>
  );
};

export default connect(null, { getPaymentVerifyAction })(PaymentProcessing);

export const getServerSideProps = async ({ req }) => {
  const { user_token, user_info } = req.cookies;
  const setting_data = await getServerApiRequest("setting", null);
  const footer_data = await getServerApiRequest("footer-details", null);
  const metaData = await getServerApiRequest("get-meta", {'meta_type' : 1, 'slug' : 16});
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
