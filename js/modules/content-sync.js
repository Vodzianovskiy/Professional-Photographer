import { debounce } from "../core/utils.js";

export class ContentSync {
  constructor(dataManager) {
    this.dataManager = dataManager;
    this.applyContent = this.applyContent.bind(this);
    this.applyContentThrottled = debounce(this.applyContent, 80);
  }

  init() {
    this.applyContent(this.dataManager.getData());
    this.dataManager.subscribe(({ data }) => this.applyContentThrottled(data));
    window.addEventListener("storage", () =>
      this.applyContentThrottled(this.dataManager.getData())
    );
  }

  applyContent(data) {
    if (!data) return;
    this.applyNavigation(data.navigation);
    this.applyHero(data.hero);
    this.applyTheme(data.theme);
    this.applyFooter(data.footer);
  }

  applyNavigation(nav) {
    if (!nav) return;
    const brandEl = document.querySelector(".logo");
    if (brandEl && nav.brand) this.animateText(brandEl, nav.brand);

    const navLinks = document.querySelectorAll(
      ".nav-menu .nav-link:not(.admin-link)"
    );
    if (navLinks && nav.items) {
      navLinks.forEach((link, idx) => {
        const item = nav.items[idx];
        if (!item) return;
        if (item.label) this.animateText(link, item.label);
        if (item.href) link.href = item.href;
      });
    }
  }

  applyHero(hero) {
    if (!hero) return;
    const lines = document.querySelectorAll(".hero-title .hero-line");
    hero.titleLines?.forEach((text, idx) => {
      if (lines[idx]) this.animateText(lines[idx], text);
    });
    const subtitle = document.querySelector(".hero-subtitle");
    if (subtitle && hero.subtitle) this.animateText(subtitle, hero.subtitle);

    const background = document.querySelector(".hero-background");
    if (background && hero.background) {
      background.style.backgroundImage = `url('${hero.background}')`;
    }
    const overlay = document.querySelector(".hero-overlay");
    if (overlay && typeof hero.overlayOpacity === "number") {
      overlay.style.opacity = hero.overlayOpacity;
    }
  }

  applyTheme(theme) {
    if (!theme) return;
    const root = document.documentElement;
    const map = {
      "--primary-color": theme.primaryColor,
      "--secondary-color": theme.secondaryColor,
      "--background-dark": theme.background,
      "--background-light": theme.background,
      "--text-primary": theme.textPrimary,
      "--text-secondary": theme.textSecondary,
      "--accent-gradient": theme.accentGradient,
    };
    Object.entries(map).forEach(([key, val]) => {
      if (val) root.style.setProperty(key, val);
    });
  }

  applyFooter(footer) {
    if (!footer) return;
    const footerTexts = document.querySelectorAll(".footer p");
    if (footerTexts[0] && footer.line1)
      this.animateText(footerTexts[0], footer.line1);
    if (footerTexts[1] && footer.line2)
      this.animateText(footerTexts[1], footer.line2);
  }

  animateText(el, text) {
    if (!el) return;
    if (el.textContent === text) return;
    el.classList.add("content-updated");
    el.textContent = text;
    setTimeout(() => el.classList.remove("content-updated"), 350);
  }
}
