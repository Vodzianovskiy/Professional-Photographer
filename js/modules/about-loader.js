import { DataManager } from "../data/data-manager.js";

export class AboutLoader {
  constructor(dataManager = new DataManager()) {
    this.dataManager = dataManager;
    this.defaults = this.dataManager.getData().about;
  }

  init() {
    this.apply(this.dataManager.getData().about);
    this.dataManager.subscribe(({ data }) => this.apply(data.about));
  }

  apply(aboutData) {
    const about = aboutData || this.defaults;
    const img = document.querySelector(".about-image img");
    if (img && about.photoUrl) img.src = about.photoUrl;

    const heading = document.querySelector(".about-text .section-title");
    if (heading && about.heading) heading.textContent = about.heading;

    const intro = document.querySelector(".about-intro");
    if (intro && about.intro) intro.textContent = about.intro;

    const aboutText = document.querySelector(".about-text");
    if (aboutText) {
      const paragraphs = Array.from(aboutText.querySelectorAll("p")).filter(
        (p) => !p.classList.contains("about-intro")
      );
      if (paragraphs[0] && about.desc1) paragraphs[0].textContent = about.desc1;
      if (paragraphs[1] && about.desc2) paragraphs[1].textContent = about.desc2;
    }

    const signatureEl = document.querySelector(".signature");
    if (signatureEl && about.signature) {
      signatureEl.innerHTML = `<span class="signature-text">${about.signature}</span>`;
    }

    const statItems = document.querySelectorAll(".about-stats .stat-item");
    if (statItems && about.stats) {
      about.stats.forEach((stat, idx) => {
        const item = statItems[idx];
        if (!item) return;
        const num = item.querySelector(".stat-number");
        const label = item.querySelector(".stat-label");
        if (num && stat.number) num.textContent = stat.number;
        if (label && stat.label) label.textContent = stat.label;
      });
    }
  }
}
