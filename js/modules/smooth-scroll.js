export class SmoothScroll {
  init() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href && href !== "#") {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target)
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }
}
