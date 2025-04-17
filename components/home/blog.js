import moment from "moment";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import removeHTML from "../../helpers/removeHTML";

const Blog = (props) => {
  const {t} = useTranslation()
  return (
    <section className="blog__area">
      <div className="container">
        <div className="section__title mb-50">
          <h3>{t(props.blog_data?.settings?.blog_title)}</h3>
          <h2>{t(props.blog_data?.settings?.blog_subtitle)}</h2>
        </div>
        <div className="row">
          {props.blog_data?.blogs?.map(
            ({ id, image, created_at, title, slug, details }) => (
              <div key={id} className="col-lg-4 col-md-6">
                <article className="blog__item">
                  <div className="post__thumb">
                    <img src={image} alt={title} />
                  </div>
                  <div className="post__content">
                    <h3>{moment(created_at).format("DD MMM Y")}</h3>
                    <h2 className="post__title">
                      <Link as={`/blog/${slug}`} href="/blog/[details]">
                        {title}
                      </Link>
                    </h2>
                    <p>{removeHTML(details).slice(0, 150)}</p>
                    <Link
                      as={`/blog/${slug}`}
                      href="/blog/[details]"
                      className="text-link"
                    >
                      {t("Read More")}
                      <span>
                        <i className="fa-solid fa-arrow-right"></i>
                      </span>
                    </Link>
                  </div>
                </article>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;
