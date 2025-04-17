import React, { Fragment, useState } from "react";
import CreateBoard from "../components/common/createBoard";
import Blog from "../components/home/blog";
import Counter from "../components/home/counter";
import MostFavourite from "../components/home/favourite";
import FeaturedGallery from "../components/home/featured";
import Hero from "../components/home/hero";
import MainGallery from "../components/home/mainGallery";
import MostDownload from "../components/home/mostDownload";
import Testimonial from "../components/home/testmonial";
import WhyZaistock from "../components/home/whyZaistock";
import MetaHead from "../components/MetaHead";
import PublicLayout from "../components/public-layout";
import { getServerApiRequest } from "../utils/serverApi";
const Home = (props) => {
  const [saveModal, setSaveModal] = useState(false);
  const [productId, setProductId] = useState(null);
  const handleOpenSave = () => {
    setSaveModal(true);
  };

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
          <Hero
              title={props.home_data.settings.banner_title}
              productTypes={props.home_data.productTypes}
          />
          
          { props.home_data.settings.main_gallery === '1' &&
              <MainGallery
                  productTypes={props.home_data.productTypes}
                  saveOpen={handleOpenSave}
                  setProductId={setProductId}
              />
          }
          { props.home_data.settings.featured_gallery === '1' &&
              <FeaturedGallery
                  productTypes={props.home_data.productTypes}
                  saveOpen={handleOpenSave}
                  setProductId={setProductId}
                  homeData={props.home_data.settings}
              />
          }
          {props.home_data.settings.most_download_gallery === '1' &&
              <MostDownload
                  productTypes={props.home_data.productTypes}
                  saveOpen={handleOpenSave}
                  setProductId={setProductId}
                  homeData={props.home_data.settings}
              />
          }
          {props.home_data.settings.most_favorite_gallery === '1' &&
              <MostFavourite
                  productTypes={props.home_data.productTypes}
                  saveOpen={handleOpenSave}
                  setProductId={setProductId}
                  homeData={props.home_data.settings}
              />
          }
          {props.home_data.settings.application_information_section === '1' &&
              <Counter count_data={props.home_data.counterArray} />
          }
          {props.home_data.settings.why_us_section === '1' &&
              <WhyZaistock why_uss_data={props.why_us} />
          }
          <div className="big-img-bg">
            {props.home_data.settings.testimonial_section === '1' &&
                <Testimonial testmonial={props.testmonial} />
            }
            {props.home_data.settings.blog_section === '1' &&
                <Blog blog_data={props.blogs} />
            }
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
export default Home;
export const getServerSideProps = async ({ req }) => {
  const { user_token, user_info } = req.cookies;
  const get_home_data = await getServerApiRequest(`home`, null);
  const setting_data = await getServerApiRequest("setting", null);
  const footer_data = await getServerApiRequest("footer-details", null);
  const why_data = await getServerApiRequest("why-uss", null);
  const blog_data = await getServerApiRequest("latest-blogs", null);
  const testimonials_data = await getServerApiRequest("testimonials", null);
  const metaData = await getServerApiRequest("get-meta", {
    meta_type: 1,
    page: 1,
  });


  return {
    props: {
      settings: setting_data.data.data,
      footer_info: footer_data.data.data,
      user_info: user_info ? JSON.parse(user_info) : null,
      token: user_token || null,
      home_data: get_home_data.data.data,
      blogs: blog_data.data.data,
      why_us: why_data.data.data,
      testmonial: testimonials_data.data.data,
      meta: metaData.data.data,
    },
  };
};
