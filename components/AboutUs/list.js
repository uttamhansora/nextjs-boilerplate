import { useTranslation } from "react-i18next";

const AboutList = (props) => {
  const {t} = useTranslation()
  return (
    <section className="about-list__area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="about-list">
              {props.galleryPoints.map(({ id, title, subtitle, logo }) => (
                <div key={id} className="list-item">
                  <div className="item-top">
                    <img src={logo} alt="icon" />
                    <h2>{t(title)}</h2>
                  </div>
                  <div className="item-text">
                    <p>{t(subtitle)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutList;
