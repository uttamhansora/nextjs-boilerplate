import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getFevoriteProductDataAction } from "../../../redux/actions/home";
import SectionTitle from "../../section-title";
import SingleAudio from "../../singleAudio";
import SingleImage from "../../singleImage";
import SingleVideo from "../../singleVideo";
const MostFavourite = (props) => {
  const [defaultType, setDefaultType] = useState(props.productTypes[0]?.uuid);
  useEffect(() => {
    props.getFevoriteProductDataAction(props.productTypes[0]?.slug);
  }, []);
  const handleChnageTab = (slug) => {
    setDefaultType(slug);
    props.getFevoriteProductDataAction(slug);
  };
  return (
    <section className="top-selling__area pt-0">
      <div className="container">
        <SectionTitle
          title={props.homeData.most_favourite_title}
          subtitle={props.homeData.most_favourite_subtitle}
        />
        <div className="top-selling__content">
          <div id="filters" className="top-selling__buttons">
            {props.productTypes.map(({ name, slug }) => (
              <button
                onClick={() => handleChnageTab(slug)}
                key={slug}
                className={`${defaultType === slug ? "is-checked" : ""}`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
        <div className="row g-4 gallery">
          {props.fevorite_products?.map((item, i) => (
            <div className="col-md-6 col-xl-4" key={i}>
              {item.product_type_id === 5 ? (
                <SingleAudio
                  item={item}
                  handleOpenSave={() => {
                    props.saveOpen();
                    props.setProductId(item.id);
                  }}
                />
              ) : item.product_type_id === 3 ? (
                <SingleVideo
                  item={item}
                  handleOpenSave={() => {
                    props.saveOpen();
                    props.setProductId(item.id);
                  }}
                />
              ) : (
                <SingleImage
                  item={item}
                  handleOpenSave={() => {
                    props.saveOpen();
                    props.setProductId(item.id);
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  fevorite_products: state.home.fevorite_products,
});
export default connect(mapStateToProps, {
  getFevoriteProductDataAction,
})(MostFavourite);
