import Head from "next/head";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import PublicLayout from "../../components/public-layout";

import CreateBoard from "../../components/common/createBoard";
import SingleAudio from "../../components/singleAudio";
import SingleImage from "../../components/singleImage";
import SingleVideo from "../../components/singleVideo";
import { getServerApiRequest } from "../../utils/serverApi";
import { useTranslation } from "react-i18next";

const ProductColors = (props) => {
  const {t} = useTranslation()
  const router = useRouter();
  const [saveModal, setSaveModal] = useState(false);
  const [productId, setProductId] = useState(null);
  const handleOpenSave = () => {
    setSaveModal(true);
  };
  return (
    <Fragment>
      <Head>
        <title>{t("Color Product")}</title>
        <meta name="description" content="Details Description" />
        <meta name="keywords" content="Details Keywords" />
        <meta property="og:image" content="/images/preview.png" />
        <meta property="og:title" content="Color Product" />
        <meta property="og:description" content="Details Description" />
        <meta name="twitter:title" content="Color Product" />
        <meta name="twitter:description" content="Details Description" />
        <meta name="twitter:image" content="/images/preview.png" />
        <meta name="robots" content="max-image-preview:large" />
      </Head>
      <PublicLayout
        settings={props.settings}
        footer_info={props.footer_info}
        user_info={props.user_info}
        token={props.token}
      >
        <div className="big-img-bg tags-section">
          <div className="container">
            <div className="mb-30">
              <h3 className="title">#{router.query.slug}</h3>
              <p className="subtitle">
                <span
                  className="color-circle"
                  style={{ backgroundColor: `#${router.query.slug}` }}
                ></span>{" "}
                Colors ({props.products.data.length})
              </p>
            </div>
            <div className="row g-4 gallery">
              {props.products.data.length === 0 ? (
                <h2 className="text-center pt-5">{t("No Data Found")}</h2>
              ) : (
                props.products.data.map((item, i) => (
                  <div className="col-xl-3 col-lg-4 col-md-6 col-12" key={i}>
                    {item.product_type_id === 5 ? (
                      <SingleAudio
                        item={item}
                        handleOpenSave={() => {
                          handleOpenSave;
                          setProductId(item.id);
                        }}
                      />
                    ) : item.product_type_id === 3 ? (
                      <SingleVideo
                        item={item}
                        handleOpenSave={() => {
                          handleOpenSave;
                          setProductId(item.id);
                        }}
                      />
                    ) : (
                      <SingleImage
                        item={item}
                        handleOpenSave={() => {
                          handleOpenSave;
                          setProductId(item.id);
                        }}
                      />
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </PublicLayout>
      <CreateBoard
        isOpen={saveModal}
        hideModal={() => setSaveModal(false)}
        productId={productId}
      />
    </Fragment>
  );
};
export default ProductColors;
export const getServerSideProps = async ({ req, query }) => {
  const { user_token, user_info } = req.cookies;
  const setting_data = await getServerApiRequest("setting", null);
  const footer_data = await getServerApiRequest("footer-details", null);
  const get_products_data = await getServerApiRequest(
    `color-products?color=${query.slug}`,
    null
  );
  return {
    props: {
      settings: setting_data.data.data ? setting_data.data.data : null,
      footer_info: footer_data.data.data ? footer_data.data.data : null,
      user_info: user_info ? JSON.parse(user_info) : null,
      token: user_token || null,
      products: get_products_data.data.data
        ? get_products_data.data.data
        : null,
    },
  };
};
