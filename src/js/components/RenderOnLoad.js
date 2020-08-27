export default class RenderOnLoad {
  constructor(
    gender,
    name,
    email,
    date,
    pic,
    phone,
    location,
    root,
    getDate,
    counter
  ) {
    this.gender = gender;
    this.name = name;
    this.email = email;
    this.date = date;
    this.pic = pic;
    this.phone = phone;
    this.location = location;
    this.root = root;
    this.getDate = getDate;
    this.counter = counter;
  }
  render(data) {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      const tag = document.createElement("tr");
      this.root.append(tag);
      tag.insertAdjacentHTML(
        "beforeend",
        this.gender.choose(JSON.parse(data[i]).gender)
      );
      tag.insertAdjacentHTML(
        "beforeend",
        this.name.content(JSON.parse(data[i]).fullname)
      );
      tag.insertAdjacentHTML(
        "beforeend",
        this.email.content(JSON.parse(data[i]).email)
      );

      tag.insertAdjacentHTML(
        "beforeend",
        this.date.content(this.getDate(JSON.parse(data[i]).date))
      );
      tag.insertAdjacentHTML(
        "beforeend",
        this.pic.content(JSON.parse(data[i]).pic)
      );
      i;
      tag.insertAdjacentHTML(
        "beforeend",
        this.phone.content(JSON.parse(data[i]).phone)
      );
      tag.insertAdjacentHTML(
        "beforeend",
        this.location.content(JSON.parse(data[i]).location)
      );
    }
  }
}
