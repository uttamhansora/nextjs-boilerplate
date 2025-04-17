import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import MetaHead from "../../../../../components/MetaHead";
import PublicLayout from "../../../../../components/public-layout";

import ReactPaginate from "react-paginate";
import CreateBoard from "../../../../../components/common/createBoard";
import SingleAudio from "../../../../../components/singleAudio";
import SingleImage from "../../../../../components/singleImage";
import SingleVideo from "../../../../../components/singleVideo";
import { getServerApiRequest } from "../../../../../utils/serverApi";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";

const ProductTags = (props) => {
  const router = useRouter();
  const [saveModal, setSaveModal] = useState(false);
  const [productId, setProductId] = useState(null);
  const [selected, setSelected] = useState(
      router.query.page && router.query.page - 1
  );
  const handleOpenSave = () => {
    setSaveModal(true);
  };
  const handleChange = (value) => {
    router.push(
        `/tags/${router.query.slug}/${router.query.type_id}/${
            router.query.id
        }?page=${value.selected + 1}`
    );
    setSelected(value.selected);
  };
  return (
      <Fragment>
        {/* <Head>
        <title>{router.query.slug.replace("-", " ")}</title>
        <meta name="description" content="Details Description" />
        <meta name="keywords" content="Details Keywords" />
        <meta property="og:image" content="/images/preview.png" />
        <meta
          property="og:title"
          content={router.query.slug.replace("-", " ")}
        />
        <meta property="og:description" content="Details Description" />
        <meta
          name="twitter:title"
          content={router.query.slug.replace("-", " ")}
        />
        <meta name="twitter:description" content="Details Description" />
        <meta name="twitter:image" content="/images/preview.png" />
        <meta name="robots" content="max-image-preview:large" />
      </Head> */}
        <MetaHead
            seo_title={
                props.meta?.meta_title ?? router.query.slug.replace("-", " ")
            }
            seo_description={
                props.meta?.meta_description ?? router.query.slug.replace("-", " ")
            }
            seo_keyword={props.meta?.meta_keyword}
            seo_image={props.settings.app_logo}
        />
        <PublicLayout
            settings={props.settings}
            footer_info={props.footer_info}
            user_info={props.user_info}
            token={props.token}
        >
          <div className="big-img-bg tags-section">
            <div className="container">
              <div className="mb-30">
                <h3 className="title">{router.query.slug.replace("-", " ")}</h3>
                <p className="subtitle">Colors ({props.products.data.length})</p>
              </div>
              <div className="container-fluid">
                <section className="img-gallery__area">

                  {props.products.data.length === 0 ? (
                      <h2 className="text-center pt-5">{t("No Data Found")}</h2>
                  ) : (
                      <ResponsiveMasonry
                          columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4 }}
                      >
                        <Masonry gutter="10px" className="gallery mesonary-gallery g-2">
                          {props.products.data?.map((item, i) => (
                              <Fragment key={i}>
                                {item.content_type === 'audio' ? (
                                    <SingleAudio
                                        item={item}
                                        handleOpenSave={() => {
                                          handleOpenSave();
                                          setProductId(item.id);
                                        }}
                                    />
                                ) : item.content_type === 'video' ? (
                                    <SingleVideo
                                        item={item}
                                        handleOpenSave={() => {
                                          handleOpenSave();
                                          setProductId(item.id);
                                        }}
                                    />
                                ) : item.content_type === 'image' ? (
                                    <SingleImage
                                        item={item}
                                        handleOpenSave={() => {
                                          handleOpenSave();
                                          setProductId(item.id);
                                        }}
                                    />
                                ) : (
                                    <SingleImage
                                        item={item}
                                        handleOpenSave={() => {
                                          handleOpenSave();
                                          setProductId(item.id);
                                        }}
                                    />
                                )}
                              </Fragment>
                          ))}
                        </Masonry>
                      </ResponsiveMasonry>
                  )}
                </section>
              </div>
              {props.products.total > props.products.per_page && (
                  <nav className="filter-pagination mt-35">
                    <ReactPaginate
                        containerClassName="paginationWrapper"
                        pageCount={props.products.total / props.products.per_page}
                        pageRangeDisplayed={props.products.per_page}
                        onPageChange={handleChange}
                        nextLabel={<i className="fa fa-angle-right"></i>}
                        previousLabel={<i className="fa fa-angle-left"></i>}
                        forcePage={selected}
                    />
                  </nav>
              )}
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
export default ProductTags;
export const getServerSideProps = async ({ req, query }) => {
  const { user_token, user_info } = req.cookies;
  const setting_data = await getServerApiRequest("setting", null);
  const footer_data = await getServerApiRequest("footer-details", null);
  const get_products_data = await getServerApiRequest(
      `tag-products/${query.type_id}/${query.id}?page=${query.page}`,
      null
  );

  const metaData = await getServerApiRequest("get-meta", {
    meta_type: 3,
    page: query.id,
  });

  return {
    props: {
      settings: setting_data.data.data ? setting_data.data.data : null,
      footer_info: footer_data.data.data ? footer_data.data.data : null,
      user_info: user_info ? JSON.parse(user_info) : null,
      token: user_token || null,
      products: get_products_data.data.data
          ? get_products_data.data.data
          : null,
      meta: metaData.data.data ? metaData.data.data : null,
    },
  };
};
