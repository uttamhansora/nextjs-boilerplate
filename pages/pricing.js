import React, { Fragment, useState } from "react";

import Link from "next/link";
import PublicLayout from "../components/public-layout";
import { getServerApiRequest } from "../utils/serverApi";
import MetaHead from "../components/MetaHead";
import { useTranslation } from "react-i18next";
const Pricing = (props) => {
  const { t } = useTranslation();
  const [durationType, setDurationType] = useState(2);
  const getCurrencySymbol = (amount) => {
    if (props.currency.currency_placement === "after") {
      return amount + props.currency.currency_symbol;
    } else {
      return props.currency.currency_symbol + amount;
    }
  };
  const handleChange = (e) => {
    if (e.target.checked) {
      setDurationType(1);
    } else {
      setDurationType(2);
    }
  };
  return (
    <Fragment>
      <MetaHead
        seo_title={props.meta?.meta_title ?? t("Pricing")}
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
        <div className="pricing-plan">
          <div className="pricing-plan__heading">
            <h2>{props.pricing.settings.plan_title}</h2>
            <p>{props.pricing.settings.plan_subtitle}</p>
            <div className="plan-switch">
              {t("Monthly")}
              <label className="switch">
                <input type="checkbox" onChange={handleChange} />
                <span className="slider round"></span>
              </label>
              {t("Yearly")}
            </div>
          </div>
        </div>
        <section className="pricing-plan__area">
          <div className="container">
            <div className="plan-wrapper">
              <div className="row">
                {props.pricing.plans.map((item) => (
                  <div key={item.id} className="col-lg-4 col-md-6">
                    <div className="pricing-plan__item">
                      <div className="item-img">
                        <img src={item.logo} alt={item.name} />
                      </div>
                      <div className="item-title">
                        <h2>{t(item.name)}</h2>
                        <h3>
                          {getCurrencySymbol(
                            Number(
                              durationType == 2
                                ? item.monthly_price
                                : item.yearly_price
                            ).toFixed(0)
                          )}
                        </h3>
                      </div>
                      <ul className="item-list">
                        <li>
                          {t("Device Limit")}{" "}
                          <strong>{item.device_limit}</strong>
                        </li>
                        <li>
                          {item.download_limit_type == 1
                            ? t("Unlimited Downloads")
                            : `${item.download_limit} ${t(
                              "Downloads Per Day"
                            )}`}
                        </li>
                        {item.plan_benefits.map(({ id, point }) => (
                          <li key={id}>{t(point)}</li>
                        ))}
                      </ul>
                      <div className="item-button">
                        <Link
                          className="btn btn-link"
                          href={`/pay?id=${item.id}&duration=${durationType}&type=plan`}
                        >
                          {t("Get Started")}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </PublicLayout>
    </Fragment>
  );
};

export default Pricing;
export const getServerSideProps = async ({ req }) => {
  const { user_token, user_info } = req.cookies;
  const setting_data = await getServerApiRequest("setting", null);
  const footer_data = await getServerApiRequest("footer-details", null);
  const pricing_data = await getServerApiRequest(`pricing`, null);
  const currency_data = await getServerApiRequest(`get-current-currency`, null);
  const metaData = await getServerApiRequest("get-meta", { 'meta_type': 1, 'page': 2 });

  return {
    props: {
      settings: setting_data.data.data,
      footer_info: footer_data.data.data,
      user_info: user_info ? JSON.parse(user_info) : null,
      token: user_token || null,
      pricing: pricing_data.data.data,
      currency: currency_data.data.data,
      meta: metaData.data.data,
    },
  };
};
