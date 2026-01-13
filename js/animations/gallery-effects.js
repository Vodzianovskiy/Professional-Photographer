import { CONFIG } from "../core/config.js";
import { EFFECTS } from "../core/constants.js";

export class GalleryEffects {
  constructor() {
    this.galleryItems = [];
    this.observers = new Map();
    this.currentEffect = "effect-1";
  }

  init() {
    this.loadEffectFromSettings();
    this.observeGalleryItems();
  }

  loadEffectFromSettings() {
    const data = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY) || "{}");
    this.currentEffect = data.settings?.galleryEffect || "effect-1";
  }

  observeGalleryItems() {
    // reset existing observers
    this.observers.forEach((obs) => obs.disconnect());
    this.observers.clear();

    this.galleryItems = Array.from(document.querySelectorAll(".gallery-item"));

    this.galleryItems.forEach((item, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.animateItem(entry.target, index);
            } else {
              entry.target.classList.remove("animated");
            }
          });
        },
        { threshold: 0.2, rootMargin: "-50px" }
      );

      observer.observe(item);
      this.observers.set(item, observer);
    });
  }

  resetItem(item) {
    item.classList.remove("animated");
    EFFECTS.forEach((eff) => item.classList.remove(eff));
  }

  animateItem(item, index = 0) {
    this.resetItem(item);
    // force reflow to restart animation
    void item.offsetWidth;
    setTimeout(() => {
      item.classList.add("animated", this.currentEffect);
    }, index * 50);
  }

  changeEffect(newEffect) {
    this.updateEffect(newEffect);
    this.saveEffect(newEffect);
  }

  saveEffect(effectName) {
    const data = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY) || "{}");
    data.settings = data.settings || {};
    data.settings.galleryEffect = effectName;
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(data));
  }

  updateEffect(effectName) {
    if (!effectName) return;
    this.currentEffect = effectName;
    this.galleryItems.forEach((item) => {
      this.resetItem(item);
      if (this.isInView(item)) {
        this.animateItem(item, 0);
      }
    });
  }

  isInView(item) {
    const rect = item.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }
}
