import { Icon } from "@iconify/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { handleFevourteAction } from "../redux/actions/common";

const SingleAudio = (props) => {
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
    <div className="audioContainer">
      <div className="audioImgContainer">
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
          <img
            className="audio-img"
            src={props.item.thumbnail_image}
            alt="thumbnail"
          />
        </Link>
        <div className="product-btns">
          <button
            onClick={() => handleFavourite(props.item.id)}
            className={`favorite ${
              props.item.favourite_by_auth_customer ||
              favourite == props.item.id
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
      <audio controls controlsList="nodownload noplaybackrate noremoteplayback">
        <source src={props.item.main_file} type="audio/mpeg" />
      </audio>
    </div>
  );
};
export default connect(null, {
  handleFevourteAction,
})(SingleAudio);
