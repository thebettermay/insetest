async function getTheData() {
  let data = await JSON.parse(localStorage.getItem("result"));
  return data;
}

export default getTheData;
