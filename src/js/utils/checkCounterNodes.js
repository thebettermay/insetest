async function checkCounterNodes() {
  let data = await this.counterContainer.childNodes.length;

  return data;
}

export default checkCounterNodes;
