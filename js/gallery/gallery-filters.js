export class GalleryFilters {
  constructor(manager) {
    this.manager = manager;
    this.buttons = document.querySelectorAll(".filter-btn");
  }

  init() {
    this.buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.dataset.filter || "all";
        this.manager.currentFilter = filter;
        this.manager.render(filter);
      });
    });
  }
}
