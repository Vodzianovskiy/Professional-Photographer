import { Storage } from "./storage.js";
import { cloneDefaults } from "./schema.js";
import { CONFIG } from "../core/config.js";

const DEFAULT_GALLERY = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop",
    title: "Portrait Beauty",
    category: "portrait",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop",
    title: "Wedding Ceremony",
    category: "wedding",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=900&fit=crop",
    title: "Fashion Editorial",
    category: "fashion",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop",
    title: "Professional Portrait",
    category: "portrait",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=400&fit=crop",
    title: "Nature Landscape",
    category: "nature",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?w=600&h=800&fit=crop",
    title: "Model Shoot",
    category: "fashion",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=400&fit=crop",
    title: "Wedding Kiss",
    category: "wedding",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop",
    title: "Corporate Portrait",
    category: "portrait",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=900&fit=crop",
    title: "Mountain Vista",
    category: "nature",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?w=600&h=400&fit=crop",
    title: "Bridal Portrait",
    category: "wedding",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=800&fit=crop",
    title: "Elegant Fashion",
    category: "fashion",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1541599468348-e96984315921?w=600&h=400&fit=crop",
    title: "Sunset Nature",
    category: "nature",
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=800&fit=crop",
    title: "Beauty Portrait",
    category: "portrait",
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&h=900&fit=crop",
    title: "Wedding Rings",
    category: "wedding",
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop",
    title: "Street Fashion",
    category: "fashion",
  },
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop",
    title: "Studio Portrait",
    category: "portrait",
  },
  {
    id: 17,
    src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600&h=400&fit=crop",
    title: "Ocean Waves",
    category: "nature",
  },
  {
    id: 18,
    src: "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=600&h=800&fit=crop",
    title: "Runway Model",
    category: "fashion",
  },
];

export class DataManager {
  constructor(storage = new Storage()) {
    this.storage = storage;
    this.subscribers = new Set();
    this.initStorageListener();
  }

  initStorageListener() {
    window.addEventListener("storage", (e) => {
      if (e.key === CONFIG.STORAGE_KEY) {
        this.notify({ source: "storage" });
      }
    });
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notify(detail = {}) {
    const payload = {
      data: this.storage.getData(),
      updatedAt: Date.now(),
      ...detail,
    };
    this.subscribers.forEach((cb) => {
      try {
        cb(payload);
      } catch (err) {
        console.error("DataManager subscriber failed", err);
      }
    });
    window.dispatchEvent(
      new CustomEvent("content:updated", { detail: payload })
    );
  }

  getData() {
    return this.storage.getData();
  }

  saveData(data, detail = {}) {
    const payload = {
      ...data,
      meta: {
        ...(data.meta || {}),
        updatedAt: Date.now(),
        source: detail.source || "admin",
      },
    };
    this.storage.saveData(payload);
    if (!detail.skipNotify) this.notify(detail);
  }

  getGallery() {
    const data = this.storage.getData();
    if (!data.photos || !data.photos.length) {
      data.photos = DEFAULT_GALLERY;
      this.storage.saveData(data);
    }
    return data.photos;
  }

  saveGallery(photos, detail = {}) {
    const data = this.storage.getData();
    data.photos = photos;
    this.saveData(data, detail);
  }

  getSettings() {
    const data = this.storage.getData();
    return data.settings || {};
  }

  updateSettings(settings, detail = {}) {
    const data = this.storage.getData();
    data.settings = { ...(data.settings || {}), ...settings };
    this.saveData(data, detail);
  }

  updateSection(name, value, detail = {}) {
    const data = this.storage.getData();
    data[name] = value;
    this.saveData(data, detail);
  }

  resetSection(name) {
    const defaults = cloneDefaults();
    const data = this.storage.getData();
    data[name] = defaults[name];
    this.saveData(data, { source: "reset" });
    return data[name];
  }
}
