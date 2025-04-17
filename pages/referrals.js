import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import MetaHead from "../components/MetaHead";
import PublicLayout from "../components/public-layout";
import { useTranslation } from "react-i18next";
import { getServerApiRequest } from "../utils/serverApi";
const Referrals = (props) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [selected, setSelected] = useState(0);
  const handleChange = (value) => {
    router.push(`${page}?page=${value.selected + 1}`);
    setSelected(value.selected);
  };
  const getCurrencySymbol = (amount) => {
    if (props.currency.currency_placement === "after") {
      return amount + props.currency.currency_symbol;
    } else {
      return props.currency.currency_symbol + amount;
    }
  };

  const handleClick = () => {
    const text = document.getElementById("refer-link");
    navigator.clipboard.writeText(text.innerText);
    toast.success(`Copied: ${text.innerText}`);
  };
  return (
    <Fragment>
      <MetaHead
        seo_title={
          props.meta?.meta_title ?? t(props.referral.pageTitle)
        }
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
        <div className="referrals-area">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="referrals-top">
                  <h2>{t(props.referral.setting.referral_title)}</h2>
                  <p>{t(props.referral.setting.referral_subtitle)}</p>
                  <div className="referrals-link">
                    <p id="refer-link">{`${process.env.FRONTEND_URL}signup?referred_by=${props.user_info?.user_name}`}</p>

                    <strong onClick={handleClick} title={t("Copy to clipboard")}>
                      {t("Copy link")}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="referrals-table">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="dashboard__content">
                    <div className="boards__content">
                      <div className="item-top">
                        <div className="item-left">
                          <h2>{t("Reffiliate Dashboard")}</h2>
                        </div>
                        <div className="item-right">
                          <Link
                            href="/account/my-earnings"
                            className="btn bg-theme"
                          >
                            {t("My Earnings")}
                          </Link>
                        </div>
                      </div>
                      <div className="my-earnings__content">
                        <div className="row">
                          <div className="col-xl-4 col-md-6">
                            <div className="earning-status">
                              <div className="status-img">
                                <Icon
                                  icon="bi:currency-dollar"
                                  width="24"
                                  height="24"
                                />
                              </div>
                              <div className="status-info">
                                <p>{t("Number of Affiliate")}</p>
                                <h2>{props.referral.totalNumberAffiliate}</h2>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-4 col-md-6">
                            <div className="earning-status">
                              <div className="status-img">
                                <Icon
                                  icon="bi:currency-dollar"
                                  width="24"
                                  height="24"
                                />
                              </div>
                              <div className="status-info">
                                <p>{t("Total Affiliate")}</p>
                                <h2>
                                  {getCurrencySymbol(
                                    Number(props.referral.totalAffiliate)
                                  )}
                                </h2>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-4 col-md-6">
                            <div className="earning-status">
                              <div className="status-img">
                                <Icon
                                  icon="bi:currency-dollar"
                                  width="24"
                                  height="24"
                                />
                              </div>
                              <div className="status-info">
                                <p>{t("Commission Earnings")}</p>
                                <h2>
                                  {getCurrencySymbol(
                                    Number(
                                      props.referral.totalCommissionEarning
                                    )
                                  )}
                                </h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <h4 className="refer-earnig-history">
                        {t("Earning history")}
                      </h4>
                      {props.referral.referralHistories.data.length === 0 ? (
                        <h5 className="text-center">
                          {t("No Data Found")}
                        </h5>
                      ) : (
                        <>
                          <div className="boards__table">
                            <table>
                              <thead>
                                <tr>
                                  <th>{t("Date")}</th>
                                  <th>{t("Plan")}</th>
                                  <th>{t("Actual Amount")}</th>
                                  <th>{t("Earned Amount")}</th>
                                  <th>{t("Commission")} %</th>
                                </tr>
                              </thead>
                              <tbody>
                                {data.map(
                                  ({
                                    id,
                                    plan_name,
                                    actual_amount,
                                    earned_amount,
                                    commission_percentage,
                                    created_at,
                                  }) => (
                                    <tr key={id}>
                                      <td>
                                        <span className="data-text">
                                          {moment(created_at).format(
                                            "DD-MM-YY"
                                          )}
                                        </span>
                                      </td>
                                      <td>
                                        <span className="data-text">
                                          {plan_name}
                                        </span>
                                      </td>
                                      <td>
                                        <span className="data-text">
                                          {getCurrencySymbol(
                                            Number(actual_amount)
                                          )}
                                        </span>
                                      </td>
                                      <td>
                                        <span className="data-text">
                                          {getCurrencySymbol(
                                            Number(earned_amount)
                                          )}
                                        </span>
                                      </td>
                                      <td>
                                        <span className="data-text">
                                          {commission_percentage}%
                                        </span>
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          </div>
                          {props.referral.referralHistories.total >
                            props.referral.referralHistories.per_page && (
                            <nav className="filter-pagination mt-35">
                              <ReactPaginate
                                containerClassName="paginationWrapper"
                                pageCount={
                                  props.referral.referralHistories.total /
                                  per_page
                                }
                                pageRangeDisplayed={
                                  props.referral.referralHistories.per_page
                                }
                                onPageChange={handleChange}
                                nextLabel={
                                  <i className="fa fa-angle-right"></i>
                                }
                                previousLabel={
                                  <i className="fa fa-angle-left"></i>
                                }
                                forcePage={selected}
                              />
                            </nav>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PublicLayout>
    </Fragment>
  );
};

export default Referrals;
export const getServerSideProps = async ({ req }) => {
  const { user_token, user_info } = req.cookies;
  const setting_data = await getServerApiRequest("setting", null);
  const footer_data = await getServerApiRequest("footer-details", null);
  const referral_data = await getServerApiRequest(
    `referral-history`,
    null,
    user_token
  );
  const currency_data = await getServerApiRequest(`get-current-currency`, null);
  const metaData = await getServerApiRequest("get-meta", {
    meta_type: 1,
    page: 2,
  });

  return {
    props: {
      settings: setting_data.data.data,
      footer_info: footer_data.data.data,
      user_info: user_info ? JSON.parse(user_info) : null,
      token: user_token || null,
      referral: referral_data.data.data,
      currency: currency_data.data.data,
      meta: metaData.data.data,
    },
  };
};
