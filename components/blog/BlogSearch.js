import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { getSearchBlogAction } from "../../redux/actions/common";
const BlogSearch = (props) => {
  const {t} = useTranslation()
  const [wordInter, setWordInter] = useState("");

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setWordInter(searchWord);
    props.getSearchBlogAction(`title=${e.target.value}`);
  };
  const removeData = () => {
    setWordInter("");
  };
  return (
    <div className="blog-sidebar__item">
      <form className="blog-search position-relative">
        <div className="input__group">
          <input
            onChange={handleFilter}
            type="text"
            placeholder={t("Search...")}
            value={wordInter}
          />
          <div className="input-overlay">
            <Icon icon="charm:search" width="23" height="23" />
          </div>
        </div>
        {wordInter && (
          <div className="blog-search-box custom-scrollbar">
            <ul className="appendBlogSearchList">
              {props.search?.length > 0 ? (
                props.search?.map(({ id, title, image, slug }) => (
                  <li
                    onClick={removeData}
                    key={id}
                    className="search-bar-result-item"
                  >
                    <Link as={`/blog/${slug}`} href="/blog/[details]">
                      <img src={image} alt={title} />
                      <span>{t(title)}</span>
                    </Link>
                  </li>
                ))
              ) : (
                <li className="search-bar-result-item no-search-result-found">
                  {t("No Data Found")}
                </li>
              )}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};
const mapStateToProps = (state) => ({
  search: state.common.get_search_blog,
});

export default connect(mapStateToProps, { getSearchBlogAction })(BlogSearch);
