async function storeAndGetTheData() {
  await this.storeTheData.storeTheData();
  let data = await JSON.parse(localStorage.getItem("result"));
  return data;
}

export default storeAndGetTheData;
