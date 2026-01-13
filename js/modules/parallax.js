export class Parallax {
  constructor() {
    this.heroBg = document.querySelector(".hero-background");
  }
  init() {
    if (!this.heroBg) return;
    window.addEventListener("scroll", () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        this.heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    });
  }
}
