async function checkTableNodes() {
  let data = await this.table.childNodes.length;

  return data;
}

export default checkTableNodes;
