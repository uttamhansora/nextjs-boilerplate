import { useTranslation } from "react-i18next";

const PaidProperly = ({ settings }) => {
  const {t} = useTranslation()
  return (
    <section className="paid__area">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-3 col-md-4">
            <div className="paid__title">
              <img src={settings.contributor_second_portion_icon} alt="icon" />
              <h2>
                {t(settings.contributor_second_portion_icon_title)}
              </h2>
            </div>
          </div>
          <div className="col-xxl-7 col-xl-8 col-lg-9 col-md-8">
            <div className="paid__content">
              <ul className="paid-list">
                <li>
                  <div className="list-item">
                    <h2>
                      {t(
                        settings.contributor_second_portion_first_para_title
                      )}
                    </h2>
                    <p>
                      {t(
                        settings.contributor_second_portion_first_para_subtitle
                      )}
                    </p>
                  </div>
                </li>
                <li>
                  <div className="list-item">
                    <h2>
                      {t(
                        settings.contributor_second_portion_second_para_title
                      )}
                    </h2>
                    <p>
                      {t(
                        settings.contributor_second_portion_second_para_subtitle
                      )}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaidProperly;
