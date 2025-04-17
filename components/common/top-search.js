import SearchForm from "../searchForm";
const TopSearch = (props) => {
  return (
    <div className="breadcrumb__area v2">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="breadcrumb__content">
              <SearchForm productTypes={props.productTypes} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSearch;
