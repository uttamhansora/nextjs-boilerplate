import React, { Fragment } from "react";

import Head from "next/head";
import AboutList from "../components/AboutUs/list";
import AuthenticStock from "../components/AboutUs/stock";
import TeamMembers from "../components/AboutUs/team";
import Breadcrumb from "../components/common/breadcumb";
import Blog from "../components/home/blog";
import Testimonial from "../components/home/testmonial";
import WhyZaistock from "../components/home/whyZaistock";
import PublicLayout from "../components/public-layout";
import { getServerApiRequest } from "../utils/serverApi";
import MetaHead from "../components/MetaHead";
const AboutUs = (props) => {
  return (
    <Fragment>
      <MetaHead
        seo_title={props.meta.meta_title}
        seo_description={props.meta.meta_description}
        seo_keyword={props.meta.meta_keyword}
        seo_image={props.settings.app_logo}
      />
      <PublicLayout
        settings={props.settings}
        footer_info={props.footer_info}
        user_info={props.user_info}
        token={props.token}
      >
        <Breadcrumb page="About Us" />
        <WhyZaistock why_uss_data={props.why_us} />

        <AuthenticStock settings={props.about.settings} />
        <AboutList galleryPoints={props.about.galleryPoints} />
        <div className="big-img-bg">
          <TeamMembers
            teamMembers={props.about.teamMembers}
            settings={props.about.settings}
          />
          <Testimonial testmonial={props.testmonial} />
          <Blog blog_data={props.blogs} />
        </div>
      </PublicLayout>
    </Fragment>
  );
};

export default AboutUs;
export const getServerSideProps = async ({ req }) => {
  const { user_token, user_info } = req.cookies;
  const setting_data = await getServerApiRequest("setting", null);
  const footer_data = await getServerApiRequest("footer-details", null);
  const about_data = await getServerApiRequest(`about-us`, null);
  const why_data = await getServerApiRequest(`why-uss`, null);
  const testimonials_data = await getServerApiRequest(`testimonials`, null);
  const blog_data = await getServerApiRequest("latest-blogs", null);
  const metaData = await getServerApiRequest("get-meta", {'meta_type' : 1, 'page' : 3});

  return {
    props: {
      settings: setting_data.data.data,
      footer_info: footer_data.data.data,
      user_info: user_info ? JSON.parse(user_info) : null,
      token: user_token || null,
      about: about_data.data.data,
      why_us: why_data.data.data,
      testmonial: testimonials_data.data.data,
      blogs: blog_data.data.data,
      meta: metaData.data.data,
    },
  };
};
