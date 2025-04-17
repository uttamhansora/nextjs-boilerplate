import dynamic from "next/dynamic";
import React from "react";
const SocialLogin = dynamic(() => import("react-social-login"), {
  ssr: false,
});
const SocialButtons = (props) => {
  return (
    <button onClick={props.triggerLogin} {...props}>
      {props.children}
    </button>
  );
};

export default SocialLogin(SocialButtons);
