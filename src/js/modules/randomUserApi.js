export default class RandomUserApi {
  constructor(url) {
    this.url = url;
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
