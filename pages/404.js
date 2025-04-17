import Link from "next/link";
import { useTranslation } from "react-i18next";

const Error = () => {
  const { t } = useTranslation();
  return (
    <section className="error__area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="error-content">
              <div className="error-img">
                <img src="/images/bg/error.png" alt="404-error" />
              </div>
              <div className="error-text">
                <h2>{t("Oops! 404 Not Found")}</h2>
                <p>
                  {t("Sorry but the page you are looking for does not exist, have been removed.name changed or is temporarily unavailable")}
                </p>
                <Link href="/" className="theme-btn">
                  {t("Back to Home")}   
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error;
