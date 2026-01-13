import { CONFIG } from "../core/config.js";
import { cloneDefaults } from "./schema.js";

export class Storage {
  constructor() {
    this.storageKey = CONFIG.STORAGE_KEY;
  }

  getData() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return this.getDefaultData();
      const parsed = JSON.parse(raw);
      return this.mergeWithDefaults(parsed);
    } catch (err) {
      console.error(
        "Storage: failed to parse data, resetting to defaults",
        err
      );
      this.clear();
      return this.getDefaultData();
    }
  }

  saveData(data) {
    const payload = this.mergeWithDefaults(data);
    localStorage.setItem(this.storageKey, JSON.stringify(payload));
  }

  getSection(name) {
    const data = this.getData();
    return data[name] || null;
  }

  updateSection(name, value) {
    const data = this.getData();
    data[name] = value;
    this.saveData(data);
  }

  clear() {
    localStorage.removeItem(this.storageKey);
  }

  getDefaultData() {
    return cloneDefaults();
  }

  mergeWithDefaults(data) {
    const defaults = this.getDefaultData();
    const mergeContactField = (defObj, incoming) => {
      if (incoming && typeof incoming === "object") {
        return {
          ...defObj,
          ...incoming,
          visible: incoming.visible !== false,
        };
      }
      if (typeof incoming === "string")
        return { ...defObj, value: incoming, visible: true };
      return defObj;
    };

    const mergeSocial = (defaultSocial, incomingSocial = {}) => {
      const result = {};
      Object.keys(defaultSocial).forEach((key) => {
        const defVal = defaultSocial[key];
        const incoming = incomingSocial[key];
        if (incoming && typeof incoming === "object") {
          result[key] = {
            url: incoming.url || defVal.url || "",
            visible: incoming.visible !== false,
          };
        } else if (typeof incoming === "string") {
          result[key] = { url: incoming, visible: true };
        } else {
          result[key] = defVal;
        }
      });
      return result;
    };

    return {
      ...defaults,
      ...data,
      meta: { ...defaults.meta, ...(data?.meta || {}) },
      navigation: {
        ...defaults.navigation,
        ...(data?.navigation || {}),
        items: data?.navigation?.items || defaults.navigation.items,
      },
      hero: { ...defaults.hero, ...(data?.hero || {}) },
      theme: { ...defaults.theme, ...(data?.theme || {}) },
      about: {
        ...defaults.about,
        ...(data?.about || {}),
        stats: data?.about?.stats || defaults.about.stats,
      },
      contact: {
        ...defaults.contact,
        ...(data?.contact || {}),
        whatsapp: mergeContactField(
          defaults.contact.whatsapp,
          data?.contact?.whatsapp
        ),
        telegram: mergeContactField(
          defaults.contact.telegram,
          data?.contact?.telegram
        ),
        email: mergeContactField(defaults.contact.email, data?.contact?.email),
        social: mergeSocial(
          defaults.contact.social,
          data?.contact?.social || {}
        ),
      },
      pricing:
        Array.isArray(data?.pricing) && data.pricing.length
          ? data.pricing
          : defaults.pricing,
      photos: Array.isArray(data?.photos) ? data.photos : defaults.photos,
      settings: { ...defaults.settings, ...(data?.settings || {}) },
      footer: { ...defaults.footer, ...(data?.footer || {}) },
    };
  }
}
