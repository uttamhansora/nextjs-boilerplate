const productTypeCheck = (id) => {
  switch (id) {
    case 2:
      return "Illustration";
    case 3:
      return "Video";
    case 4:
      return "Icon";
    case 5:
      return "Sound";
    default:
      return "Image";
  }
};
export default productTypeCheck;
