import { SectionObserver } from "../modules/section-observer.js";

export class ScrollAnimations {
  init() {
    const observer = new SectionObserver();
    observer.init();
  }
}
