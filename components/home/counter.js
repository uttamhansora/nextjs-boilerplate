import { useTranslation } from "react-i18next";

const Counter = (props) => {
  const {t} = useTranslation()
  return (
    <section className="counter__area">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="counter__item">
              <div className="item-icon">
                <img src="/images/counter/1.png" alt="img" />
              </div>
              <div className="item-text">
                <h2>
                  <span className="counter">
                    {props.count_data.total_photos}
                  </span>
                </h2>
                <p>{t("Total photos")}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="counter__item">
              <div className="item-icon">
                <img src="/images/counter/2.png" alt="img" />
              </div>
              <div className="item-text">
                <h2>
                  <span className="counter">
                    {props.count_data.total_users}
                  </span>
                </h2>
                <p>{t("Total users")}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="counter__item">
              <div className="item-icon">
                <img src="/images/counter/3.png" alt="img" />
              </div>
              <div className="item-text">
                <h2>
                  <span className="counter">
                    {props.count_data.total_downloads}
                  </span>
                </h2>
                <p>{t("Downloads")}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="counter__item">
              <div className="item-icon">
                <img src="/images/counter/4.png" alt="img" />
              </div>
              <div className="item-text">
                <h2>
                  <span className="counter">
                    {props.count_data.total_transactions}
                  </span>
                </h2>
                <p>{t("Transaction")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Counter;
