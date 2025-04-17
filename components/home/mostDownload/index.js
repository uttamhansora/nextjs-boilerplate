import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getDownloadProductDataAction } from "../../../redux/actions/home";
import SectionTitle from "../../section-title";
import SingleAudio from "../../singleAudio";
import SingleImage from "../../singleImage";
import SingleVideo from "../../singleVideo";
const MostDownload = (props) => {
  const [defaultType, setDefaultType] = useState(props.productTypes[0]?.slug);
  useEffect(() => {
    props.getDownloadProductDataAction(props.productTypes[0]?.slug);
  }, []);
  const handleChnageTab = (slug) => {
    setDefaultType(slug);
    props.getDownloadProductDataAction(slug);
  };
  return (
    <section className="most-downloading__area">
      <div className="container">
        <SectionTitle
          title={props.homeData.most_download_title}
          subtitle={props.homeData.most_download_subtitle}
        />
        <div className="most-downloading__content">
          <div className="most-downloading__buttons">
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
          <div className="row g-4 gallery">
            {props.download_products?.map((item, i) => (
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
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  download_products: state.home.download_products,
});
export default connect(mapStateToProps, {
  getDownloadProductDataAction,
})(MostDownload);
