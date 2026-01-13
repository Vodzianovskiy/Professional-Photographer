export class Loader {
  constructor() {
    this.el = document.querySelector(".loader-overlay");
  }
  show() {
    if (this.el) this.el.classList.remove("hidden");
  }
  hide() {
    if (this.el) this.el.classList.add("hidden");
  }
  showError(msg) {
    alert(msg);
  }
}
