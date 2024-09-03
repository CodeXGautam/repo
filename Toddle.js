document.addEventListener("DOMContentLoaded", () => {
  const linkItems = document.querySelectorAll(".link-item");
  const indicator = document.querySelector(".indicator");

  linkItems.forEach((linkItem, index) => {
    linkItem.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent the default action of the anchor tag

      document.querySelector(".link-item.active").classList.remove("active");
      linkItem.classList.add("active");

      // indicator.style.left = `${index * 95 + 48}px`;
    });
  });
});
