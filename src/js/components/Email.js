export default class Email {
  content(email) {
    const template = `<th onclick="location.href='mailto:${email}';" class="email">
          <img class="image" src="./images/envelope-solid.svg" </th>`;
    return template;
  }
}
