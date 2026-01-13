import { DataManager } from "../data/data-manager.js";

export class AdminDashboard {
  constructor() {
    this.dataManager = new DataManager();
    this.dashboardSection = document.getElementById("dashboard");
    this.sections = document.querySelectorAll(".admin-section");
    this.sidebarItems = document.querySelectorAll(".sidebar-item");
  }

  init() {
    this.updateStats();
    this.bindActions();
    this.showDashboard();
  }

  updateStats() {
    const photos = this.dataManager.getGallery();
    const totalPhotos = document.getElementById("totalPhotos");
    if (totalPhotos) totalPhotos.textContent = photos.length;
    const effectEl = document.getElementById("currentEffect");
    if (effectEl)
      effectEl.textContent = (
        this.dataManager.getSettings().galleryEffect || "effect-1"
      ).replace("effect-", "Effect ");
  }

  bindActions() {
    console.log("Dashboard: attaching listeners");
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-action]");
      if (!btn) return;
      const action = btn.dataset.action;
      console.log("Dashboard action click:", action);
      if (action === "back-dashboard") {
        this.showDashboard();
        this.updateSidebarActive("show-dashboard");
        return;
      }
      if (action === "logout-demo") {
        window.location.href = "index.html";
        return;
      }
      this.handleAction(action);
    });
  }

  handleAction(action) {
    const map = {
      "show-dashboard": "dashboard",
      "manage-gallery": "gallery",
      "manage-effects": "effects",
      "manage-settings": "contact",
      "edit-content": "content",
      "edit-about": "about-section",
    };
    const target = map[action];
    if (target) {
      this.showSection(target);
      this.updateSidebarActive(action);
    } else {
      console.warn("Unknown action:", action);
    }
  }

  showSection(id) {
    this.sections.forEach((sec) => sec.classList.remove("active"));
    const target = document.getElementById(id);
    if (target) target.classList.add("active");
  }

  showDashboard() {
    this.sections.forEach((sec) => sec.classList.remove("active"));
    if (this.dashboardSection) this.dashboardSection.classList.add("active");
  }

  updateSidebarActive(action) {
    if (!this.sidebarItems?.length) return;
    this.sidebarItems.forEach((item) => {
      item.classList.toggle("active", item.dataset.action === action);
    });
  }
}
