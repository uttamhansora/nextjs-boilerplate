import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import { removeHTML, t } from "../../utils/commonFunctions";

const AllBlog = ({ blogs, page }) => {
  const {t} = useTranslation()
  const { data, total, per_page } = blogs;
  const [selected, setSelected] = useState(0);
  const handleChange = (value) => {
    router.push(`${page}?page=${value.selected + 1}`);
    setSelected(value.selected);
  };
  return (
    <>
      {data.map(({ uuid, title, image, created_at, details, slug, user }) => (
        <article key={uuid} className="blog-single__item mb-90">
          <div className="post-img">
            <img src={image} alt="img" />
          </div>
          <div className="post-content">
            <h2>
              <Link href="/blog/[details]" as={`/blog/${slug}`}>
                {t(title)}
              </Link>
            </h2>
            <ul className="post-meta">
              <li>
                {t("By")}: {user?.name}
              </li>
              <li>{moment(created_at).format("DD MMM Y")}</li>
            </ul>
            <p>{removeHTML(details).slice(0, 180)}</p>
          </div>
          <div className="item-button">
            <Link
              href="/blog/[details]"
              as={`/blog/${slug}`}
              className="text-link"
            >
              {t("Read More")}
              <span>
                <i className="fa-solid fa-arrow-right"></i>
              </span>
            </Link>
          </div>
        </article>
      ))}
      {total > per_page && (
        <nav className="filter-pagination mt-35">
          <ReactPaginate
            containerClassName="paginationWrapper"
            pageCount={total / per_page}
            pageRangeDisplayed={per_page}
            onPageChange={handleChange}
            nextLabel={<i className="fa fa-angle-right"></i>}
            previousLabel={<i className="fa fa-angle-left"></i>}
            forcePage={selected}
          />
        </nav>
      )}
    </>
  );
};

export default AllBlog;
