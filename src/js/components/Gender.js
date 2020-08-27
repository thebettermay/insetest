export default class Gender {
  choose(gender) {
    if (gender === "male") {
      const template = `<th class="gender">
      <img class="image"
      src='./src/images/male-solid.svg' </th>`;
      return template;
    } else {
      const template = `<th class="gender">
      <img class="image" src='./src/images/female-solid.svg'"
      </th>`;
      return template;
    }
  }
}
