const WhyZaistock = (props) => {
  return (
    <section className="why__area">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5 col-md-12">
            <div className="why__content">
              <div className="why-title">
                <h2>{props.why_uss_data?.settings?.why_us_title}</h2>
                <p>{props.why_uss_data?.settings?.why_us_subtitle}</p>
              </div>
              <ul className="why-list">
                {props.why_uss_data?.whyUss?.map(
                  ({ id, image, title, subtitle }) => (
                    <li key={id}>
                      <div className="list-item">
                        <div className="item-img">
                          <img src={image} alt="icon" />
                        </div>
                        <div className="item-text">
                          <h2>{title}</h2>
                          <p>{subtitle}</p>
                        </div>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
          <div className="col-lg-7 col-md-12">
            <div className="why__img">
              <img src={props.why_uss_data?.settings?.why_us_image} alt="img" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyZaistock;
