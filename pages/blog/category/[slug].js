import React, { Fragment } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import AllBlog from "../../../components/blog/AllBlog";
import Sidebar from "../../../components/blog/Sidebar";
import MetaHead from "../../../components/MetaHead";
import PublicLayout from "../../../components/public-layout";
import { getServerApiRequest } from "../../../utils/serverApi";
import { useTranslation } from "react-i18next";
const BlogCategory = (props) => {
  const {t} = useTranslation()
  const router = useRouter();
  return (
    <Fragment>
      <MetaHead
        seo_title={props.meta?.meta_title ?? props.blog_data.pageTitle}
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
        <div className="breadcrumb__area">
          <div className="container">
            <div className="breadcrumb__content">
              <div className="breadcrumb__content__left">
                <div className="breadcrumb__title">
                  <h2>{t("Blog")} {props.blog_data.pageTitle}</h2>
                </div>
              </div>
              <div className="breadcrumb__content__right">
                <nav
                  style={{ "--bs-breadcrumb-divider": `"/"` }}
                  aria-label="breadcrumb"
                >
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link href="/">{t("Home")}</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link href="/blog">{t("Blog")}</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      {props.blog_data.pageTitle}
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <section className="blog__area big-img-bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-12">
                {props.blog_data.blogs.data?.length && (
                  <AllBlog
                    blogs={props.blog_data.blogs}
                    page={`/blog/category/${router.query.slug}`}
                  />
                )}
              </div>

              <Sidebar blog_essential={props.blog_data.blog_essential} />
            </div>
          </div>
        </section>
      </PublicLayout>
    </Fragment>
  );
};

export default BlogCategory;
export const getServerSideProps = async ({ req, query }) => {
  const { user_token, user_info } = req.cookies;
  const setting_data = await getServerApiRequest("setting", null);
  const footer_data = await getServerApiRequest("footer-details", null);
  const blogs = await getServerApiRequest(
    `category-blogs/${query.slug}?page=${query.page}`,
    null
  );
  const blogs_essential = await getServerApiRequest(`blog-essential`, null);

  const metaData = await getServerApiRequest("get-meta", {
    meta_type: 5,
    page: blogs.data.data?.blogCategory?.id,
  });

  return {
    props: {
      settings: setting_data.data.data ? setting_data.data.data : null,
      footer_info: footer_data.data.data ? footer_data.data.data : null,
      user_info: user_info ? JSON.parse(user_info) : null,
      token: user_token || null,
      blog_data: blogs.data.data ? blogs.data.data : null,
      blog_essential: blogs_essential.data.data
        ? blogs_essential.data.data
        : null,
      meta: metaData.data.data ? metaData.data.data : null,
    },
  };
};
