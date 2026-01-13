import { AdminGallery } from "./admin-gallery.js";
import { getImageUrl } from "../core/utils.js";

export class AdminUpload {
  constructor() {
    this.gallery = new AdminGallery();
    this.uploadArea = document.getElementById("uploadArea");
    this.fileInput = document.getElementById("photoUpload");
    this.form = document.getElementById("photoDetailsForm");
    this.preview = document.getElementById("photoPreview");
    this.titleInput = document.getElementById("photoTitle");
    this.categoryInput = document.getElementById("photoCategory");
    this.cancelBtn = document.getElementById("cancelUpload");
    this.currentFileUrl = null;
  }

  init() {
    this.gallery.init();
    if (!this.uploadArea) return;
    this.uploadArea.addEventListener("click", () => this.fileInput?.click());
    this.uploadArea.addEventListener("dragover", (e) => {
      e.preventDefault();
      this.uploadArea.style.borderColor = "var(--primary-color)";
    });
    this.uploadArea.addEventListener("dragleave", () => {
      this.uploadArea.style.borderColor = "var(--glass-border)";
    });
    this.uploadArea.addEventListener("drop", (e) =>
      this.handleFile(e.dataTransfer.files[0])
    );
    this.fileInput?.addEventListener("change", (e) =>
      this.handleFile(e.target.files[0])
    );
    this.cancelBtn?.addEventListener("click", () => this.reset());
    this.form?.addEventListener("submit", (e) => {
      e.preventDefault();
      this.gallery.add({
        src: this.currentFileUrl,
        title: this.titleInput.value,
        category: this.categoryInput.value,
      });
      alert("Photo added successfully!");
      this.reset();
    });
  }

  handleFile(file) {
    if (!file) return;
    this.currentFileUrl = getImageUrl(file);
    this.preview.src = this.currentFileUrl;
    this.uploadArea.style.display = "none";
    this.form.style.display = "block";
  }

  reset() {
    this.uploadArea.style.display = "block";
    this.form.style.display = "none";
    this.form.reset();
    this.currentFileUrl = null;
  }
}
