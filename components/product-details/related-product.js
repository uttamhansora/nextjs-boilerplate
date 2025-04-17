import { useTranslation } from "react-i18next";
import SingleAudio from "../singleAudio";
import SingleImage from "../singleImage";
import SingleVideo from "../singleVideo";
const RelatedProduct = (props) => {
  const {t} = useTranslation()
  return (
    <section className="related__area mb-240">
      <div className="container">
        <div className="row g-4 gallery">
          <div className="col-md-12">
            <div className="section__title mb-0">
              <h3>{("You may also like")}</h3>
              <h2>{("Related product")}</h2>
            </div>
          </div>
          {props.relatedProducts?.map((item, i) => (
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

export default RelatedProduct;
