export default class Controller {
  constructor(
    storeTheData,
    renderTable,
    deleteRow,
    renderOnLoad,
    counter,
    table,
    counterContainer,
    allButtons,
    clearButton
  ) {
    this.storeTheData = storeTheData;
    this.renderTable = renderTable;
    this.deleteRow = deleteRow;
    this.renderOnLoad = renderOnLoad;
    this.counter = counter;
    this.table = table;
    this.counterContainer = counterContainer;
    this.allButtons = allButtons;
    this.clearButton = clearButton;
  }

  async storeAndGetTheData() {
    await this.storeTheData.storeTheData();
    let data = await JSON.parse(localStorage.getItem("result"));
    return data;
  }
  async getTheData() {
    let data = await JSON.parse(localStorage.getItem("result"));
    return data;
  }

  async getTheActivePageNumber() {
    let currentPage = await JSON.parse(localStorage.getItem("number"));
    if (currentPage <= 1) {
      return 1;
    } else {
      return parseInt(currentPage);
    }
  }

  async checkTableNodes() {
    let data = await this.table.childNodes.length;

    return data;
  }
  async checkCounterNodes() {
    let data = await this.counterContainer.childNodes.length;

    return data;
  }

  clearButtonVisibility() {
    this.getTheActivePageNumber().then((page) => {
      this.checkTableNodes().then((length) => {
        if (length < 2 && (page == 1 || page == 0)) {
          this.clearButton.classList.add("disabled");
        } else if (length < 2 && page == NaN) {
          this.clearButton.classList.add("disabled");
        } else {
          this.clearButton.classList.remove("disabled");
        }
      });
    });
  }

  deleteButtonVisibility() {
    this.checkTableNodes().then((data) => {
      this.deleteRow.toggleVisibility(data);
    });
  }

  firstPageListener() {
    this.getTheActivePageNumber().then((number) => {
      this.counterContainer.childNodes[number - 1].classList.add("active");
    });
  }

  activePageButton() {
    for (let i = 0; i < this.counterContainer.children.length; i++) {
      if (this.counterContainer.children[i].classList.contains("active")) {
        this.counterContainer.children[i].classList.remove("active");
        event.target.classList.add("active");
        localStorage.setItem("number", JSON.stringify(event.target.innerText));
      } else {
        event.target.classList.add("active");
        localStorage.setItem("number", JSON.stringify(event.target.innerText));
      }
    }
  }

  getPageCountOnRender() {
    this.getTheData().then((data) => {
      let count;
      data.length
        ? (count = Math.ceil(data.length / this.counter))
        : (count = 1);

      this.counterContainer.querySelectorAll("*").forEach((n) => n.remove());
      for (let i = 1; i <= count; i++) {
        const number = `<p class="number" id="${i}">${i}</p>`;
        this.counterContainer.insertAdjacentHTML("beforeend", number);
      }
      this.checkCounterNodes().then((length) => {
        if (length == 1) {
          this.counterContainer.children[0].classList.add("disabled");
        } else {
          this.counterContainer.children[0].classList.remove("disabled");
        }
      });
    });
  }

  renderWhileDelete() {
    this.deleteRow.deleteRow();
    if (this.table.children.length < 1) {
      this.getTheData().then((data) => {
        let currentPage = Math.ceil(data.length / this.counter);
        console.log(currentPage);
        let finalData = data.slice(
          [this.counter * (currentPage - 1)],
          [this.counter * (currentPage - 1) + this.counter]
        );
        localStorage.setItem("number", JSON.stringify(currentPage));
        this.renderOnLoad.render(finalData);
        this.deleteButtonVisibility();
        this.clearButtonVisibility();
        this.getPageCountOnRender();
        this.firstPageListener();
      });
    } else if (
      this.table.children.length >= 10 &&
      this.counterContainer.children.length !== currentPage - 1
    ) {
      let currentPage = Math.ceil(this.table.children.length - 1);
      console.log(currentPage);
    }
  }

  clearAllRender() {
    localStorage.clear();
    this.counterContainer.querySelectorAll("*").forEach((n) => n.remove());
    this.table.querySelectorAll("*").forEach((n) => n.remove());
    this.clearButtonVisibility();
    this.deleteButtonVisibility();
  }

  renderRow() {
    this.storeAndGetTheData().then((data) => {
      if (this.table.children.length < 10) {
        this.renderTable.render(data);
        this.deleteButtonVisibility();
        this.clearButtonVisibility();
      } else {
        this.getTheData().then((data) => {
          this.table.querySelectorAll("*").forEach((n) => n.remove());
          let currentPage = Math.ceil(data.length / this.counter);
          let finalData = data.slice(
            [this.counter * (currentPage - 1)],
            [this.counter * (currentPage - 1) + this.counter]
          );
          localStorage.setItem("number", JSON.stringify(currentPage));
          this.renderOnLoad.render(finalData);
          this.deleteButtonVisibility();
          this.clearButtonVisibility();
          this.counterContainer
            .querySelectorAll("*")
            .forEach((n) => n.remove());
          this.getPageCountOnRender();
          this.firstPageListener();
        });
      }
    });
  }

  renderOnClick() {
    this.getTheData().then((data) => {
      this.getTheActivePageNumber().then((number) => {
        this.table.querySelectorAll("*").forEach((n) => n.remove());
        let currentPage = number;
        if (currentPage == 1) {
          let finalData = data.slice([currentPage - 1], [this.counter]);
          this.renderOnLoad.render(finalData);
          this.activePageButton();
          this.deleteButtonVisibility();
          this.clearButtonVisibility();
        } else if (currentPage !== 1) {
          let finalData = data.slice(
            [this.counter * (currentPage - 1)],
            [this.counter * (currentPage - 1) + this.counter]
          );
          this.renderOnLoad.render(finalData);
          this.activePageButton();
          this.deleteButtonVisibility();
          this.clearButtonVisibility();
        }
      });
    });
  }

  renderOnWindowLoad() {
    this.getTheData().then((data) => {
      if (data === null || data === [] || data === undefined) {
        localStorage.setItem("number", JSON.stringify("1"));

        this.deleteButtonVisibility();
        this.clearButtonVisibility();
        return;
      }
      this.getTheActivePageNumber().then((number) => {
        let currentPage = number;
        if (currentPage == 1) {
          let finalData = data.slice([currentPage - 1], [this.counter]);
          this.renderOnLoad.render(finalData);
          this.getPageCountOnRender();
          this.activePageButton();
          this.firstPageListener();
          this.deleteButtonVisibility();
          this.clearButtonVisibility();
        } else if (currentPage !== 1) {
          let finalData = data.slice(
            [this.counter * (currentPage - 1)],
            [this.counter * (currentPage - 1) + this.counter]
          );
          this.renderOnLoad.render(finalData);
          this.getPageCountOnRender();
          this.activePageButton();
          this.firstPageListener();
          this.deleteButtonVisibility();
          this.clearButtonVisibility();
        }
      });
    });
  }
}
