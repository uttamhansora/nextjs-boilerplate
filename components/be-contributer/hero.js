import { useTranslation } from "react-i18next";

const ApplyHero = ({ handleShow, settings }) => {
  const {t} = useTranslation()
  return (
    <section className="contributor__area">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="item-img">
              <img src={settings.contributor_first_portion_image} alt="img" />
            </div>
          </div>
          <div className="col-xxl-5 col-md-6">
            <div className="item-heading">
              <h2>{t(settings.contributor_first_portion_title)}</h2>
              <p>{t(settings.contributor_first_portion_subtitle)}</p>
              <a className="btn btn-link" onClick={handleShow}>
                {t("Apply Now")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplyHero;
