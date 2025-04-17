import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoogleAnalytics } from "nextjs-google-analytics";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import superagent from "superagent";
import { logoutAction } from "../../redux/actions/auth";
const ResponsieMenu = (props) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [profile, setProfile] = useState(false);
  const [menu, setMenu] = useState(false);
  const [language, setLanguage] = useState(false);
  const [lang, setLang] = useState(false);
  const [langFlag, setLangFlag] = useState("");

  useEffect(() => {
    const rtl = localStorage.getItem("rtl");
    setLang(localStorage.getItem("lang"));
    setLangFlag(localStorage.getItem("langFlag"));

    if (rtl == true) {
      document.body.classList.add("rtl");
    } else {
      document.body.classList.remove("rtl");
    }
  }, []);

  const handleLanguageChange = (language) => {
    superagent
      .get(`${process.env.BASE_URL}language/${language.iso_code}`)
      .set("accept", "application/json")
      .end((err, res) => {
        if (res) {
          if (res.body.success) {
            localStorage.setItem("lang", language.iso_code);
            localStorage.setItem("langFlag", language.flag);
            localStorage.setItem("langData", res.body.data.file_data);
            localStorage.setItem("rtl", language.rtl);
            location.reload();
          }
        }
      });
  };
  const handleRemoveBackdrop = () => {
    setLanguage(false);
    setMenu(false);
    setProfile(false);
  };
  const handleClickLogout = () => {
    props.logoutAction(router);
  };
  return (
    <Fragment>
      <GoogleAnalytics
        gaMeasurementId={props.settings.google_analytics_api_key}
      />
      {(language || menu || profile) && (
        <div onClick={handleRemoveBackdrop} className="backdrop"></div>
      )}

      <ul
        className={`${props.type === "mobile" ? "mobile-menu " : "main-menu"}`}
      >
        {props.token && (
          <li className="dropdown">
            <Link href="/account/boards" role="button">
              <Icon icon="fluent:board-24-regular" width="24" height="24" />
              <span>{t("Boards")}</span>
            </Link>
          </li>
        )}
        <li className="dropdown">
          <button
            className="dropdown-toggle"
            onClick={() => setLanguage(!language)}
          >
            <img className="flag-img" src={langFlag} alt="flag" />
            <span>{lang}</span>
          </button>
          <ul className={`dropdown-menu language-menu ${language && "show"}`}>
            {props.settings.languages.map((language) => (
              <li key={language.iso_code}>
                <button
                  onClick={() => handleLanguageChange(language)}
                  className="dropdown-item"
                >
                  <img className="flag-img" src={language.flag} alt="flag" />
                  <span> {language.iso_code}</span>
                </button>
              </li>
            ))}
          </ul>
        </li>
        {props.token ? (
          <li className="dropdown">
            <a onClick={() => setProfile(!profile)}>
              <Icon icon="fa-regular:user" />
              <span>{props.user_info?.first_name}</span>
            </a>
            <ul className={`dropdown-menu ${profile && "show"}`}>
              <li>
                <div className="list-item">
                  <div className="item-left">
                    <div className="user-img">
                      <img
                        src={props.user_info?.image}
                        alt={props.user_info?.name}
                      />
                    </div>
                  </div>
                  <div className="item-right">
                    <h2>{props.user_info?.first_name}</h2>
                    <p>{props.user_info?.email}</p>
                  </div>
                </div>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              {props.user_info?.role == 2 && (
                <>
                  <li>
                    <Link
                      className="dropdown-item item-link"
                      href="/account/upload"
                    >
                      <div className="item-left">
                        <Icon icon="fluent:people-add-16-regular" />
                        <span>{t("Contributor")}</span>
                      </div>
                      <div className="item-right">
                        <i className="fa-solid fa-chevron-right"></i>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                </>
              )}
              <li>
                <Link
                  className="dropdown-item item-link"
                  href="/account/favourites"
                >
                  <div className="item-left">
                    <Icon icon="akar-icons:heart" />
                    <span>{t("Favourites")}</span>
                  </div>
                  <div className="item-right">
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item item-link"
                  href="/account/profile"
                >
                  <div className="item-left">
                    <Icon icon="fa-regular:user" />
                    <span>{t("Profile")}</span>
                  </div>
                  <div className="item-right">
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item item-link"
                  href="/account/my-wallet"
                >
                  <div className="item-left">
                    <Icon icon="clarity:wallet-line" />
                    <span>{t("Wallet")}</span>
                  </div>
                  <div className="item-right">
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link
                  className="dropdown-item item-link"
                  href="/account/my-subscription"
                >
                  <div className="item-left">
                    <Icon icon="tabler:credit-card" />
                    <span>{t("My Subscription")}</span>
                  </div>
                  <div className="item-right">
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </Link>
              </li>
              <li>
                <Link className="dropdown-item item-link" href="/referrals">
                  <div className="item-left">
                    <Icon icon="lucide:user-plus" />
                    <span>{t("Referrals")}</span>
                  </div>
                  <div className="item-right">
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </Link>
              </li>
              <li>
                <div className="item-button">
                  <a onClick={handleClickLogout} className="btn btn-black">
                    {t("Log out")}
                  </a>
                </div>
              </li>
            </ul>
          </li>
        ) : (
          <li>
            <Link href="/login" className="btn btn-black">
              {t("Login")}
            </Link>
          </li>
        )}
        <li className="dropdown">
          
          <ul className={`dropdown-menu show`}>
            {props.type === "mobile" && (
              <>
                <li>
                  <Link className="dropdown-item item-link" href="/pricing">
                    <div className="item-left">
                      <span>{t("Pricing")}</span>
                    </div>
                    <div className="item-right">
                      <i className="fa-solid fa-chevron-right"></i>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item item-link"
                    href="/be-a-contributer"
                  >
                    <div className="item-left">
                      <span>{t("Be a Contributor")}</span>
                    </div>
                    <div className="item-right">
                      <i className="fa-solid fa-chevron-right"></i>
                    </div>
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link className="dropdown-item item-link" href="/blog">
                <div className="item-left">
                  <span>{t("Blog")}</span>
                </div>
                <div className="item-right">
                  <i className="fa-solid fa-chevron-right"></i>
                </div>
              </Link>
            </li>
            <li>
              <Link className="dropdown-item item-link" href="/about-us">
                <div className="item-left">
                  <span>{t("About Us")}</span>
                </div>
                <div className="item-right">
                  <i className="fa-solid fa-chevron-right"></i>
                </div>
              </Link>
            </li>
            <li>
              <Link className="dropdown-item item-link" href="/contact-us">
                <div className="item-left">
                  <span>{t("Contact Us")}</span>
                </div>
                <div className="item-right">
                  <i className="fa-solid fa-chevron-right"></i>
                </div>
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item item-link"
                href="/terms-and-condition"
              >
                <div className="item-left">
                  <span>{t("Terms & condition")}</span>
                </div>
                <div className="item-right">
                  <i className="fa-solid fa-chevron-right"></i>
                </div>
              </Link>
            </li>
            <li>
              <Link className="dropdown-item item-link" href="/privacy-policy">
                <div className="item-left">
                  <span>{t("Privacy policy")}</span>
                </div>
                <div className="item-right">
                  <i className="fa-solid fa-chevron-right"></i>
                </div>
              </Link>
            </li>
            <li>
              <Link className="dropdown-item item-link" href="/cookie-policy">
                <div className="item-left">
                  <span>{t("Cookie policy")}</span>
                </div>
                <div className="item-right">
                  <i className="fa-solid fa-chevron-right"></i>
                </div>
              </Link>
            </li>
          </ul>
        </li>
        {props.user_info?.role == 2 && (
          <li className="dropdown">
            <Link
              href="/account/upload"
              className="btn bg-theme upload-btn"
              role="button"
            >
              <Icon
                icon="ant-design:cloud-upload-outlined"
                width="24"
                height="24"
              />
              <span> {t("Upload")}</span>
            </Link>
          </li>
        )}
      </ul>
    </Fragment>
  );
};
export default connect(null, { logoutAction })(ResponsieMenu);
