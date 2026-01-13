import { DataManager } from "../data/data-manager.js";

export class AdminContent {
  constructor() {
    this.dataManager = new DataManager();
    this.heroForm = document.getElementById("heroContentForm");
    this.navForm = document.getElementById("navForm");
    this.themeForm = document.getElementById("themeForm");
    this.previewHeroBtn = document.getElementById("previewHero");
    this.resetHeroBtn = document.getElementById("resetHero");
    this.previewThemeBtn = document.getElementById("previewTheme");
    this.resetThemeBtn = document.getElementById("resetTheme");
    this.resetNavBtn = document.getElementById("resetNav");
  }

  init() {
    if (!this.heroForm && !this.navForm && !this.themeForm) return;
    this.loadData();
    this.bindEvents();
  }

  loadData() {
    const data = this.dataManager.getData();
    this.applyHeroToForm(data.hero);
    this.applyNavToForm(data.navigation);
    this.applyThemeToForm(data.theme);
    this.renderPreview(data);
  }

  bindEvents() {
    this.heroForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      const hero = this.collectHeroData();
      if (!hero.titleLines[0] || !hero.subtitle) {
        this.showNotification("Hero title and subtitle are required", true);
        return;
      }
      this.dataManager.updateSection("hero", hero, { source: "admin-hero" });
      this.renderPreview({ ...this.dataManager.getData(), hero });
      this.showNotification("Hero content published");
    });

    this.previewHeroBtn?.addEventListener("click", () => {
      this.renderPreview({
        ...this.dataManager.getData(),
        hero: this.collectHeroData(),
      });
      this.showNotification("Hero preview updated (not published)");
    });

    this.resetHeroBtn?.addEventListener("click", () => {
      const def = this.dataManager.resetSection("hero");
      this.applyHeroToForm(def);
      this.renderPreview({ ...this.dataManager.getData(), hero: def });
    });

    this.navForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      const navigation = this.collectNavData();
      this.dataManager.updateSection("navigation", navigation, {
        source: "admin-nav",
      });
      this.renderPreview({ ...this.dataManager.getData(), navigation });
      this.showNotification("Navigation published");
    });

    this.resetNavBtn?.addEventListener("click", () => {
      const def = this.dataManager.resetSection("navigation");
      this.applyNavToForm(def);
      this.renderPreview({ ...this.dataManager.getData(), navigation: def });
    });

    this.themeForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      const theme = this.collectThemeData();
      this.dataManager.updateSection("theme", theme, { source: "admin-theme" });
      this.renderPreview({ ...this.dataManager.getData(), theme });
      this.showNotification("Theme colors published");
    });

    this.previewThemeBtn?.addEventListener("click", () => {
      this.renderPreview({
        ...this.dataManager.getData(),
        theme: this.collectThemeData(),
      });
      this.showNotification("Theme preview updated (not published)");
    });

    this.resetThemeBtn?.addEventListener("click", () => {
      const def = this.dataManager.resetSection("theme");
      this.applyThemeToForm(def);
      this.renderPreview({ ...this.dataManager.getData(), theme: def });
    });
  }

  collectHeroData() {
    return {
      titleLines: [
        document.getElementById("heroLine1")?.value || "",
        document.getElementById("heroLine2")?.value || "",
        document.getElementById("heroLine3")?.value || "",
      ],
      subtitle: document.getElementById("heroSubtitle")?.value || "",
      background: document.getElementById("heroBackground")?.value || "",
      overlayOpacity: Number(
        document.getElementById("heroOverlay")?.value || 0.35
      ),
    };
  }

  collectNavData() {
    const brand =
      document.getElementById("navBrand")?.value || "Alexandra Morgan";
    const items = Array.from(document.querySelectorAll("[data-nav-item]")).map(
      (wrapper, idx) => ({
        id: `nav-${idx}`,
        label: wrapper.querySelector("[data-nav-label]")?.value || "",
        href: wrapper.querySelector("[data-nav-href]")?.value || "",
      })
    );
    return { brand, items };
  }

  collectThemeData() {
    return {
      primaryColor: document.getElementById("themePrimary")?.value || "#D4AF37",
      secondaryColor:
        document.getElementById("themeSecondary")?.value || "#1a1a1a",
      background:
        document.getElementById("themeBackground")?.value || "#0a0a0a",
      textPrimary:
        document.getElementById("themeTextPrimary")?.value || "#ffffff",
      textSecondary:
        document.getElementById("themeTextSecondary")?.value || "#b0b0b0",
      accentGradient:
        document.getElementById("themeAccent")?.value ||
        "linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)",
    };
  }

  applyHeroToForm(hero) {
    if (!hero) return;
    document.getElementById("heroLine1") &&
      (document.getElementById("heroLine1").value = hero.titleLines?.[0] || "");
    document.getElementById("heroLine2") &&
      (document.getElementById("heroLine2").value = hero.titleLines?.[1] || "");
    document.getElementById("heroLine3") &&
      (document.getElementById("heroLine3").value = hero.titleLines?.[2] || "");
    document.getElementById("heroSubtitle") &&
      (document.getElementById("heroSubtitle").value = hero.subtitle || "");
    document.getElementById("heroBackground") &&
      (document.getElementById("heroBackground").value = hero.background || "");
    document.getElementById("heroOverlay") &&
      (document.getElementById("heroOverlay").value =
        hero.overlayOpacity ?? 0.35);
  }

  applyNavToForm(nav) {
    if (!nav) return;
    const brandInput = document.getElementById("navBrand");
    if (brandInput) brandInput.value = nav.brand || "";
    const items = nav.items || [];
    document.querySelectorAll("[data-nav-item]").forEach((wrapper, idx) => {
      const item = items[idx];
      if (!item) return;
      const label = wrapper.querySelector("[data-nav-label]");
      const href = wrapper.querySelector("[data-nav-href]");
      if (label) label.value = item.label || "";
      if (href) href.value = item.href || "";
    });
  }

  applyThemeToForm(theme) {
    if (!theme) return;
    document.getElementById("themePrimary") &&
      (document.getElementById("themePrimary").value =
        theme.primaryColor || "#D4AF37");
    document.getElementById("themeSecondary") &&
      (document.getElementById("themeSecondary").value =
        theme.secondaryColor || "#1a1a1a");
    document.getElementById("themeBackground") &&
      (document.getElementById("themeBackground").value =
        theme.background || "#0a0a0a");
    document.getElementById("themeTextPrimary") &&
      (document.getElementById("themeTextPrimary").value =
        theme.textPrimary || "#ffffff");
    document.getElementById("themeTextSecondary") &&
      (document.getElementById("themeTextSecondary").value =
        theme.textSecondary || "#b0b0b0");
    document.getElementById("themeAccent") &&
      (document.getElementById("themeAccent").value =
        theme.accentGradient || "");
  }

  renderPreview(data) {
    if (!data) return;
    const hero = data.hero;
    const nav = data.navigation;
    const heroTitle = document.getElementById("heroPreviewTitle");
    const heroSubtitle = document.getElementById("heroPreviewSubtitle");
    const heroBg = document.getElementById("heroPreview");
    if (heroTitle && hero.titleLines)
      heroTitle.innerHTML = hero.titleLines
        .map((l) => `<span>${l}</span>`)
        .join(" ");
    if (heroSubtitle && hero.subtitle) heroSubtitle.textContent = hero.subtitle;
    if (heroBg && hero.background)
      heroBg.style.backgroundImage = `url('${hero.background}')`;
    const navList = document.getElementById("navPreviewList");
    if (navList && nav?.items) {
      navList.innerHTML = "";
      nav.items.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.label || "Link"} → ${item.href || "#"}`;
        navList.appendChild(li);
      });
    }
  }

  showNotification(message, isError = false) {
    const el = document.createElement("div");
    el.className = isError ? "error-message" : "success-message";
    el.textContent = message;
    document.body.appendChild(el);
    setTimeout(() => {
      el.style.animation = "slideInRight 0.5s ease reverse";
      setTimeout(() => el.remove(), 400);
    }, 1500);
  }
}
