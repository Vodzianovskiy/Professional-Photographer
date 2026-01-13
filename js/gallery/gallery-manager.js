import { GalleryLightbox } from "./gallery-lightbox.js";
import { GalleryFilters } from "./gallery-filters.js";
import { GalleryEffectsSwitcher } from "./gallery-effects-switcher.js";

export class GalleryManager {
  constructor(dataManager) {
    this.dataManager = dataManager;
    this.galleryGrid = document.getElementById("galleryGrid");
    this.filterButtons = document.querySelectorAll(".filter-btn");
    this.lightbox = new GalleryLightbox();
    this.filters = new GalleryFilters(this);
    this.effectsSwitcher = new GalleryEffectsSwitcher(this);
    this.currentFilter = "all";
    this.items = [];
    this.unsubscribe = null;
  }

  init() {
    this.items = this.dataManager.getGallery();
    this.filters.init();
    this.render();
    this.lightbox.init();
    this.unsubscribe = this.dataManager.subscribe(({ data }) => {
      this.items = data.photos || [];
      this.render(this.currentFilter);
    });
  }

  render(filter = this.currentFilter) {
    if (!this.galleryGrid) return;
    this.galleryGrid.innerHTML = "";
    const data =
      filter === "all"
        ? this.items
        : this.items.filter((item) => item.category === filter);
    data.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "gallery-item";
      div.dataset.category = item.category;
      div.dataset.index = index;
      div.innerHTML = `
        <img src="${item.src}" alt="${item.title}" loading="lazy">
        <div class="gallery-overlay">
          <h3 class="gallery-title">${item.title}</h3>
          <p class="gallery-category">${item.category}</p>
        </div>`;
      div.addEventListener("click", () => this.lightbox.open(item, data));
      this.galleryGrid.appendChild(div);
    });
    // Re-apply effects
    this.effectsSwitcher.applyCurrentEffect();
  }
}
