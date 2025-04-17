import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import ReactPaginate from "react-paginate";
import CreateBoard from "../components/common/createBoard";
import TopSearch from "../components/common/top-search";
import SearchSidebar from "../components/filter-products/SearchSidebar";
import PublicLayout from "../components/public-layout";
import SingleAudio from "../components/singleAudio";
import SingleImage from "../components/singleImage";
import SingleVideo from "../components/singleVideo";
import { objectToQueryString } from "../utils/commonFunctions";
import { getServerApiRequest } from "../utils/serverApi";
import MetaHead from "../components/MetaHead";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Link from "next/link";

const FilterProducts = (props) => {
  const { t } = useTranslation();
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
    router.push(`/filter?page=${value.selected + 1}`);
    setSelected(value.selected);
  };
  return (
    <Fragment>
      <MetaHead
        seo_title={props.meta?.meta_title ?? props.search_data?.pageTitle}
        seo_description={props.meta?.meta_description}
        seo_keyword={props.meta?.meta_keyword}
        seo_image={props.settings.app_logo}
      />
      <PublicLayout
        settings={props.settings}
        footer_info={props.footer_info}
        user_info={props.user_info}
        token={props.token}
      >
        <TopSearch productTypes={props.product_types} />
        <section className="filter-page-area open-close-sidebar">
          <div className="container-fluid p-0">
            <div className="filter-top-bar filter-tags-row">
              <div className="filter-header text-white align-items-center">
                <div className="filter-title d-flex align-items-center">
                  <Icon icon="mi:filter" width="24" height="24" />
                  <h6 className="text-white">{t("Filters")}</h6>
                </div>
                <button className="d-none filter-collapse">
                  <i className="fa-solid fa-angle-left"></i>
                </button>
              </div>
            </div>
            <div className="filter-page-bottom-area position-relative d-flex">
              <SearchSidebar
                categories={props.search_data?.productCategories}
              />

              <div className="filtered-content">
                <div className="img-gallery__area p-0">
                  {props.search_data?.products?.total > 0 ? (
                    <div className="search-results-count">
                      <span className="">
                        {t("Total")} {props.search_data?.products?.total}
                      </span>
                    </div>
                  ) : (
                    <div className="search-results-count-not-found">
                      <div className="thankyou-box text-center bg-white px-5 py-5">
                        <img
                          src="/images/my-product/empty_box.png"
                          alt="img"
                          className="img-fluid"
                        />
                        <h5 className="mt-5">
                          {t("We're sorry, we couldn't find results for your search.")}
                        </h5>
                      </div>
                    </div>
                  )}
                  <div gutter="10px" className="gallery row g-2">
                    <div className="container-fluid">
                      <section className="img-gallery__area">
                        {props.search_data?.products?.data.length === 0 ? (
                          <h2 className="text-center pt-5">{t("No Data Found")}</h2>
                        ) : (
                          <ResponsiveMasonry
                            columnsCountBreakPoints={{ 350: 1, 700: 2, 900: 3, 1200: 4 }}
                          >
                            <Masonry gutter="10px" className="gallery mesonary-gallery g-2">
                              {props.search_data?.products?.data.map((item, i) => (
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
                  </div>
                  {props.search_data?.products?.total >
                    props.search_data?.products?.per_page && (
                      <nav className="filter-pagination mt-35">
                        <ReactPaginate
                          containerClassName="paginationWrapper"
                          pageCount={
                            props.search_data?.products?.total /
                            props.search_data?.products?.per_page
                          }
                          pageRangeDisplayed={
                            props.search_data?.products?.per_page
                          }
                          onPageChange={handleChange}
                          nextLabel={<i className="fa fa-angle-right"></i>}
                          previousLabel={<i className="fa fa-angle-left"></i>}
                          forcePage={selected}
                        />
                      </nav>
                    )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </PublicLayout>
      <CreateBoard
        isOpen={saveModal}
        hideModal={() => setSaveModal(false)}
        productId={productId}
      />
    </Fragment>
  );
};
export default FilterProducts;
export const getServerSideProps = async ({ req, query }) => {
  const { user_token, user_info } = req.cookies;
  const setting_data = await getServerApiRequest("setting", null);
  const footer_data = await getServerApiRequest("footer-details", null);
  const product_type_data = await getServerApiRequest(`product-type`, null);
  const query_string = {
    search_string: query.search ? query.search : "",
    type: query.type ? query.type : "",
    accessibilityType: query.accessibility ? query.accessibility : "",
    page: query.page ? query.page : "",
    sortBy: query.shotby ? query.shotby : "",
    productCategoryIds: query.categories ? query.categories : "",
  };
  const get_filter_data = await getServerApiRequest(
    `get-filter-products?${objectToQueryString(query_string)}`,
    null
  );

  const metaData = await getServerApiRequest("get-meta", { 'meta_type': 2, 'page': query_string.productCategoryIds[1] });
  return {
    props: {
      settings: setting_data.data.data,
      footer_info: footer_data.data.data,
      user_info: user_info ? JSON.parse(user_info) : null,
      token: user_token || null,
      search_data: get_filter_data.data.data,
      product_types: product_type_data.data.data,
      meta: metaData.data.data,
    },
  };
};
