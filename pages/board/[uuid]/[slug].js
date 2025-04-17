import { Icon } from "@iconify/react";
import moment from "moment/moment";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import TopSearch from "../../../components/common/top-search";
import PublicLayout from "../../../components/public-layout";
import { getProductTypesAction } from "../../../redux/actions/common";
import { removeAuthCookie } from "../../../utils/commonFunctions";
import {
  deleteBoardProductAction,
  getBoardsDetailsAction,
} from "../../../redux/actions/profile";
import { getServerApiRequest } from "../../../utils/serverApi";

const BoardsDetails = (props) => {
  const {t} = useTranslation()
  const router = useRouter();

  useEffect(() => {
    props.getBoardsDetailsAction(router.query.uuid, router.query.slug);
  }, [router.query.uuid]);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        props.deleteBoardProductAction(
          id,
          router.query.uuid,
          router.query.slug
        );
      }
    });
  };
  const handleChange = (value) => {
    props.getMyProductSaleDataAction(`page=${value.selected + 1}`);
    setSelected(value.selected);
  };

  return (
    <Fragment>
      <Head>
        <title>{t("My Boards")}</title>
      </Head>
      <PublicLayout
        settings={props.settings}
        footer_info={props.footer_info}
        user_info={props.user_info}
        token={props.token}
      >
        <TopSearch productTypes={props.product_types} />
        <section className="dashboard__area boards-view-page">
          <div className="container">
            <div className="boards-view__area">
              <div className="item-top">
                <div className="item-left">
                  <h2>{props.board_details?.board?.name}</h2>
                  <p>
                    {t("By")}{" "}
                    {`${props.board_details?.board?.customer?.first_name} ${props.board_details?.board?.customer?.last_name}`}
                  </p>
                </div>
              </div>
              {props.board_details?.boardProducts?.data?.length === 0 ? (
                <h5 className="text-center">{t("No Data Found")}</h5>
              ) : (
                <>
                  <div className="boards-view__content">
                    <div className="row">
                      {props.board_details?.boardProducts?.data?.map(
                        ({ id, product }) => (
                          <div key={id} className="col-lg-4 col-md-6">
                            <div className="boards__item">
                              <div className="item-wrap">
                                <div className="product-type-container">
                                  {product.product_type_id === 5 ? (
                                    <Link
                                      className="product-type-audio"
                                      href={`/[product_details]`}
                                      as={`/${product.slug}`}
                                    >
                                      <audio
                                        controls
                                        controlsList="nodownload noplaybackrate"
                                      >
                                        <source
                                          src={product.main_file}
                                          type="audio/mpeg"
                                        />
                                      </audio>
                                    </Link>
                                  ) : product.product_type_id === 3 ? (
                                    <Link
                                      href={`/[product_details]`}
                                      as={`/${product.slug}`}
                                    >
                                      <video
                                        onMouseOver={(e) => e.target.play()}
                                        onMouseOut={(e) => e.target.pause()}
                                        className="video"
                                        width="100%"
                                        height="210px"
                                      >
                                        <source
                                          src={product.main_file}
                                          type="video/mp4"
                                        />
                                      </video>
                                    </Link>
                                  ) : (
                                    <Link
                                      className="product-img-link"
                                      href={`/[product_details]`}
                                      as={`/${product.slug}`}
                                    >
                                      <img
                                        className="product-img"
                                        src={product.thumbnail_image}
                                        alt="img"
                                      />
                                    </Link>
                                  )}
                                </div>
                                <div className="item-content-wrap">
                                  <div className="item-content">
                                    <div className="item-left">
                                      <h4>
                                        {moment(product.created_at).format(
                                          "DD MMM Y"
                                        )}
                                      </h4>
                                    </div>
                                  </div>
                                  <h2>
                                    {" "}
                                    <Link
                                      href={`/[product_details]`}
                                      as={`/${product.slug}`}
                                    >
                                      {t(product.title)}
                                    </Link>
                                  </h2>
                                  <div className="item-content">
                                    <div className="item-left">
                                      <p>
                                        {t("Credit")}:{" "}
                                        {product.user?.name ||
                                          product.customer?.name}
                                      </p>
                                    </div>
                                    <div className="item-right">
                                      <a onClick={() => handleDelete(id)}>
                                        <Icon
                                          icon="bx:trash"
                                          width="22"
                                          height="22"
                                          className="trash"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  {props.board_details?.boardProducts?.total >
                    props.board_details?.boardProducts?.per_page && (
                    <nav className="filter-pagination mt-35">
                      <ReactPaginate
                        containerClassName="paginationWrapper"
                        pageCount={
                          props.board_details?.boardProducts?.total /
                          props.board_details?.boardProducts?.per_page
                        }
                        pageRangeDisplayed={
                          props.board_details?.boardProducts?.per_page
                        }
                        onPageChange={handleChange}
                        nextLabel={<i className="fa fa-angle-right"></i>}
                        previousLabel={<i className="fa fa-angle-left"></i>}
                        forcePage={selected}
                      />
                    </nav>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      </PublicLayout>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  board_details: state.profile.board_details,
});
export default connect(mapStateToProps, {
  getBoardsDetailsAction,
  deleteBoardProductAction,
  getProductTypesAction,
})(BoardsDetails);

export const getServerSideProps = async ({ req, res }) => {
  const { user_token } = req.cookies;

  const auth_data = await getServerApiRequest(`auth-status`, null, user_token);
  if (auth_data.data.auth_status === 'out') {
    removeAuthCookie(res);
    return {
      redirect: { destination: "/", permanent: false },
    };
  }
  const setting_data = await getServerApiRequest("setting", null);
  const footer_data = await getServerApiRequest("footer-details", null);
  const product_type_data = await getServerApiRequest(`product-type`, null);

  return {
    props: {
      user_info: auth_data.data.customer ? auth_data.data.customer : null,
      settings: setting_data.data.data ? setting_data.data.data : null,
      footer_info: footer_data.data.data ? footer_data.data.data : null,
      token: user_token || null,
      product_types: product_type_data.data.data
        ? product_type_data.data.data
        : null,
    },
  };
};
