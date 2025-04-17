import parse from "html-react-parser";
import moment from "moment";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";

const BlogDetails = (props) => {
  const {t} = useTranslation()
  const { asPath } = useRouter();
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const URL = `${origin}${asPath}`;
  return (
    <article className="blog-single__item mb-64">
      <div className="post-img">
        <img src={props.blog_data?.image} alt="img" />
      </div>
      <div className="post-content mb-50">
        <div className="item-content mb-50">
          <h2>
            <a>{props.blog_data?.title}</a>
          </h2>
          <ul className="post-meta">
            <li>
              {t("By")}: {props.blog_data?.user?.name}
            </li>
            <li>{moment(props.blog_data?.created_at).format("DD MMM Y")}</li>
          </ul>
          {parse(`${props.blog_data?.details}`)}
        </div>
      </div>
      <ul className="post-share mb-50">
        <li>
          <h3>{t("Shares")}:</h3>
        </li>
        <li>
          <FacebookShareButton
            url={URL}
            title={props.blog_data?.title}
            children={
              <a>
                <i className="fa-brands fa-facebook-f"></i>
              </a>
            }
          />
        </li>
        <li>
          <TwitterShareButton
            url={URL}
            title={props.blog_data?.title}
            children={
              <a>
                <i className="fa-brands fa-twitter"></i>
              </a>
            }
          />
        </li>
        <li>
          <LinkedinShareButton
            url={URL}
            title={props.blog_data?.title}
            children={
              <a>
                <i className="fa-brands fa-linkedin"></i>
              </a>
            }
          />
        </li>
      </ul>
    </article>
  );
};

export default BlogDetails;
