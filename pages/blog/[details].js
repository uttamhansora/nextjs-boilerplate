import React, { Fragment } from "react";
import BlogDetails from "../../components/blog/BlogDetails";
import Comments from "../../components/blog/Comments";
import Sidebar from "../../components/blog/Sidebar";
import Breadcrumb from "../../components/common/breadcumb";
import MetaHead from "../../components/MetaHead";
import PublicLayout from "../../components/public-layout";
import { getServerApiRequest } from "../../utils/serverApi";
const Details = (props) => {
  return (
    <Fragment>
      <MetaHead
        seo_title={props.meta?.meta_title ?? props.blog_data.blog.title}
        seo_description={props.meta?.meta_description}
        seo_keyword={props.meta?.meta_keyword}
        seo_image={props.blog_data.blog.image}
      />
      <PublicLayout
        settings={props.settings}
        footer_info={props.footer_info}
        user_info={props.user_info}
        token={props.token}
      >
        <Breadcrumb page="Blog Details" />
        <section className="blog__area big-img-bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-12">
                <BlogDetails blog_data={props.blog_data.blog} />
                <Comments
                  user={props.user_info}
                  blogId={props.blog_data.blog.id}
                  blogComments={props.blog_data.blogComments}
                />
              </div>
              <Sidebar blog_essential={props.blog_data.blog_essential} />
            </div>
          </div>
        </section>
      </PublicLayout>
    </Fragment>
  );
};

export default Details;
export const getServerSideProps = async ({ req, query }) => {
  const { user_token, user_info } = req.cookies;
  const setting_data = await getServerApiRequest("setting", null);
  const footer_data = await getServerApiRequest("footer-details", null);
  const blogs = await getServerApiRequest(
    `blog-details/${query.details}`,
    null
  );

  const metaData = await getServerApiRequest("get-meta", {
    meta_type: 6,
    page: blogs.data.data?.blog?.id,
  });
  return {
    props: {
      settings: setting_data.data.data ? setting_data.data.data : null,
      footer_info: footer_data.data.data ? footer_data.data.data : null,
      user_info: user_info ? JSON.parse(user_info) : null,
      token: user_token || null,
      blog_data: blogs.data.data ? blogs.data.data : null,
      meta: metaData.data.data ? metaData.data.data : null,
    },
  };
};
