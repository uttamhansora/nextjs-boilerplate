import { Icon } from "@iconify/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { handleFevourteAction } from "../redux/actions/common";

const SingleVideo = (props) => {
  const {t} = useTranslation()
  const cookie = new Cookies();
  const [favourite, setFavourite] = useState(null);
  const [token, setToken] = useState(null);
  useEffect(() => {
    setToken(cookie.get("user_token"));
  }, []);
  const handleFavourite = (id) => {
    if (token) {
      props.handleFevourteAction({ product_id: id }, setFavourite);
    } else {
      toast.info("Please Login First");
    }
  };
  return (
    <div className="videoContainer">
      {props.item.accessibility === 1 && (
        <div className="premium-icon">
          <img src="/images/icons/noun-premium.svg" alt="icon" />
        </div>
      )}
      <Link
        className="product-link"
        href={`/[product_details]`}
        as={`/${props.item.slug}`}
      >
        <video
          onMouseOver={(e) => e.target.play()}
          onMouseOut={(e) => e.target.pause()}
          className="video"
          width="100%"
          height="100%"
          poster={props.item.thumbnail_image}
        >
          <source src={props.item.play_link} type="video/mp4" />
        </video>
      </Link>
      <div className="product-btns">
        <button
          onClick={() => handleFavourite(props.item.id)}
          className={`favorite ${
            props.item.favourite_by_auth_customer || favourite == props.item.id
              ? "fill"
              : ""
          }`}
        >
          <Icon
            icon="ant-design:heart-filled"
            className="filled"
            color="red"
            width="20"
            height="20"
          />
          <Icon
            icon="ant-design:heart-outlined"
            className="outlined"
            width="20"
            height="20"
          />
        </button>
        <button onClick={props.handleOpenSave} className="btn-save">
          + {t("Save")}
        </button>
      </div>
    </div>
  );
};
export default connect(null, {
  handleFevourteAction,
})(SingleVideo);
