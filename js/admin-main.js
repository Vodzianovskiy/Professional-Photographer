import { AdminAuth } from "./admin/admin-auth.js";
import { AdminDashboard } from "./admin/admin-dashboard.js";
import { AdminGallery } from "./admin/admin-gallery.js";
import { AdminSettings } from "./admin/admin-settings.js";
import { AdminUpload } from "./admin/admin-upload.js";
import { AdminAbout } from "./admin/admin-about.js";
import { AdminContent } from "./admin/admin-content.js";

class AdminApp {
  constructor() {
    this.navItems = document.querySelectorAll(".nav-item");
    this.sections = document.querySelectorAll(".admin-section");
    this.modules = {
      auth: new AdminAuth(),
      dashboard: new AdminDashboard(),
      gallery: new AdminGallery(),
      settings: new AdminSettings(),
      upload: new AdminUpload(),
      about: new AdminAbout(),
      content: new AdminContent(),
    };
  }

  init() {
    this.bindNavigation();
    Object.values(this.modules).forEach((m) => m.init && m.init());
  }

  bindNavigation() {
    this.navItems.forEach((item) => {
      item.addEventListener("click", () => {
        this.navItems.forEach((i) => i.classList.remove("active"));
        item.classList.add("active");
        const id = item.dataset.section;
        this.sections.forEach((sec) =>
          sec.classList.toggle("active", sec.id === id)
        );
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new AdminApp();
  app.init();
});
