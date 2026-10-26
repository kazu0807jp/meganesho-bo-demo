document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
      menuToggle.textContent = isOpen ? "×" : "☰";
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    }));
  }

  const topButton = document.getElementById("backToTop");
  const updateTopButton = () => {
    if (topButton) topButton.classList.toggle("visible", window.scrollY > 420);
  };
  window.addEventListener("scroll", updateTopButton, { passive: true });
  updateTopButton();
  if (topButton) topButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  const emailButton = document.getElementById("emailButton");
  const toast = document.getElementById("toast");
  if (emailButton) {
    emailButton.addEventListener("click", () => {
      const openGmail = window.confirm("Gmailを開きますか？");
      if (openGmail) {
        const subject = encodeURIComponent("お問い合わせ");
        const body = encodeURIComponent("CAFE めがね書房 ご担当者様\n\n");
        window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=cafemeganebooks@gmail.com&su=${subject}&body=${body}`, "_blank", "noopener");
      }
    });
  }

  // If any remote image is blocked, the page still retains its layout and colour palette.
  document.querySelectorAll(".hero-photo, .about-image, .menu-image, .item-photo").forEach(el => {
    const bg = getComputedStyle(el).backgroundImage;
    if (bg && bg.includes("images.unsplash.com")) {
      const match = bg.match(/url\(["']?(.*?)["']?\)/);
      if (match && match[1]) {
        const img = new Image();
        img.onerror = () => { el.classList.add("image-fallback"); };
        img.src = match[1];
      }
    }
  });
});
