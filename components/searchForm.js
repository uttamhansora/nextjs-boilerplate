import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const SearchForm = (props) => {
  const router = useRouter();
  const [input, setInput] = useState(
    router.query.search ? router.query.search : ""
  );
  const [defaultType, setDefaultType] = useState(
    router.query.type ? router.query.type : props.productTypes[0]?.slug
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      router.push(`/filter?search=${input}&type=${defaultType}`);
    }
  };
  useEffect(() => {
    if (router.query.type) {
      setDefaultType(router.query.type);
    } else {
      setDefaultType(props.productTypes[0]?.slug);
    }
  }, [props.productTypes]);
  const handleTypeChnage = (e) => {
    setDefaultType(e.target.value);
    router.push(`/filter?search=${input}&type=${e.target.value}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="hero__input">
        <div className="item-input">
          <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder="Search our curated collection"
          />
          <button type="submit" className="input-overlay">
            <Icon icon="charm:search" width="23" height="23" />
          </button>
        </div>
        <div className="item-select-category">
          <select onChange={handleTypeChnage} value={defaultType}>
            {props.productTypes?.map(({ uuid, name, slug }) => (
              <option key={uuid} value={slug}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
