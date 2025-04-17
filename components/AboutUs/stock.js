import { useTranslation } from "react-i18next";

const AuthenticStock = (props) => {
  const {t} = useTranslation()
  return (
    <section className="authentic__area">
      <div className="container">
        <div className="item__heading">
          <h2>{t(props.settings.gallery_area_title)}</h2>
        </div>
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="row">
              <div className="col-md-6 col-12">
                <div className="item-img">
                  <img
                    src={props.settings.gallery_first_image}
                    alt={props.settings.gallery_area_title}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="item-img">
                  <img
                    src={props.settings.gallery_second_image}
                    alt={props.settings.gallery_area_title}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="item-img">
                  <img
                    src={props.settings.gallery_third_image}
                    alt={props.settings.gallery_area_title}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="item-img">
                  <img
                    src={props.settings.gallery_fourth_image}
                    alt={props.settings.gallery_area_title}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="item-img">
              <img
                src={props.settings.gallery_fifth_image}
                alt={props.settings.gallery_area_title}
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-10 col-12">
            <div className="item-bottom">
              <p>{t(props.settings.gallery_area_footer)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthenticStock;
