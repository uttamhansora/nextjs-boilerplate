import { Icon } from "@iconify/react";
import Head from "next/head";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Menu from "./menu";
import ResponsieMenu from "./responsive-menu";
const Header = (props) => {
  const { t } = useTranslation();
  const [responisve, setResponsive] = useState(false);
  useEffect(() => {
    const handleScrollEvent = () => {
      if (window.pageYOffset > 20) {
        document.querySelector(".header__area").classList.add("sticky");
      } else {
        document.querySelector(".header__area").classList.remove("sticky");
      }
    };
    window.addEventListener("scroll", handleScrollEvent);
    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);

  return (
    <Fragment>
      <Head>
        <link
          rel="icon"
          type="image/x-icon"
          href={props.settings.app_fav_icon}
        />
      </Head>
      <header className="header__area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="header__area__container">
                <div className="header__area__left">
                  <div className="header__brand">
                    <Link href="/">
                      <img src={props.settings.app_logo} alt="Logo" />
                    </Link>
                  </div>
                  <ul className="header__extra">
                    <li>
                      <Link href="/pricing">
                        <Icon
                          icon="ant-design:dollar-circle-outlined"
                          width="20"
                          height="20"
                        />
                        <span>{t("Pricing")}</span>
                      </Link>
                    </li>
                    {!(props.user_info?.role === 2) && (
                      <li>
                        <Link
                          href={
                            props.user_info != null
                              ? "/be-a-contributer"
                              : "/login"
                          }
                        >
                          <Icon
                            icon="akar-icons:person-add"
                            width="20"
                            height="20"
                          />
                          <span>{t("Be a Contributor")}</span>
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="header__area__right">
                  <Menu
                    user_info={props.user_info}
                    token={props.token}
                    settings={props.settings}
                  />
                  <div
                    className={
                      responisve
                        ? "offcanvas offcanvas-start mobile-menu__area show"
                        : "offcanvas offcanvas-start mobile-menu__area"
                    }
                    style={
                      responisve
                        ? { visibility: "visible" }
                        : { visibility: "hidden" }
                    }
                  >
                    <div className="offcanvas-body">
                      <ResponsieMenu
                        type="mobile"
                        user_info={props.user_info}
                        token={props.token}
                        settings={props.settings}
                      />
                    </div>
                  </div>
                  <button
                    className="menu-toggler"
                    onClick={() => setResponsive(!responisve)}
                  >
                    <Icon icon="eva:menu-outline" width="24" height="24" />
                    <span>{t("Menu")}</span>
                  </button>
                  <div
                   onClick={() => setResponsive(!responisve)}
                    className=""
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
};
export default Header;
