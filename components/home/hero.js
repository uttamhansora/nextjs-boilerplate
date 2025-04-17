import SearchForm from "../searchForm";

const Hero = ({ productTypes, title }) => {
  return (
    <section className="hero__area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-12">
            <div className="hero__content">
              <div className="hero__title">
                <h2>{title}</h2>
              </div>
              <SearchForm productTypes={productTypes} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
