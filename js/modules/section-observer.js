export class SectionObserver {
  constructor() {
    this.elements = document.querySelectorAll("[data-animate]");
  }
  init() {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    this.elements.forEach((el) => observer.observe(el));
  }
}
