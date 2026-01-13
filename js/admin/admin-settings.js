import { DataManager } from "../data/data-manager.js";
import { EFFECTS } from "../core/constants.js";
import { isValidEmail } from "../core/utils.js";

export class AdminSettings {
  constructor() {
    this.dataManager = new DataManager();
    this.effectSelector = document.getElementById("gallery-effect-selector");
    this.previewButton = document.getElementById("preview-effect");
    this.form = document.getElementById("contactSettingsForm");
    this.previewBoard = document.getElementById("effect-preview-board");
    this.previewImg = document.getElementById("effect-preview-image");
    this.previewTitle = document.getElementById("effect-preview-title");
    this.resetBtn = document.getElementById("resetContact");
    this.previewModeToggle = document.getElementById("contactPreviewToggle");
    this.effectNames = [
      "Fade Scale",
      "Slide Up",
      "Slide Down",
      "Slide Left",
      "Slide Right",
      "Zoom In",
      "Zoom Out",
      "Rotate In",
      "Flip In",
      "Blur In",
      "Bounce In",
      "Elastic",
      "Pulse",
      "Wobble",
      "Light Speed",
      "Tada",
      "Jello",
      "Roll In",
      "Fade Left",
      "Fade Right",
    ];
    this.showAllSocialBtn = document.getElementById("showAllSocial");
    this.hideAllSocialBtn = document.getElementById("hideAllSocial");
    this.socialVisibleCount = document.getElementById("socialVisibleCount");
    this.socialPlatforms = [
      {
        key: "instagram",
        urlId: "instagramUrl",
        visId: "instagramVisible",
        defaultUrl: "https://instagram.com/alexandramorgan",
      },
      {
        key: "facebook",
        urlId: "facebookUrl",
        visId: "facebookVisible",
        defaultUrl: "https://facebook.com/alexandramorgan",
      },
      {
        key: "twitter",
        urlId: "twitterUrl",
        visId: "twitterVisible",
        defaultUrl: "https://twitter.com/alexandramorgan",
      },
      {
        key: "pinterest",
        urlId: "pinterestUrl",
        visId: "pinterestVisible",
        defaultUrl: "https://pinterest.com/alexandramorgan",
      },
      {
        key: "linkedin",
        urlId: "linkedinUrl",
        visId: "linkedinVisible",
        defaultUrl: "https://linkedin.com/in/alexandramorgan",
      },
      {
        key: "github",
        urlId: "githubUrl",
        visId: "githubVisible",
        defaultUrl: "https://github.com/alexandramorgan",
      },
      {
        key: "youtube",
        urlId: "youtubeUrl",
        visId: "youtubeVisible",
        defaultUrl: "https://youtube.com/@alexandramorgan",
      },
      {
        key: "tiktok",
        urlId: "tiktokUrl",
        visId: "tiktokVisible",
        defaultUrl: "https://tiktok.com/@alexandramorgan",
      },
    ];
  }

  init() {
    this.populateEffectSelector();
    this.renderEffectPreviewBoard();
    this.attachEvents();
    this.loadContactSettings();
    const current = this.dataManager.getSettings().galleryEffect || "effect-1";
    this.showEffectPreview(
      current,
      this.effectNames[EFFECTS.indexOf(current)] || current,
      false
    );
  }

  populateEffectSelector() {
    if (!this.effectSelector) return;
    EFFECTS.forEach((val, idx) => {
      const opt = document.createElement("option");
      opt.value = val;
      opt.textContent = this.effectNames[idx] || val;
      this.effectSelector.appendChild(opt);
    });
    const settings = this.dataManager.getSettings();
    this.effectSelector.value = settings.galleryEffect || "effect-1";
  }

  attachEvents() {
    this.effectSelector?.addEventListener("change", (e) => {
      const val = e.target.value;
      this.dataManager.updateSettings({ galleryEffect: val });
      this.showNotification("Effect saved!");
      this.highlightSelected(val);
      this.showEffectPreview(
        val,
        this.effectNames[EFFECTS.indexOf(val)] || val,
        true
      );
    });
    this.previewButton?.addEventListener("click", () =>
      window.open("index.html#gallery", "_blank")
    );
    const replayBtn = document.getElementById("replayEffect");
    replayBtn?.addEventListener("click", () => {
      const current = this.effectSelector?.value || EFFECTS[0];
      this.showEffectPreview(
        current,
        this.effectNames[EFFECTS.indexOf(current)] || current,
        true
      );
    });
    this.form?.addEventListener("submit", (e) => {
      e.preventDefault();
      const validation = this.validateContactForm();
      if (!validation.valid) {
        this.showNotification(
          validation.message || "Please check your inputs",
          true
        );
        return;
      }
      const contact = {
        whatsapp: {
          number: document.getElementById("whatsappNumber").value,
          customMessage:
            document.getElementById("whatsappMessage")?.value || "",
          visible:
            document.getElementById("whatsappVisible")?.checked !== false,
        },
        telegram: {
          username: document.getElementById("telegramUsername").value,
          customMessage:
            document.getElementById("telegramMessage")?.value || "",
          visible:
            document.getElementById("telegramVisible")?.checked !== false,
        },
        email: {
          value: document.getElementById("emailAddress").value,
          visible: document.getElementById("emailVisible")?.checked !== false,
        },
        responseTime: document.getElementById("responseTime").value,
        autoReply: document.getElementById("autoReply").value,
        social: {
          instagram: {
            url: document.getElementById("instagramUrl").value,
            visible:
              document.getElementById("instagramVisible")?.checked !== false,
          },
          facebook: {
            url: document.getElementById("facebookUrl").value,
            visible:
              document.getElementById("facebookVisible")?.checked !== false,
          },
          twitter: {
            url: document.getElementById("twitterUrl").value,
            visible:
              document.getElementById("twitterVisible")?.checked !== false,
          },
          pinterest: {
            url: document.getElementById("pinterestUrl").value,
            visible:
              document.getElementById("pinterestVisible")?.checked !== false,
          },
          linkedin: {
            url: document.getElementById("linkedinUrl")?.value || "",
            visible:
              document.getElementById("linkedinVisible")?.checked !== false,
          },
          github: {
            url: document.getElementById("githubUrl")?.value || "",
            visible:
              document.getElementById("githubVisible")?.checked !== false,
          },
          youtube: {
            url: document.getElementById("youtubeUrl")?.value || "",
            visible:
              document.getElementById("youtubeVisible")?.checked !== false,
          },
          tiktok: {
            url: document.getElementById("tiktokUrl")?.value || "",
            visible:
              document.getElementById("tiktokVisible")?.checked !== false,
          },
        },
      };
      this.dataManager.updateSection("contact", contact, {
        source: "admin-contact",
      });
      this.showNotification("Contact settings saved!");
    });

    this.resetBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      const def = this.dataManager.resetSection("contact");
      this.applyContactToForm(def);
      this.showNotification("Contact reset to defaults");
    });

    this.previewModeToggle?.addEventListener("change", () => {
      this.togglePreviewMode();
    });

    this.showAllSocialBtn?.addEventListener("click", () =>
      this.toggleAllSocial(true)
    );
    this.hideAllSocialBtn?.addEventListener("click", () =>
      this.toggleAllSocial(false)
    );

    document
      .querySelectorAll(
        "[data-social-toggle], #whatsappVisible, #telegramVisible, #emailVisible"
      )
      .forEach((chk) => {
        chk.addEventListener("change", () => {
          this.updateSocialVisibilityUI();
          this.updateSocialCount();
        });
      });
  }

  renderEffectPreviewBoard() {
    if (!this.previewBoard) return;
    this.previewBoard.innerHTML = "";
    const current = this.dataManager.getSettings().galleryEffect || "effect-1";
    EFFECTS.forEach((val, idx) => {
      const card = document.createElement("div");
      card.className = "effect-preview-card";
      if (val === current) card.classList.add("active");
      card.dataset.effect = val;

      const thumb = document.createElement("div");
      thumb.className = "effect-preview-thumb";

      const img = document.createElement("img");
      img.src =
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&h=400&fit=crop";
      img.alt = this.effectNames[idx] || val;
      img.className = "effect-demo";

      thumb.appendChild(img);

      const name = document.createElement("div");
      name.className = "effect-preview-name";
      name.textContent = this.effectNames[idx] || val;

      card.appendChild(thumb);
      card.appendChild(name);

      card.addEventListener("mouseenter", () => {
        this.showEffectPreview(val, name.textContent, true);
      });
      card.addEventListener("click", () => {
        this.effectSelector.value = val;
        this.dataManager.updateSettings({ galleryEffect: val });
        this.showNotification("Effect saved!");
        this.highlightSelected(val);
        this.showEffectPreview(val, name.textContent, true);
      });

      this.previewBoard.appendChild(card);
    });
  }

  highlightSelected(effect) {
    if (!this.previewBoard) return;
    this.previewBoard
      .querySelectorAll(".effect-preview-card")
      .forEach((card) => {
        card.classList.toggle("active", card.dataset.effect === effect);
      });
  }

  showEffectPreview(effect, label, animate = true) {
    if (!this.previewImg || !this.previewTitle) return;
    this.previewTitle.textContent = label || "Effect Preview";
    this.previewImg.classList.remove("animated", ...EFFECTS);
    void this.previewImg.offsetWidth;
    if (animate) {
      this.previewImg.classList.add("animated", effect);
    } else {
      this.previewImg.classList.add(effect);
    }
  }

  loadContactSettings() {
    if (!this.form) return;
    const data = this.dataManager.getData();
    const c = data.contact || {};
    this.applyContactToForm(c);
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

  applyContactToForm(c) {
    document.getElementById("whatsappNumber").value =
      c.whatsapp?.number || "+1234567890";
    document.getElementById("telegramUsername").value =
      c.telegram?.username || "@username";
    document.getElementById("whatsappMessage") &&
      (document.getElementById("whatsappMessage").value =
        c.whatsapp?.customMessage || "");
    document.getElementById("telegramMessage") &&
      (document.getElementById("telegramMessage").value =
        c.telegram?.customMessage || "");
    document.getElementById("emailAddress").value =
      c.email?.value || c.email || "hello@alexandramorgan.com";
    document.getElementById("whatsappVisible") &&
      (document.getElementById("whatsappVisible").checked =
        c.whatsapp?.visible !== false);
    document.getElementById("telegramVisible") &&
      (document.getElementById("telegramVisible").checked =
        c.telegram?.visible !== false);
    document.getElementById("emailVisible") &&
      (document.getElementById("emailVisible").checked =
        c.email?.visible !== false);
    this.socialPlatforms.forEach((p) => {
      const input = document.getElementById(p.urlId);
      const toggle = document.getElementById(p.visId);
      const val = c.social?.[p.key]?.url || p.defaultUrl;
      if (input) input.value = val;
      if (toggle) toggle.checked = c.social?.[p.key]?.visible !== false;
    });
    document.getElementById("responseTime").value =
      c.responseTime || "I'll respond within 24 hours";
    document.getElementById("autoReply").value =
      c.autoReply || "Thank you for reaching out!";
    this.updateSocialVisibilityUI();
    this.updateSocialCount();
  }

  validateContactForm() {
    const email = document.getElementById("emailAddress")?.value?.trim();
    const wa = document.getElementById("whatsappNumber")?.value?.trim();
    const tg = document.getElementById("telegramUsername")?.value?.trim();
    const urlFields = [
      "instagram",
      "facebook",
      "twitter",
      "pinterest",
      "linkedin",
      "github",
      "youtube",
      "tiktok",
    ];
    if (email && !isValidEmail(email))
      return { valid: false, message: "Enter a valid email address" };
    const requireAny =
      (document.getElementById("whatsappVisible")?.checked !== false && wa) ||
      (document.getElementById("telegramVisible")?.checked !== false && tg) ||
      (document.getElementById("emailVisible")?.checked !== false && email);
    if (!requireAny)
      return { valid: false, message: "Provide at least one contact method" };
    const badUrl = urlFields.find((key) => {
      const cfg = this.socialPlatforms.find((p) => p.key === key);
      const toggle = document.getElementById(cfg?.visId);
      if (toggle && !toggle.checked) return false;
      const val = document.getElementById(cfg?.urlId || "")?.value?.trim();
      if (!val) return true;
      try {
        new URL(val);
        return false;
      } catch {
        return true;
      }
    });
    if (badUrl)
      return { valid: false, message: "One of the social URLs is invalid" };
    return { valid: true };
  }

  togglePreviewMode() {
    const previewCard = document.querySelector(".contact-preview-card");
    if (previewCard)
      previewCard.classList.toggle("active", this.previewModeToggle?.checked);
    if (this.previewModeToggle?.checked) {
      const data = this.dataManager.getData().contact;
      const preview = document.getElementById("contactPreviewBody");
      if (preview && data) {
        preview.innerHTML = `
          <p><strong>WhatsApp:</strong> ${
            data.whatsapp?.number || "Not set"
          }</p>
          <p><strong>Telegram:</strong> ${
            data.telegram?.username || "Not set"
          }</p>
          <p><strong>Email:</strong> ${
            data.email?.value || data.email || "Not set"
          }</p>
          <p><strong>Response Time:</strong> ${data.responseTime || "-"}</p>
          <p><strong>Auto Reply:</strong> ${data.autoReply || "-"}</p>
        `;
      }
    }
  }

  toggleAllSocial(show = true) {
    this.socialPlatforms.forEach((p) => {
      const toggle = document.getElementById(p.visId);
      if (toggle) toggle.checked = show;
    });
    this.updateSocialVisibilityUI();
    this.updateSocialCount();
  }

  updateSocialVisibilityUI() {
    const groups = [
      { id: "whatsappNumber", toggle: "whatsappVisible" },
      { id: "telegramUsername", toggle: "telegramVisible" },
      { id: "emailAddress", toggle: "emailVisible" },
      ...this.socialPlatforms.map((p) => ({ id: p.urlId, toggle: p.visId })),
    ];
    groups.forEach((g) => {
      const input = document.getElementById(g.id);
      const t = document.getElementById(g.toggle);
      if (!input || !t) return;
      input.style.opacity = t.checked ? "1" : "0.6";
    });
  }

  updateSocialCount() {
    if (!this.socialVisibleCount) return;
    const total = this.socialPlatforms.length; // only social links in this section
    const visible = this.socialPlatforms.reduce(
      (acc, p) => acc + (document.getElementById(p.visId)?.checked ? 1 : 0),
      0
    );
    this.socialVisibleCount.textContent = `${visible} of ${total} social links visible`;
  }
}
