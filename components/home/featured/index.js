import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { connect } from "react-redux";
import { getFeaturedDataAction } from "../../../redux/actions/home";
import SectionTitle from "../../section-title";
import SingleAudio from "../../singleAudio";
import SingleImage from "../../singleImage";
import SingleVideo from "../../singleVideo";

const FeaturedGallery = (props) => {
  const [defaultType, setDefaultType] = useState(props.productTypes[0]?.slug);

  useEffect(() => {
    props.getFeaturedDataAction(props.productTypes[0]?.slug);
  }, []);
  const handleChnageTab = (slug) => {
    setDefaultType(slug);
    props.getFeaturedDataAction(slug);
  };
  return (
    <section className="featured__area">
      <div className="container">
        <SectionTitle
          title={props.homeData.featured_gallery_title}
          subtitle={props.homeData.featured_gallery_subtitle}
        />
        <nav>
          <Nav className="nav-tabs">
            {props.productTypes.map(({ name, slug }) => (
              <button
                onClick={() => handleChnageTab(slug)}
                key={slug}
                className={`nav-link ${defaultType === slug ? "active" : ""}`}
              >
                {name}
              </button>
            ))}
          </Nav>
        </nav>
        <div className="row g-4 gallery">
          {props.featured_products?.map((item, i) => (
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
  featured_products: state.home.featured_products,
});
export default connect(mapStateToProps, {
  getFeaturedDataAction,
})(FeaturedGallery);
