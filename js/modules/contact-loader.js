import { DataManager } from "../data/data-manager.js";

export class ContactLoader {
  constructor(dataManager = new DataManager()) {
    this.dataManager = dataManager;
    this.defaults = this.dataManager.getData().contact;
  }

  init() {
    this.apply(this.dataManager.getData().contact);
    this.dataManager.subscribe(({ data }) => {
      this.apply(data.contact);
    });
  }

  apply(contact) {
    const data = contact || this.defaults;
    if (!data) return;

    const waLink = document.querySelector(".contact-link.whatsapp");
    if (waLink) {
      const msg = encodeURIComponent(
        data.whatsapp?.customMessage || this.defaults.whatsapp.customMessage
      );
      const visible = data.whatsapp?.visible !== false;
      waLink.style.display = visible ? "" : "none";
      if (visible) {
        waLink.href = `https://wa.me/${
          data.whatsapp?.number || this.defaults.whatsapp.number
        }?text=${msg}`;
      }
    }

    const tgLink = document.querySelector(".contact-link.telegram");
    if (tgLink) {
      const msg = encodeURIComponent(
        data.telegram?.customMessage || this.defaults.telegram.customMessage
      );
      const visible = data.telegram?.visible !== false;
      tgLink.style.display = visible ? "" : "none";
      if (visible) {
        const formattedTg = this.formatTelegram(
          data.telegram?.username || this.defaults.telegram.username,
          msg
        );
        if (formattedTg) tgLink.href = formattedTg;
      }
    }

    const emailLink = document.querySelector(".contact-link.email");
    if (emailLink) {
      const visible = data.email?.visible !== false;
      emailLink.style.display = visible ? "" : "none";
      if (visible) {
        const email = (
          data.email?.value ||
          data.email ||
          this.defaults.email?.value ||
          this.defaults.email ||
          ""
        ).trim();
        emailLink.href = this.formatMailto(email);
      }
    }

    const responseLine = document.querySelector(".response-promise");
    if (responseLine && data.responseTime)
      responseLine.textContent = data.responseTime;

    this.applySocial(data.social);
  }

  applySocial(social = {}) {
    const map = {
      instagram: '[data-social="instagram"]',
      facebook: '[data-social="facebook"]',
      twitter: '[data-social="twitter"]',
      pinterest: '[data-social="pinterest"]',
      linkedin: '[data-social="linkedin"]',
      github: '[data-social="github"]',
      youtube: '[data-social="youtube"]',
      tiktok: '[data-social="tiktok"]',
    };
    Object.entries(map).forEach(([key, selector]) => {
      const el = document.querySelector(selector);
      if (!el) return;
      const visible = social[key]?.visible !== false;
      const url = social[key]?.url;
      el.style.display = visible && url ? "" : "none";
      if (visible && url) el.href = url;
    });
  }

  formatMailto(email) {
    if (!email) return "";
    const trimmed = email.trim();
    const subject = encodeURIComponent("Contact Request");
    return `mailto:${trimmed}?subject=${subject}`;
  }

  formatTelegram(input = "", encodedMsg = "") {
    const raw = input.trim();
    if (!raw) return "";
    const withoutAt = raw.startsWith("@") ? raw.slice(1) : raw;
    const isPhone = /^[+]?[\d\s-]+$/.test(withoutAt);
    const handle = isPhone ? withoutAt.replace(/\s|-/g, "") : withoutAt;
    const base = `https://t.me/${handle}`;
    return encodedMsg ? `${base}?text=${encodedMsg}` : base;
  }
}
