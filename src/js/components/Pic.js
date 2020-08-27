export default class Pic {
  content(pic) {
    const template = `<th class="pic">
        <img class="pic-image"
        src="${pic}"> </th>`;
    return template;
  }
}
