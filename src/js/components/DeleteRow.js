export default class DeleteRow {
  constructor(table, button) {
    this.table = table;
    this.button = button;
  }
  deleteRow() {
    this.table.removeChild(this.table.lastChild);
    this.deleteLastUserInStorage();
  }

  deleteLastUserInStorage() {
    let data = JSON.parse(localStorage.getItem("result"));
    data.pop();
    localStorage.setItem(`result`, JSON.stringify(data));
  }

  toggleVisibility(data) {
    if (data > 0 && data <= 10) {
      this.button.classList.add("visible");
      this.button.classList.remove("hidden");
    } else {
      this.button.classList.add("hidden");
      this.button.classList.remove("visible");
    }
  }

  /*invisible() {
    let data = JSON.parse(localStorage.getItem("result"));
    if (data === null || data === undefined || data.length === 0) {
      this.button.classList.add("hidden");
      this.button.classList.remove("visible");
    }
  } */
}
