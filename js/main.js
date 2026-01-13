import { CONFIG } from "./core/config.js";
import { debounce } from "./core/utils.js";
import { Storage } from "./data/storage.js";
import { DataManager } from "./data/data-manager.js";
import { Navigation } from "./modules/navigation.js";
import { ScrollManager } from "./modules/scroll-manager.js";
import { Parallax } from "./modules/parallax.js";
import { SmoothScroll } from "./modules/smooth-scroll.js";
import { AnimationController } from "./animations/animation-controller.js";
import { GalleryManager } from "./gallery/gallery-manager.js";
import { GalleryLoader } from "./gallery/gallery-loader.js";
import { FormHandler } from "./components/form-handler.js";
import { ContactLinks } from "./components/contact-links.js";
import { Loader } from "./components/loader.js";
import { AboutLoader } from "./modules/about-loader.js";
import { ContactLoader } from "./modules/contact-loader.js";
import { PricingLoader } from "./modules/pricing-loader.js";
import { ContentSync } from "./modules/content-sync.js";

class App {
  constructor() {
    this.modules = {};
    this.config = CONFIG;
  }

  async init() {
    const loader = new Loader();
    loader.show();

    const storage = new Storage();
    const dataManager = new DataManager(storage);

    this.modules.navigation = new Navigation();
    this.modules.scrollManager = new ScrollManager();
    this.modules.parallax = new Parallax();
    this.modules.smoothScroll = new SmoothScroll();
    this.modules.animations = new AnimationController();
    this.modules.gallery = new GalleryManager(dataManager);
    this.modules.galleryLoader = new GalleryLoader();
    this.modules.formHandler = new FormHandler();
    this.modules.contactLinks = new ContactLinks(dataManager);
    this.modules.aboutLoader = new AboutLoader(dataManager);
    this.modules.contactLoader = new ContactLoader(dataManager);
    this.modules.pricingLoader = new PricingLoader(dataManager);
    this.modules.contentSync = new ContentSync(dataManager);

    Object.values(this.modules).forEach((mod) => mod.init && mod.init());

    this.setupEffectSync(dataManager);
    this.modules.contentSync.init();

    loader.hide();
  }

  setupEffectSync(dataManager) {
    const applyEffectFromSettings = () => {
      const settings = dataManager.getSettings();
      const effect = settings.galleryEffect || "effect-1";
      if (this.modules.animations?.galleryEffects?.currentEffect !== effect) {
        this.modules.animations.galleryEffects.updateEffect(effect);
      }
    };

    const debouncedApply = debounce(applyEffectFromSettings, 150);
    dataManager.subscribe(() => debouncedApply());
    window.addEventListener("storage", (e) => {
      if (e.key === CONFIG.STORAGE_KEY) applyEffectFromSettings();
    });
    window.addEventListener("scroll", debouncedApply, { passive: true });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new App().init();
});
