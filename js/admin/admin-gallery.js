import { DataManager } from "../data/data-manager.js";
import { generateId } from "../core/utils.js";

export class AdminGallery {
  constructor() {
    this.dataManager = new DataManager();
    this.grid = document.getElementById("adminGalleryGrid");
    this.emptyMessage = "No photos yet";
  }

  init() {
    this.render();
    // event delegation for delete buttons
    this.grid?.addEventListener("click", (e) => {
      const btn = e.target.closest(".delete-btn");
      if (!btn) return;
      const id = btn.dataset.photoId;
      if (!id) return;
      this.handleDelete(id, btn);
    });
  }

  render() {
    if (!this.grid) return;
    const photos = this.dataManager.getGallery();
    this.grid.innerHTML = "";
    const counter = document.getElementById("galleryCount");
    if (counter) counter.textContent = `(${photos.length} photos)`;

    if (!photos.length) {
      const empty = document.createElement("div");
      empty.className = "gallery-item-info";
      empty.textContent = this.emptyMessage;
      this.grid.appendChild(empty);
      return;
    }

    photos.forEach((item) => {
      const div = document.createElement("div");
      div.className = "admin-gallery-item";
      div.innerHTML = `
        <img src="${item.src}" alt="${item.title}">
        <button class="delete-btn" data-photo-id="${item.id}">×</button>
        <div class="gallery-item-info">
          <h4>${item.title}</h4>
          <p>${item.category}</p>
        </div>`;
      this.grid.appendChild(div);
    });
  }

  add(photo) {
    const photos = this.dataManager.getGallery();
    photos.unshift({ id: generateId(), ...photo });
    this.dataManager.saveGallery(photos, { source: "admin-gallery" });
    this.render();
  }

  handleDelete(id, buttonEl) {
    const confirmed = window.confirm("Delete this photo?");
    if (!confirmed) return;

    const card = buttonEl.closest(".admin-gallery-item");
    if (card) {
      card.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      card.style.opacity = "0";
      card.style.transform = "scale(0.96)";
      setTimeout(() => {
        const photos = this.dataManager
          .getGallery()
          .filter((p) => String(p.id) !== String(id));
        this.dataManager.saveGallery(photos, { source: "admin-gallery" });
        this.render();
        this.showNotification("Photo deleted ✅");
      }, 280);
    } else {
      const photos = this.dataManager
        .getGallery()
        .filter((p) => String(p.id) !== String(id));
      this.dataManager.saveGallery(photos, { source: "admin-gallery" });
      this.render();
      this.showNotification("Photo deleted ✅");
    }
  }

  showNotification(message) {
    const el = document.createElement("div");
    el.className = "success-message";
    el.textContent = message;
    document.body.appendChild(el);
    setTimeout(() => {
      el.style.animation = "slideInRight 0.5s ease reverse";
      setTimeout(() => el.remove(), 400);
    }, 1500);
  }
}
