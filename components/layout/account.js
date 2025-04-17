import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getProductTypesAction } from "../../redux/actions/common";
import AccountSidebar from "../common/sidebar";
import TopSearch from "../common/top-search";
const AccountLayout = (props) => {
  useEffect(() => {
    props.getProductTypesAction();
  }, []);
  return (
    <Fragment>
      <TopSearch productTypes={props.product_types} />
      <section className="dashboard__area">
        <div className="container">
          <div className="row">
            <AccountSidebar user_info={props.user_info} />
            <div className="col-lg-9 order-first order-lg-last">
              {props.children}
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  product_types: state.common.product_types,
});
export default connect(mapStateToProps, { getProductTypesAction })(
  AccountLayout
);
