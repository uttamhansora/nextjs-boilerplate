import Link from "next/link";
import { useTranslation } from "react-i18next";

const Breadcrumb = ({ page }) => {
  const {t} = useTranslation()
  return (
    <div className="breadcrumb__area">
      <div className="container">
        <div className="breadcrumb__content">
          <div className="breadcrumb__content__left">
            <div className="breadcrumb__title">
              <h2>{t(page)}</h2>
            </div>
          </div>
          <div className="breadcrumb__content__right">
            <nav
              style={{ "--bs-breadcrumb-divider": `"/"` }}
              aria-label="breadcrumb"
            >
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="/">{t("Home")}</Link>
                </li>
                <li className="breadcrumb-item active">{t(page)}</li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
