import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";

import AllBlog from "../../components/blog/AllBlog";
import Sidebar from "../../components/blog/Sidebar";
import Breadcrumb from "../../components/common/breadcumb";
import MetaHead from "../../components/MetaHead";
import PublicLayout from "../../components/public-layout";
import { getServerApiRequest } from "../../utils/serverApi";

const Blog = (props) => {
  const {t} = useTranslation()
  return (
    <Fragment>
      <MetaHead
        seo_title={props.meta?.meta_title ?? t('Blog')}
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
        <Breadcrumb page="Blog" />
        <section className="blog__area big-img-bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-12">
                {props.blog_data.blogs.data?.length && (
                  <AllBlog blogs={props.blog_data.blogs} page={`/blog`} />
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

export default Blog;
export const getServerSideProps = async ({ req, query }) => {
  const { user_token, user_info } = req.cookies;
  const setting_data = await getServerApiRequest("setting", null);
  const footer_data = await getServerApiRequest("footer-details", null);
  const blogs = await getServerApiRequest(`blogs?page=${query.page}`, null);
  const metaData = await getServerApiRequest("get-meta", { 'meta_type': 1, 'page': 9 });

  return {
    props: {
        settings: setting_data.data.data ? setting_data.data.data : null,
        footer_info: footer_data.data.data ? footer_data.data.data : null,
        user_info: user_info ? JSON.parse(user_info) : null,
        token: user_token || null,
        blog_data: blogs.data.data,
        meta: metaData.data.data ? metaData.data.data : null,
    },
  };
};
