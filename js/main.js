const counters = document.querySelectorAll(".counter");

let started = false;

window.addEventListener("scroll", () => {
  const section = document.querySelector(".stats-section");

  if (!section) return;

  const sectionTop = section.offsetTop - window.innerHeight;

  if (window.scrollY >= sectionTop && !started) {
    counters.forEach(counter => {
      let target = +counter.getAttribute("data-target");
      let count = 0;

      const update = () => {
        let increment = target / 100;

        if (count < target) {
          count += increment;
          counter.innerText = Math.floor(count);
          setTimeout(update, 20);
        } else {
          counter.innerText = target.toLocaleString() + "+";
        }
      };

      update();
    });

    started = true;
  }
});
