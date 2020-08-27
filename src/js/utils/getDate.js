function getDate(day) {
  let date = new Date(day);
  let year = date.getFullYear();
  let month = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ][date.getMonth()];
  let dayOfMonth = date.getDate();
  let formatedDate = dayOfMonth + " " + month + ", " + year;
  return formatedDate;
}
export default getDate;
