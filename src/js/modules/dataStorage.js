export default class DataStorage {
  constructor(api, allButtons) {
    this.api = api;
    this.allButtons = allButtons;
  }
  storeTheData() {
    return this.api
      .getData()
      .then((res) => {
        this.allButtons.disabled = true;
        let allButtons = [];
        allButtons.push(this.allButtons);
        allButtons[0].forEach((el) => el.classList.add("disabled"));
        let storage = JSON.parse(localStorage.getItem("result")) || [];
        storage.push(
          JSON.stringify({
            gender: res.results[0].gender,
            fullname:
              res.results[0].name.first + " " + res.results[0].name.last,
            email: res.results[0].email,
            date: res.results[0].dob.date,
            pic: res.results[0].picture.medium,
            phone: res.results[0].phone,
            location:
              res.results[0].location.country +
              " " +
              res.results[0].location.city +
              " " +
              res.results[0].location.street.name +
              " " +
              res.results[0].location.street.number,
          })
        );
        localStorage.setItem(`result`, JSON.stringify(storage));
        this.allButtons.disabled = false;
        allButtons[0].forEach((el) => el.classList.remove("disabled"));
      })
      .catch(() => {
        throw new Error("ERROR");
      });
  }
}
