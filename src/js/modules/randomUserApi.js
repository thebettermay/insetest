export default class RandomUserApi {
  constructor(url, allButtons) {
    this.url = url;
    this.allButtons = allButtons;
  }
  getData() {
    return fetch("https://" + `${this.url}`)
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      )

      .then((res) => res)
      .catch(() => {
        throw new Error("ERROR");
      });
  }
}
