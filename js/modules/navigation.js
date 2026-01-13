export class Navigation {
  constructor() {
    this.navbar = document.getElementById("navbar");
    this.hamburger = document.querySelector(".hamburger");
    this.navMenu = document.querySelector(".nav-menu");
    this.navLinks = document.querySelectorAll(".nav-link");
  }

  init() {
    if (!this.navbar) return;
    window.addEventListener("scroll", () => this.handleScroll());
    this.bindMenu();
    this.bindActiveLink();
  }

  handleScroll() {
    if (window.scrollY > 100) {
      this.navbar.classList.add("scrolled");
    } else {
      this.navbar.classList.remove("scrolled");
    }
  }

  bindMenu() {
    if (!this.hamburger || !this.navMenu) return;
    this.hamburger.addEventListener("click", () => {
      this.hamburger.classList.toggle("active");
      this.navMenu.classList.toggle("active");
    });
    this.navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        this.hamburger.classList.remove("active");
        this.navMenu.classList.remove("active");
      });
    });
  }

  bindActiveLink() {
    const sections = document.querySelectorAll("section");
    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach((section) => {
        if (scrollY >= section.offsetTop - 200) current = section.id;
      });
      this.navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`)
          link.classList.add("active");
      });
    });
  }
}
