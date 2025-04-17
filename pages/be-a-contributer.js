import React, { Fragment, useState } from "react";
import ApplyNow from "../components/be-contributer/apply";
import ApplyModals from "../components/be-contributer/contributer-modal";
import FAQ from "../components/be-contributer/faq";
import ApplyHero from "../components/be-contributer/hero";
import PaidProperly from "../components/be-contributer/paid";

import Breadcrumb from "../components/common/breadcumb";
import Testimonial from "../components/home/testmonial";
import MetaHead from "../components/MetaHead";
import PublicLayout from "../components/public-layout";
import { removeAuthCookie } from "../utils/commonFunctions";
import { getServerApiRequest } from "../utils/serverApi";

const AboutUs = (props) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
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
        <Breadcrumb page={props.contributor.pageTitle} />
        <ApplyHero
          handleShow={handleShow}
          settings={props.contributor.settings}
        />
        <PaidProperly settings={props.contributor.settings} />
        <ApplyNow
          handleShow={handleShow}
          settings={props.contributor.settings}
        />
        <div className="big-img-bg">
          <Testimonial />
          <FAQ faqs={props.contributor.faqs} />
        </div>
        <ApplyModals
          sources={props.contributor.sources}
          countries={props.contributor.countries}
          user_info={props.user_info}
          show={show}
          handleClose={handleClose}
          setClose={setShow}
        />
      </PublicLayout>
    </Fragment>
  );
};

export default AboutUs;
export const getServerSideProps = async ({ req, res }) => {
  const { user_token, user_info } = req.cookies;
  const auth_data = await getServerApiRequest(`auth-status`, null, user_token);
  if (auth_data.data.auth_status === 'out') {
    removeAuthCookie(res);
    return {
      redirect: { destination: "/", permanent: false },
    };
  }
  const setting_data = await getServerApiRequest("setting", null);
  const footer_data = await getServerApiRequest("footer-details", null);
  const why_data = await getServerApiRequest(`why-uss`, null);
  const testimonials_data = await getServerApiRequest(`testimonials`, null);
  const be_a_contributor = await getServerApiRequest(
    "be-a-contributor",
    null,
    user_token
  );
  const metaData = await getServerApiRequest("get-meta", {
    meta_type: 1,
    page: 3,
  });

  return {
    props: {
      settings: setting_data.data.data,
      footer_info: footer_data.data.data,
      user_info: user_info ? JSON.parse(user_info) : null,
      token: user_token || null,
      why_us: why_data.data.data,
      testmonial: testimonials_data.data.data,
      contributor: be_a_contributor.data.data,
      meta: metaData.data.data,
    },
  };
};
