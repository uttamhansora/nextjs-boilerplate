import { Icon } from "@iconify/react";
import moment from "moment/moment";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import CreateBoard from "../components/common/createBoard";
import TopSearch from "../components/common/top-search";
import MetaHead from "../components/MetaHead";
import Comments from "../components/product-details/comments";
import RelatedProduct from "../components/product-details/related-product";
import ReportPhoto from "../components/product-details/report-modal";
import RelatedTags from "../components/product-details/tags";
import PublicLayout from "../components/public-layout";
import {
  addFollowAction,
  handleFevourteAction,
  productDownloadAction,
} from "../redux/actions/common";
import { getServerApiRequest } from "../utils/serverApi";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

const ProductDetails = (props) => {
  const { t } = useTranslation();
  const [donateCount, setDonateCount] = useState(1);
  const [saveModal, setSaveModal] = useState(false);
  const [productId, setProductId] = useState(null);
  const [reportShow, setReportShow] = useState(false);
  const [variationId, setVariationId] = useState(null);
  const [variationPrice, setVariationPrice] = useState(0);
  const [variationDownloadId, setVariationDownloadId] = useState(null);
  const [variationDownloadName, setVariationDownloadName] = useState("");
  const [follow, setFollow] = useState(
    props.product_details.product?.user?.user_follow_by_auth_customer ||
      props.product_details.product?.customer?.customer_follow_by_auth_customer
      ? true
      : false
  );
  const route = useRouter();

  const [show, setShow] = useState(false)
  const handleDropdown = () => {
    setShow(!show)
    setVariationDownloadId(null)
  };

  const [favourite, setFavourite] = useState(
    props.product_details.product.is_featured == 1 ? true : false
  );

  const [downloadCount, setDownloadCount] = useState(
    props.product_details.product.download_products_count
  );
  const [favouriteProductsCount, setfavouriteProductsCount] = useState(
    props.product_details.product.favourite_products_count
  );
  const getCurrencySymbol = (amount) => {
    if (props.settings?.currency?.placement === "after") {
      return amount + props.settings?.currency?.symbol;
    } else {
      return props.settings?.currency?.symbol + amount;
    }
  };
  const handleDownload = (variation_id) => {
    if(props.user_info == null) {
      route.push(`/login`);
    }
    else{
      props.productDownloadAction(
        variation_id,
        setDownloadCount
      );
    }
  };
  const handleDownloadVariation = () => {
    props.productDownloadAction(
      variationDownloadId,
      setDownloadCount
    );
  };
  const handleFavourtie = () => {
    props.handleFevourteAction(
      {
        product_id: props.product_details.product.id,
      },
      null,
      setfavouriteProductsCount,
      setFavourite,
      favourite
    );
  };
  const handleOpenSave = () => {
    setSaveModal(true);
  };
  const handleFollow = () => {
    const data = {
      following_customer_id: props.product_details.product?.customer?.id,
      following_user_id: props.product_details.product?.user?.id,
    };
    props.addFollowAction(data, setFollow, follow);
  };
  const variationClickHandler = (id, price) => {
    setVariationId(id);
    setVariationPrice(price);
  };
  
  const variationDownloadClickHandler = (id, name) => {
    setVariationDownloadId(id);
    setVariationDownloadName(name);
  };


  return (
    <Fragment>
      <MetaHead
        seo_title={props.meta?.meta_title ?? props.product_details.product.title}
        seo_description={props.meta?.meta_description ?? props.product_details.product.description}
        seo_keyword={props.meta?.meta_keyword}
        seo_image={props.product_details.product.thumbnail_image}
      />
      <PublicLayout
        settings={props.settings}
        footer_info={props.footer_info}
        user_info={props.user_info}
        token={props.token}
      >
        <TopSearch productTypes={props.product_types} />
        <section className="purchase__area">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-12">
                {props.product_details.product.product_type_id === 5 ? (
                  <div className="purchase__img audio">
                    <audio controls controlsList="nodownload noplaybackrate">
                      <source
                        src={props.product_details.product.main_file}
                        type="audio/mpeg"
                      />
                    </audio>
                  </div>
                ) : props.product_details.product.product_type_id === 3 ? (
                  <div>
                    <video
                      controls
                      controlsList="nodownload"
                      className="video"
                      width="100%"
                      height="100%"
                    >
                      <source
                        src={props.product_details.product.play_link}
                        type="video/mp4"
                      />
                    </video>
                  </div>
                ) : (
                  <div className="purchase__img">
                    <img
                      src={props.product_details.product.thumbnail_image}
                      alt={props.product_details.product.title}
                    />
                  </div>
                )}
                {props.settings.product_title_in_details_page == 1 &&
                  <h1 className="details-title pt-1">
                    {props.product_details.product.title}
                  </h1>
                }
                {props.settings.product_description_in_details_page == 1 &&
                  <p className="pt-1">
                    {props.product_details.product.description}
                  </p>
                }
                {props.product_details.relatedTags.length !== 0 && (
                  <RelatedTags
                    product_type_id={
                      props.product_details.product.product_type_id
                    }
                    relatedTags={props.product_details.relatedTags}
                  />
                )}
                <Comments product_details={props.product_details} />
              </div>
              <div className="col-lg-4 col-12">
                <div className="count-wrapper mb-23">
                  <div className="count-box">
                    <Icon icon="akar-icons:eye" width="24" height="24" />
                    <span className="count">
                      {props.product_details.product.total_watch}
                    </span>
                  </div>
                  <div className="count-box">
                    <Icon icon="akar-icons:heart" width="24" height="24" />
                    <span className="count">{favouriteProductsCount}</span>
                  </div>
                  <div className="count-box">
                    <Icon
                      icon="heroicons-outline:download"
                      width="24"
                      height="24"
                    />
                    <span className="count">{downloadCount}</span>
                  </div>
                </div>
                <div className="purchase__item mb-25">
                  {props.product_details.product.accessibility === 1 ? (
                    <div className="premium-info mb-25">
                      <img src="/images/icons/premium-2.svg" alt="icon" />
                      <h2>{t("Premium Resource")}</h2>
                      <p>
                        {t("Unlock this file and save on your Premium subscription.")}
                      </p>
                      <div className="row">

                        <div className="col-md-12 mb-2 p-2">
                          <div className="resource-dropdown-btn">
                            <button onClick={handleDropdown} className="btn bg-theme w-100">{t("Download")}
                              <span><Icon icon="heroicons-outline:download" width="20" height="20" /></span>
                            </button>
                          </div>
                          {
                            show && <div className="show-resource-dropdown p-4 mt-3">
                              <p className="mb-2">{t("Choose a variation")}</p>
                              {props.product_details.product.variations.map(
                                (item, index) => (
                                  <div className="choose-size-item d-flex align-items-center justify-content-between">
                                    <span className="text-secondary-color fw-semibold">{item.variation}</span>
                                    <div className="form-check">
                                      <input className="form-check-input" onClick={() =>
                                        variationDownloadClickHandler(item.id, item.variation)
                                      } type="radio" name="variation_download" value="" id={item.id} />
                                      <label className="form-check-label" for={item.id}></label>
                                    </div>
                                  </div>
                                ))}
                              <a onClick={() => handleDownloadVariation()}  className={`bg-green btn px-3 mt-3 ${variationDownloadId == null ? "disabled" : ""}`}>
                                {t("Download")} {variationDownloadName}
                              </a>
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="premium-info mb-25">
                      <a onClick={() => handleDownload(props.product_details.product?.variations[0]?.id)} className="btn bg-green">
                        {t("Download")}
                        <span>
                          <Icon
                            icon="heroicons-outline:download"
                            width="20"
                            height="20"
                          />
                        </span>
                      </a>
                    </div>
                  )}
                  <ul className="item-action">
                    <li>
                      {favourite ? (
                        <a onClick={handleFavourtie} title="Favourite">
                          <Icon
                            icon="ant-design:heart-filled"
                            color="red"
                            width="24"
                            height="24"
                          />
                        </a>
                      ) : (
                        <a onClick={handleFavourtie} title="Favourite">
                          <Icon
                            icon="ant-design:heart-outlined"
                            width="24"
                            height="24"
                          />
                        </a>
                      )}
                    </li>
                    <li>
                      <a title="Create Board" onClick={handleOpenSave}>
                        <Icon
                          icon="fluent:board-24-regular"
                          width="24"
                          height="24"
                        />
                        <span>{t("Boards")}</span>
                      </a>
                    </li>
                  </ul>
                  <div className="share-box">
                    <div>
                      <Icon
                        icon="ant-design:share-alt-outlined"
                        width="24"
                        height="24"
                      />
                      <span className="share-title">{t("Shares")}</span>
                    </div>
                    <div className="share-icon">
                      <FacebookShareButton
                        url={
                          typeof window !== "undefined" && window.location.href
                        }
                        children={
                          <a>
                            <Icon
                              icon="logos:facebook"
                              width="22"
                              height="22"
                            />
                          </a>
                        }
                      />
                      <TwitterShareButton
                        url={
                          typeof window !== "undefined" && window.location.href
                        }
                        children={
                          <a>
                            <Icon icon="logos:twitter" width="22" height="22" />
                          </a>
                        }
                      />
                      <LinkedinShareButton
                        url={
                          typeof window !== "undefined" && window.location.href
                        }
                        children={
                          <a>
                            <Icon
                              icon="logos:linkedin-icon"
                              width="22"
                              height="22"
                            />
                          </a>
                        }
                      />
                    </div>
                  </div>
                  {/* {props.product_details.product.accessibility === 1 ? (
                    <div className="item-title mb-24">
                      <h4>{t("Premium License")}</h4>
                      <p>
                        {t("Go premium and you will receive the commercial license.")}
                      </p>
                    </div>
                  ) : (
                    <div className="item-title mb-24">
                      <h4>{t("License")}</h4>
                      <p>
                        {t("Free for personal and commercial purpose with attribution.")}
                      </p>
                    </div>
                  )} */}

                  <div className="item-bottom">
                    <div className="user-info">
                      <div className="user-img">
                        <img
                          src={
                            props.product_details.product?.user?.image ||
                            props.product_details.product?.customer?.image
                          }
                          alt="user-img"
                        />
                      </div>
                      <div className="user-text">
                        {props.product_details.product?.customer && (
                          <Link
                            as={`/customer/${props.product_details.product?.customer?.slug}`}
                            href="/customer/[slug]"
                          >
                            <h2>
                              {props.product_details.product?.customer?.name}
                            </h2>
                          </Link>
                        )}
                        {props.product_details.product?.user && (
                          <Link
                            as={`/user/${props.product_details.product?.user?.slug}`}
                            href="/user/[slug]"
                          >
                            <h2>{props.product_details.product?.user?.name}</h2>
                          </Link>
                        )}
                        <p>
                          {props.product_details.product?.user?.totalProducts ||
                            props.product_details.product?.customer
                              ?.totalProducts}{" "}
                          {t("Resource")}
                        </p>
                      </div>
                    </div>
                    <div className="item-right">
                      <button
                        onClick={handleFollow}
                        className={`btn btn-outline-theme follow-unfollow ${follow ? "yes" : ""
                          }`}
                      >
                        <span className="follow">{t("Follow")}</span>
                        <span className="unfollow">{t("Unfollow")}</span>
                      </button>
                    </div>

                  </div>

                  {props.product_details.product.accessibility === 1 ? (
                    <div className="buy-single-license border p-4 mt-3 w-100 bg-white">
                      <div className="mb-2 fw-bold text-secondary-color">{t("Buy Single License")}</div>

                      {props.product_details.product.variations.map((item) => (
                        <div className="choose-size-item d-flex align-items-center justify-content-between">
                          <div className="form-check">
                            <input className="form-check-input" onClick={() =>
                              variationClickHandler(item.id, item.price)
                            } type="radio" name="variation_single_download" id={item.id} />
                            <label className="form-check-label" for={item.id}></label>
                          </div>
                          <span className="buy-single-license-size-box text-secondary-color fw-semibold">{item.variation}</span>
                          <span className="fw-semibold">{getCurrencySymbol(item.price)}</span>
                        </div>
                      ))}
                      <div className="mt-30">
                        <Link
                          href={`/pay?id=${props.product_details.product.id}&type=product&variation_id=${variationId}`}
                          className={`btn btn-black ${variationId == null ? "disabled" : ""
                            }`}
                        >
                          {t("Buy Now")}{" "}
                          {getCurrencySymbol(variationPrice)}
                        </Link>
                      </div>
                    </div>
                  ) : (
                    props.settings.donation_status == 1 && (
                      <div className="item-donate mb-30">
                        <div className="donate-wrapper mb-20">
                          <div className="donate-burger">
                            {[1, 2, 3, 4, 5].map((item) => (
                              <img
                                key={item}
                                className={`${item <= donateCount ? "active" : ""
                                  }`}
                                src="/images/icons/burger.svg"
                                alt="icon"
                              />
                            ))}
                          </div>
                          <div className="donate-count">
                            {[1, 2, 3, 4, 5].map((item) => (
                              <button
                                onClick={() => setDonateCount(item)}
                                key={item}
                                className={`${item <= donateCount ? "active" : ""
                                  }`}
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                        </div>
                        <Link
                          href={`/pay?id=${props.product_details.product.id
                            }&type=donation&amount=${props.product_details.donatePrice * donateCount
                            }`}
                          className="btn btn-black w-100"
                        >
                          {t("Donate")}
                          {getCurrencySymbol(
                            props.product_details.donatePrice * donateCount
                          )}
                        </Link>
                      </div>
                    )
                  )}
                </div>
                {props.product_details.product.product_type_id == 1 && (
                  <div className="colors purchase__item">
                    <div className="title">
                      <Icon icon="cil:drop" width="20" height="20" />
                      {t("Color Palette")}
                    </div>
                    <div className="color">
                      {props.product_details.productColors.map(
                        ({ id, color_code }) => (
                          <Link
                            as={`/colors-products/${color_code}`}
                            href="/colors-products/[slug]"
                            key={id}
                            style={{ backgroundColor: `#${color_code}` }}
                          ></Link>
                        )
                      )}
                    </div>
                  </div>
                )}
                <ul className="list-group product-details purchase__item">
                  <li className="list-group-item d-flex align-items-center">
                    <Icon icon="bi:info-circle" width="24" height="24" />
                    <div className="title"> {t("Details")}</div>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div>{t("Photo")}</div>
                    <div>#{props.product_details.product.id}</div>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div>{t("Published On")}</div>
                    <div>
                      {moment(props.product_details.product.created_at).format(
                        "MMM DD, Y"
                      )}
                    </div>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div>{t("Product Type")}</div>
                    <div>{props.product_details.product.file_types}</div>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div>{t("Category")}</div>
                    <div>
                      {props.product_details.product.product_category.name}
                    </div>
                  </li>
                </ul>
                <div
                  onClick={() => setReportShow(true)}
                  className="report-wrapper"
                >
                  <Icon
                    icon="ant-design:warning-outlined"
                    width="18"
                    height="18"
                  />
                  <span className="report-text">{t("Report Photo")}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <RelatedProduct
          saveOpen={handleOpenSave}
          setProductId={setProductId}
          relatedProducts={props.product_details.relatedProducts}
        />
      </PublicLayout>
      <CreateBoard
        isOpen={saveModal}
        hideModal={() => setSaveModal(false)}
        productId={productId ? productId : props.product_details.product.id}
      />
      <ReportPhoto
        reportShow={reportShow}
        setReportShow={setReportShow}
        reportedCategories={props.product_details.reportedCategories}
        id={props.product_details.product.id}
      />
    </Fragment>
  );
};
export default connect(null, {
  productDownloadAction,
  handleFevourteAction,
  addFollowAction,
})(ProductDetails);
export const getServerSideProps = async ({ req, query }) => {
  const { user_token, user_info } = req.cookies;
  const setting_data = await getServerApiRequest("setting", null);
  const footer_data = await getServerApiRequest("footer-details", null);
  const get_details_data = await getServerApiRequest(
    `product-details/${query.product_details}`,
    null
  );
  if(!get_details_data.data.data?.product?.id){
    return {
      redirect: { destination: "/404", permanent: false },
    };
  }

  const product_type_data = await getServerApiRequest(`product-type`, null);
  const metaData = await getServerApiRequest("get-meta", {
    meta_type: 4,
    page: get_details_data.data.data.product.id,
  });

  return {
    props: {
      settings: setting_data.data.data,
      footer_info: footer_data.data.data,
      user_info: user_info ? JSON.parse(user_info) : null,
      token: user_token || null,
      product_details: get_details_data.data.data,
      product_types: product_type_data.data.data,
      meta: metaData.data.data,
    },
  };
};
