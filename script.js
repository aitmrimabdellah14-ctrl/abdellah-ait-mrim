const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project");

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    const chosen = button.dataset.filter;
    projects.forEach((project) => {
      project.hidden = chosen !== "all" && project.dataset.category !== chosen;
    });
  });
});

const copyButton = document.getElementById("copyEmail");
const toast = document.getElementById("toast");

copyButton.addEventListener("click", async () => {
  const email = "aitmrimabdellah14@gmail.com";

  try {
    await navigator.clipboard.writeText(email);
    toast.textContent = "Adresse e-mail copiée";
  } catch (error) {
    toast.textContent = "Écris-moi via le bouton email";
  }

  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
});