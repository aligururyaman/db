const toSlug = (str) => {
  return str
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^\w-]+/g, "");
};

export default toSlug;
