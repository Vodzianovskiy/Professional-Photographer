export class Modal {
  constructor(selector) {
    this.modal = document.querySelector(selector);
  }
  open() {
    this.modal?.classList.add("active");
  }
  close() {
    this.modal?.classList.remove("active");
  }
}
