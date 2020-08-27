export default class Gender {
  choose(gender) {
    if (gender === "male") {
      const template = `<th class="gender">
      <img class="image"
      src="<%=require('./src/images/male-solid.svg').default%>" </th>`;
      return template;
    } else {
      const template = `<th class="gender">
      <img class="image" "<%=require('./src/images/female-solid.svg').default%>"
      </th>`;
      return template;
    }
  }
}
