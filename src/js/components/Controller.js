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
    clearButton,
    deleteButton,
    addButton,
    preloader,
    checkTableNodes,
    storeAndGetTheData,
    getTheData,
    getTheActivePageNumber,
    checkCounterNodes
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
    this.deleteButton = deleteButton;
    this.addButton = addButton;
    this.preloader = preloader;
    this.checkTableNodes = checkTableNodes;
    this.storeAndGetTheData = storeAndGetTheData;
    this.getTheData = getTheData;
    this.getTheActivePageNumber = getTheActivePageNumber;
    this.checkCounterNodes = checkCounterNodes;
  }

  renderPreloader() {
    this.checkTableNodes().then((length) => {
      if (length == 0 || !length) {
        this.preloader.classList.remove("disabled");
      } else {
        this.preloader.classList.add("disabled");
      }
    });
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
        localStorage.setItem("number", JSON.stringify(event.target.id));
      } else {
        event.target.classList.add("active");
        localStorage.setItem("number", JSON.stringify(event.target.id));
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
        const number = `<p class="dot" id="${i}"></p>`;
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

  deleteButtonDeactivation() {
    this.checkTableNodes().then((number) => {
      this.checkCounterNodes().then((counter) => {
        this.getTheActivePageNumber().then((page) => {
          if (number == 10 && parseInt(page) < counter) {
            console.log(counter);
            this.deleteButton.classList.add("disabled");
          } else {
            this.deleteButton.classList.remove("disabled");
          }
        });
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
        this.deleteButtonDeactivation();
        this.renderPreloader();
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
    this.renderPreloader();
  }

  renderRow() {
    this.addButton.setAttribute("disabled", true);
    this.storeAndGetTheData().then((data) => {
      if (this.table.children.length < 10) {
        this.renderTable.render(data);
        this.renderPreloader();
        this.deleteButtonVisibility();
        this.clearButtonVisibility();

        setTimeout(this.addButton.removeAttribute("disabled"), 3000);
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
          setTimeout(this.addButton.removeAttribute("disabled"), 3000);
          this.deleteButtonVisibility();
          this.clearButtonVisibility();
          this.counterContainer
            .querySelectorAll("*")
            .forEach((n) => n.remove());
          this.getPageCountOnRender();
          this.firstPageListener();
          this.renderPreloader();
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
          this.deleteButtonDeactivation();
          this.renderPreloader();
        } else if (currentPage !== 1) {
          let finalData = data.slice(
            [this.counter * (currentPage - 1)],
            [this.counter * (currentPage - 1) + this.counter]
          );
          console.log(finalData);

          this.renderOnLoad.render(finalData);
          this.activePageButton();
          this.deleteButtonVisibility();
          this.clearButtonVisibility();
          this.deleteButtonDeactivation();
          this.renderPreloader();
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
        this.renderPreloader();
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
          this.renderPreloader();
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
          this.renderPreloader();
        }
      });
    });
  }
  eventListeners() {
    this.addButton.addEventListener("click", () => {
      event.preventDefault();
      this.renderRow();
    });
    this.counterContainer.addEventListener("click", () => {
      this.activePageButton(this.table);
      this.renderOnClick();
    });
    window.addEventListener("load", () => {
      this.renderOnWindowLoad();
    });
    this.deleteButton.addEventListener("click", () => {
      event.preventDefault();
      this.renderWhileDelete();
    });
    this.clearButton.addEventListener("click", () => {
      event.preventDefault();
      this.clearAllRender();
    });
  }
}
