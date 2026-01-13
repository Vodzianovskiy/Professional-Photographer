import { GalleryEffects } from "../animations/gallery-effects.js";
import { DataManager } from "../data/data-manager.js";

export class GalleryEffectsSwitcher {
  constructor(manager) {
    this.manager = manager;
    this.effects = new GalleryEffects();
    this.dataManager = manager?.dataManager || new DataManager();
  }

  init() {
    this.effects.init();
  }

  applyCurrentEffect() {
    this.effects.init();
  }

  setEffect(effectName) {
    this.dataManager.updateSettings({ galleryEffect: effectName });
    this.effects.changeEffect(effectName);
  }
}
