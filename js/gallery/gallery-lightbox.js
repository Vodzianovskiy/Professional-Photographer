export class GalleryLightbox {
  constructor() {
    this.lightbox = document.getElementById("lightbox");
    this.lightboxImg = document.getElementById("lightboxImg");
    this.lightboxCaption = document.getElementById("lightboxCaption");
    this.btnClose = document.querySelector(".lightbox-close");
    this.btnPrev = document.querySelector(".lightbox-prev");
    this.btnNext = document.querySelector(".lightbox-next");
    this.data = [];
    this.index = 0;
  }

  init() {
    if (!this.lightbox) return;
    this.btnClose?.addEventListener("click", () => this.close());
    this.btnPrev?.addEventListener("click", () => this.prev());
    this.btnNext?.addEventListener("click", () => this.next());
    this.lightbox.addEventListener("click", (e) => {
      if (e.target === this.lightbox) this.close();
    });
    document.addEventListener("keydown", (e) => {
      if (!this.lightbox.classList.contains("active")) return;
      if (e.key === "Escape") this.close();
      if (e.key === "ArrowRight") this.next();
      if (e.key === "ArrowLeft") this.prev();
    });
  }

  open(item, data) {
    this.data = data;
    this.index = data.findIndex((d) => d.id === item.id);
    this.update();
    this.lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  close() {
    this.lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }

  update() {
    const item = this.data[this.index];
    if (!item) return;
    this.lightboxImg.src = item.src;
    this.lightboxImg.alt = item.title;
    this.lightboxCaption.textContent = `${item.title} - ${item.category}`;
  }

  next() {
    this.index = (this.index + 1) % this.data.length;
    this.update();
  }

  prev() {
    this.index = (this.index - 1 + this.data.length) % this.data.length;
    this.update();
  }
}
