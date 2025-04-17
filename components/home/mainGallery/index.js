import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { getProductDataAction } from "../../../redux/actions/home";
import SingleAudio from "../../singleAudio";
import SingleImage from "../../singleImage";
import SingleVideo from "../../singleVideo";
const MainGallery = (props) => {
  const {t} = useTranslation()
  const [defaultType, setDefaultType] = useState(props.productTypes[0].slug);
  useEffect(() => {
    props.getProductDataAction(props.productTypes[0].slug);
  }, []);

  const handleChangeProduct = (slug) => {
    setDefaultType(slug);
    props.getProductDataAction(slug);
  };

  return (
    <section className="main__area">
      <div className="main-tablist-area">
        <nav>
          <div className="nav nav-tabs">
            {props.productTypes.map(({ name, uuid, slug }) => (
              <button
                onClick={() => handleChangeProduct(slug)}
                key={uuid}
                className={`nav-link ${defaultType === slug ? "active" : ""}`}
              >
                {name}
              </button>
            ))}
          </div>
        </nav>
      </div>
      <div className="container-fluid">
        <section className="img-gallery__area">
          {props.main_gallery?.length === 0 ? (
            <h2 className="text-center pt-5">{t("No Data Found")}</h2>
          ) : (
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4 }}
            >
              <Masonry gutter="10px" className="gallery mesonary-gallery g-2">
                {props.main_gallery?.map((item, i) => (
                  <Fragment key={i}>
                    {item.content_type === 'audio' ? (
                      <SingleAudio
                        item={item}
                        handleOpenSave={() => {
                          props.saveOpen();
                          props.setProductId(item.id);
                        }}
                      />
                    ) : item.content_type === 'video' ? (
                      <SingleVideo
                        item={item}
                        handleOpenSave={() => {
                          props.saveOpen();
                          props.setProductId(item.id);
                        }}
                      />
                    ) : item.content_type === 'image' ? (
                      <SingleImage
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
                  </Fragment>
                ))}
              </Masonry>
            </ResponsiveMasonry>
          )}
          {!(props.main_gallery?.length === 0) && (
            <div className="item-button">
              <Link
                href={`/filter?type=${defaultType}`}
                className="btn bg-theme"
              >
                {t("View More")}
              </Link>
            </div>
          )}
        </section>
      </div>
    </section>
  );
};
const mapStateToProps = (state) => ({
  loading: state.meta.isLoading,
  main_gallery: state.home.get_products,
});
export default connect(mapStateToProps, {
  getProductDataAction,
})(MainGallery);
