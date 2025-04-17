import { useTranslation } from "react-i18next";

const ApplyNow = ({ handleShow, settings }) => {
  const {t} = useTranslation()
  return (
    <section className="contributor__area">
      <div className="container">
        <div className="row align-items-center mb-2">
          <div className="col-md-6 order-md-1 order-2">
            <div className="item-content">
              <h2>{t(settings.contributor_third_portion_title)}</h2>
              <p>{t(settings.contributor_third_portion_subtitle)}</p>
              <a onClick={handleShow} className="btn btn-link">
                {t("Apply Now")}
              </a>
            </div>
          </div>
          <div className="col-md-6 order-md-2 order-1">
            <div className="bg-img">
              <img src={settings.contributor_third_portion_image} alt="img" />
            </div>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="bg-img">
              <img src={settings.contributor_fourth_portion_image} alt="img" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="item-content">
              <h2>{t(settings.contributor_fourth_portion_title)}</h2>
              <p>{t(settings.contributor_fourth_portion_subtitle)}</p>
              <a onClick={handleShow} className="btn btn-link">
                {t("Apply Now")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplyNow;
