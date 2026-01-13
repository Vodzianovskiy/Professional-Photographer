import { isValidEmail } from "../core/utils.js";

export class FormHandler {
  constructor() {
    this.form = document.getElementById("contactForm");
  }

  init() {
    if (!this.form) return;
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = this.form.querySelector("#name").value.trim();
      const email = this.form.querySelector("#email").value.trim();
      const message = this.form.querySelector("#message").value.trim();
      if (!isValidEmail(email)) {
        alert("Please enter a valid email.");
        return;
      }
      alert(`Thank you, ${name}! Your message has been received. (Demo Mode)`);
      this.form.reset();
    });
  }
}
