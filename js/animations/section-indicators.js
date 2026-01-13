export class SectionIndicators {
  constructor() {
    this.sections = document.querySelectorAll("section");
  }

  init() {
    if (!this.sections.length) return;
    this.createIndicators();
  }

  createIndicators() {
    const nav = document.createElement("nav");
    nav.className = "section-indicators";
    this.sections.forEach((section, index) => {
      const dot = document.createElement("button");
      dot.className = "indicator-dot";
      dot.setAttribute("aria-label", `Go to section ${index + 1}`);
      dot.addEventListener("click", () =>
        section.scrollIntoView({ behavior: "smooth" })
      );
      nav.appendChild(dot);
    });
    document.body.appendChild(nav);
  }
}
