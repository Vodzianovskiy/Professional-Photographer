import { DataManager } from "../data/data-manager.js";

export class PricingLoader {
  constructor(dataManager = new DataManager()) {
    this.dataManager = dataManager;
    this.defaults = this.dataManager.getData().pricing;
  }

  init() {
    this.apply(this.dataManager.getData().pricing);
    this.dataManager.subscribe(({ data }) => this.apply(data.pricing));
  }

  apply(pricingData) {
    const dataSource =
      pricingData && pricingData.length ? pricingData : this.defaults;
    const cards = document.querySelectorAll(".pricing-card");
    if (!cards.length) return;

    cards.forEach((card, idx) => {
      const data = dataSource[idx] || this.defaults[idx] || dataSource[0];
      if (!data) return;
      const titleEl = card.querySelector(".pricing-title");
      const amountEl = card.querySelector(".pricing-price .amount");
      const badgeEl = card.querySelector(".pricing-badge");
      const descEl = card.querySelector(".custom-description");
      const featureList = card.querySelector(".pricing-features");

      if (titleEl && data.title) titleEl.textContent = data.title;
      if (amountEl && data.price) amountEl.textContent = data.price;
      if (badgeEl && data.badge) badgeEl.textContent = data.badge;
      if (descEl && typeof data.description === "string")
        descEl.textContent = data.description;

      if (featureList && Array.isArray(data.features)) {
        featureList.innerHTML = "";
        data.features.forEach((f) => {
          const li = document.createElement("li");
          li.innerHTML = `<span class="check">✓</span> ${f}`;
          featureList.appendChild(li);
        });
      }
    });
  }
}
