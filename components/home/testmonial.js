import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const Testimonial = (props) => {
  return (
    <section className="testimonial__area pt-114">
      <div className="container">
        <div className="section__title mb-35">
          <h3>{props.testmonial?.settings?.testimonial_title}</h3>
          <h2>{props.testmonial?.settings?.testimonial_subtitle}</h2>
        </div>
        <Swiper
          slidesPerView={3}
          spaceBetween={24}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1000: {
              slidesPerView: 3,
            },
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="client-testimonial"
        >
          {props.testmonial?.testimonials?.map(
            ({ id, name, designation, quote, image }) => (
              <SwiperSlide key={id}>
                <div className="slider__item">
                  <div className="slider__img">
                    <img src={image} alt="user-img" />
                  </div>
                  <div className="slider__text">
                    <p>{quote}</p>
                    <img src="/images/icons/quote.svg" alt="icon" />
                    <h2>{name}</h2>
                    <h3>{designation}</h3>
                  </div>
                </div>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonial;
