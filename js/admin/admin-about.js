import { DataManager } from "../data/data-manager.js";
import { getImageUrl } from "../core/utils.js";

export class AdminAbout {
  constructor() {
    this.dataManager = new DataManager();
    this.photoPreview = document.getElementById("about-photo-preview");
    this.photoInput = document.getElementById("about-photo-upload");
    this.headingInput = document.getElementById("about-heading");
    this.introInput = document.getElementById("about-intro");
    this.desc1Input = document.getElementById("about-desc1");
    this.desc2Input = document.getElementById("about-desc2");
    this.signatureInput = document.getElementById("about-signature");
    this.statInputs = [
      {
        number: document.getElementById("stat1-number"),
        label: document.getElementById("stat1-label"),
      },
      {
        number: document.getElementById("stat2-number"),
        label: document.getElementById("stat2-label"),
      },
      {
        number: document.getElementById("stat3-number"),
        label: document.getElementById("stat3-label"),
      },
    ];
    this.saveBtn = document.getElementById("save-about");
    this.currentPhoto = "";
  }

  init() {
    console.log("AdminAbout init");
    if (!this.headingInput) return;
    this.loadData();
    this.bindEvents();
  }

  loadData() {
    const data = this.dataManager.getData();
    const about = data.about || this.getDefaultAbout();
    this.currentPhoto = about.photoUrl || this.getDefaultAbout().photoUrl;
    if (this.photoPreview && this.currentPhoto)
      this.photoPreview.src = this.currentPhoto;
    this.headingInput.value = about.heading || "";
    this.introInput.value = about.intro || "";
    this.desc1Input.value = about.desc1 || "";
    this.desc2Input.value = about.desc2 || "";
    this.signatureInput.value = about.signature || "";
    const stats = about.stats || this.getDefaultAbout().stats;
    this.statInputs.forEach((s, idx) => {
      s.number.value = stats[idx]?.number || "";
      s.label.value = stats[idx]?.label || "";
    });
  }

  bindEvents() {
    this.photoInput?.addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      this.currentPhoto = getImageUrl(file);
      if (this.photoPreview) this.photoPreview.src = this.currentPhoto;
    });

    this.saveBtn?.addEventListener("click", () => {
      try {
        const data = this.dataManager.getData();
        data.about = {
          photoUrl: this.currentPhoto,
          heading: this.headingInput.value,
          intro: this.introInput.value,
          desc1: this.desc1Input.value,
          desc2: this.desc2Input.value,
          signature: this.signatureInput.value,
          stats: this.statInputs.map((s) => ({
            number: s.number.value,
            label: s.label.value,
          })),
        };
        this.dataManager.saveData(data, { source: "admin-about" });
        this.showNotification("About section saved!");
      } catch (err) {
        console.error("Error saving about:", err);
        this.showNotification("Failed to save about section");
      }
    });
  }

  getDefaultAbout() {
    return {
      photoUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop",
      heading: "About Me",
      intro:
        "Hello! I'm Alexandra, a passionate photographer with over 10 years of experience capturing life's most beautiful moments.",
      desc1:
        "My journey in photography began with a simple camera and an eye for beauty.",
      desc2:
        "I believe that every photograph tells a story, and my goal is to help you tell yours in the most authentic and beautiful way possible.",
      signature: "DX",
      stats: [
        { number: "500+", label: "HAPPY CLIENTS" },
        { number: "10+", label: "YEARS EXPERIENCE" },
        { number: "50+", label: "AWARDS WON" },
      ],
    };
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
