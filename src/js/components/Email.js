export default class Email {
  constructor(func) {
    this.func = func;
  }
  content(email) {
    console.log(this.func);
    const template = `<th onclick="location.href='mailto:${email}';" class="email">
          <img class="image" src="<%=require('./images/envelope-solid.svg')%>" </th>`;
    return template;
  }
}
