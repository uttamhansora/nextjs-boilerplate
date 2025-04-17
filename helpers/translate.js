const translate = (keyword) => {
  const language = JSON.parse(localStorage.getItem("language"));
  if (language) {
    if (language[keyword]) {
      return language[keyword];
    } else {
      return keyword;
    }
  } else {
    return keyword;
  }
};

export default translate;
