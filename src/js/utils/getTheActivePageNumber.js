async function getTheActivePageNumber() {
  let currentPage = await JSON.parse(localStorage.getItem("number"));
  if (currentPage <= 1) {
    return 1;
  } else {
    return parseInt(currentPage);
  }
}

export default getTheActivePageNumber;
