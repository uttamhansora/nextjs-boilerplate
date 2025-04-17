import React, { Fragment } from "react";
import Footer from "./footer";
import Header from "./header";
const PublicLayout = (props) => {
  return (
    <Fragment>
      <Header
        settings={props.settings}
        user_info={props.user_info}
        token={props.token}
      />
      <main>{props.children}</main>
      <Footer footer_info={props.footer_info} />
    </Fragment>
  );
};

export default PublicLayout;
