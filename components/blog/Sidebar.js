import moment from "moment";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import BlogSearch from "./BlogSearch";

const Sidebar = (props) => {
  const {t} = useTranslation()
  const { recentBlogs, blogCategories } = props?.blog_essential;

  return (
    <div className="col-lg-4 col-md-12">
      <aside className="blog-sidebar__area">
        <BlogSearch />
        <div className="blog-sidebar__item">
          <div className="item-title">
            <h2>{t("Recent Blogs")}</h2>
          </div>
          <ul className="post-list">
            {recentBlogs.map(({ uuid, image, title, created_at, slug }) => (
              <li key={uuid}>
                <div className="post-info">
                  <div className="post-img">
                    <img src={image} alt="img" />
                  </div>
                  <div className="post-text">
                    <h2>
                      <Link href="/blog/[details]" as={`/blog/${slug}`}>
                        {t(title)}
                      </Link>
                    </h2>
                    <p>{moment(created_at).format("DD MMM Y")}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="blog-sidebar__item">
          <div className="item-title">
            <h2>{t("Categories")}</h2>
          </div>
          <ul className="category-list">
            {blogCategories.map(({ uuid, name, active_blogs_count, slug }) => (
              <li key={uuid}>
                <Link
                  as={`/blog/category/${slug}`}
                  href="/blog/category/[slug]"
                >
                  <i className="fa fa-circle"></i>
                  <span>
                    {t(name)} ({active_blogs_count})
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
