import { ScrollAnimations } from "./scroll-animations.js";
import { GalleryEffects } from "./gallery-effects.js";
import { SectionIndicators } from "./section-indicators.js";
import { EntranceAnimations } from "./entrance-animations.js";

export class AnimationController {
  constructor() {
    this.scrollAnimations = new ScrollAnimations();
    this.galleryEffects = new GalleryEffects();
    this.sectionIndicators = new SectionIndicators();
    this.entranceAnimations = new EntranceAnimations();
  }

  init() {
    this.scrollAnimations.init();
    this.sectionIndicators.init();
    this.entranceAnimations.init();
    this.galleryEffects.init();
  }
}
