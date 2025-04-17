const Preloader = ({ loader }) => {
  return (
    <div id="preloader-area">
      <div className="loader-content">
        <div className="loader-img">
          <img
            src={loader ? loader : "/images/preloader.svg"}
            alt="preloader"
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
