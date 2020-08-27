export default class TableRow {
  constructor(gender, name, email, date, pic, phone, location, root, getDate) {
    this.gender = gender;
    this.name = name;
    this.email = email;
    this.date = date;
    this.pic = pic;
    this.phone = phone;
    this.location = location;
    this.root = root;
    this.getDate = getDate;
  }

  render(res) {
    const tag = document.createElement("tr");
    this.root.append(tag);
    const data = res;

    tag.insertAdjacentHTML(
      "beforeend",
      this.gender.choose(JSON.parse(data[data.length - 1]).gender)
    );
    tag.insertAdjacentHTML(
      "beforeend",
      this.name.content(JSON.parse(data[data.length - 1]).fullname)
    );
    tag.insertAdjacentHTML(
      "beforeend",
      this.email.content(JSON.parse(data[data.length - 1]).email)
    );
    tag.insertAdjacentHTML(
      "beforeend",
      this.date.content(this.getDate(JSON.parse(data[data.length - 1]).date))
    );
    tag.insertAdjacentHTML(
      "beforeend",
      this.pic.content(JSON.parse(data[data.length - 1]).pic)
    );
    tag.insertAdjacentHTML(
      "beforeend",
      this.phone.content(JSON.parse(data[data.length - 1]).phone)
    );
    tag.insertAdjacentHTML(
      "beforeend",
      this.location.content(JSON.parse(data[data.length - 1]).location)
    );
  }
}
