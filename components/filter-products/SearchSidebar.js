import { useRouter } from "next/router";
import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { getSearchFilterAction } from "../../redux/actions/common";
import { objectToQueryString } from "../../utils/commonFunctions";
const accessibilitys = [
  {
    name: "All",
    id: 0,
  },
  {
    name: "Premium",
    id: 1,
  },
  {
    name: "Free",
    id: 2,
  },
];

const SearchSidebar = ({ categories }) => {
  const router = useRouter();
  const [accessibility, setAccessibility] = useState(
    router.query.accessibility ? router.query.accessibility : 0
  );
  const [shotby, setShotby] = useState(
    router.query.shotby ? router.query.shotby : ""
  );
  const [categoryIds, setCategoryIds] = useState({
    ids: router.query.categories ? JSON.parse(router.query.categories) : "",
  });
  const handleChnageAccessibility = (e) => {
    setAccessibility(e.target.value);
    const query_string = {
      search: router.query.search ? router.query.search : "",
      type: router.query.type ? router.query.type : "",
      accessibility: e.target.value,
      shotby: shotby,
      categories: router.query.categories ? router.query.categories : "",
    };
    router.push(`/filter?${objectToQueryString(query_string)}`);
  };

  const handleChange = (e) => {
    const { value, checked } = e.target;
    const { ids } = categoryIds;
    if (checked) {
      const iddss = [...ids, parseInt(value)];
      const string_array = JSON.stringify(iddss);

      setCategoryIds({
        ids: [...ids, parseInt(value)],
      });
      const query_string = {
        search: router.query.search ? router.query.search : "",
        type: router.query.type ? router.query.type : "",
        accessibility: router.query.accessibility
          ? router.query.accessibility
          : "",
        shotby: shotby,
        categories: string_array ? string_array : "",
      };
      router.push(`/filter?${objectToQueryString(query_string)}`);
    } else {
      const iddes = ids.filter((e) => e !== parseInt(value));
      const string_array = JSON.stringify(iddes);
      setCategoryIds({
        ids: ids.filter((e) => e !== parseInt(value)),
      });
      const query_string = {
        search: router.query.search ? router.query.search : "",
        type: router.query.type ? router.query.type : "",
        accessibility: router.query.accessibility
          ? router.query.accessibility
          : "",
        shotby: shotby,
        categories: string_array ? string_array : "",
      };
      router.push(`/filter?${objectToQueryString(query_string)}`);
    }
  };
  const handleChangeShotby = (e) => {
    setShotby(e.target.value);
    const query_string = {
      search: router.query.search ? router.query.search : "",
      type: router.query.type ? router.query.type : "",
      accessibility: accessibility,
      shotby: e.target.value,
      categories: router.query.categories ? router.query.categories : "",
    };
    router.push(`/filter?${objectToQueryString(query_string)}`);
  };
  const {t} = useTranslation()
  return (
    <div className="filter-sidebar">
      <Accordion alwaysOpen={true} defaultActiveKey={["0", "1", "2"]}>
        <Accordion.Item eventKey="0" className="filter-sidebar-accordion-item">
          <Accordion.Header className="filter-sidebar-title">
            {t("Category")}
          </Accordion.Header>
          <Accordion.Body>
            {categories?.map((obj) => (
              <div key={obj.id} className="sidebar-radio-item">
                <label className="radio-wrap">
                  {obj.name}
                  <input
                    type="checkbox"
                    name="category"
                    value={obj.id}
                    onChange={handleChange}
                    checked={categoryIds.ids.includes(obj.id)}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
            ))}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1" className="filter-sidebar-accordion-item">
          <Accordion.Header className="filter-sidebar-title">
            {t("License")}
          </Accordion.Header>
          <Accordion.Body>
            {accessibilitys.map((item) => (
              <div className="sidebar-radio-item">
                <label className="radio-wrap">
                  {item.name}
                  <input
                    onChange={handleChnageAccessibility}
                    type="radio"
                    name="accessibility"
                    checked={accessibility == item.id}
                    value={item.id}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
            ))}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2" className="filter-sidebar-accordion-item">
          <Accordion.Header className="filter-sidebar-title">
            {t("Sort by")}
          </Accordion.Header>
          <Accordion.Body>
            <div className="sidebar-radio-item">
              <label className="radio-wrap">
                {t("New")}
                <input
                  onChange={handleChangeShotby}
                  type="radio"
                  name="sort-by"
                  checked={shotby == 1}
                  value={1}
                />
                <span className="checkmark"></span>
              </label>
            </div>
            <div className="sidebar-radio-item">
              <label className="radio-wrap">
                {t("Old")}
                <input
                  onChange={handleChangeShotby}
                  type="radio"
                  name="sort-by"
                  value={2}
                  checked={shotby == 2}
                />
                <span className="checkmark"></span>
              </label>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default connect(null, { getSearchFilterAction })(SearchSidebar);
