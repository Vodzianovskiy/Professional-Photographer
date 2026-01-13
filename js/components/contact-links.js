import { DataManager } from "../data/data-manager.js";

export class ContactLinks {
  constructor(dataManager = new DataManager()) {
    this.dataManager = dataManager;
  }

  init() {
    const apply = (contact) => {
      const wa = document.querySelector(".contact-link.whatsapp");
      const tg = document.querySelector(".contact-link.telegram");
      if (wa && contact?.whatsapp) {
        const text = encodeURIComponent(
          contact.whatsapp.customMessage ||
            "Hello! I would like to inquire about your photography services."
        );
        wa.href = `https://wa.me/${
          contact.whatsapp.number || "1234567890"
        }?text=${text}`;
      }
      if (tg && contact?.telegram) {
        const text = encodeURIComponent(
          contact.telegram.customMessage ||
            "Hello! I would like to inquire about your photography services."
        );
        tg.href = `https://t.me/${
          contact.telegram.username || "username"
        }?text=${text}`;
      }
    };

    apply(this.dataManager.getData().contact);
    this.dataManager.subscribe(({ data }) => apply(data.contact));
  }
}
