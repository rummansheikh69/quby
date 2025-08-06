async function loadImageCarousel() {
  try {
    const imageUrls = [
      "https://res.cloudinary.com/dsdg8ke2n/image/upload/v1754071601/image_11_fc7tum.webp",
      "https://res.cloudinary.com/dsdg8ke2n/image/upload/v1754071600/image_h24hf8.png",
      "https://res.cloudinary.com/dsdg8ke2n/image/upload/v1754071600/image_10_vviizm.webp",
      "https://res.cloudinary.com/dsdg8ke2n/image/upload/v1754071600/image_9_qabm3f.webp",
      "https://res.cloudinary.com/dsdg8ke2n/image/upload/v1754071600/image_9_qabm3f.webp",
      "https://res.cloudinary.com/dsdg8ke2n/image/upload/v1754071599/image_8_nvheba.webp",
      "https://res.cloudinary.com/dsdg8ke2n/image/upload/v1754071598/image_7_rkslcl.webp",
      "https://res.cloudinary.com/dsdg8ke2n/image/upload/v1754071597/image_5_nyjrzk.webp",
      "https://res.cloudinary.com/dsdg8ke2n/image/upload/v1754071597/image_4_rnbebj.webp",
      "https://res.cloudinary.com/dsdg8ke2n/image/upload/v1754071596/image_2_si4tlc.webp",
      "https://res.cloudinary.com/dsdg8ke2n/image/upload/v1754071596/image_2_si4tlc.webp",
      "https://res.cloudinary.com/dsdg8ke2n/image/upload/v1754071595/image_1_r52ubn.webp",
      "https://res.cloudinary.com/dsdg8ke2n/image/upload/v1754071595/image_xdvp8o.webp",
    ];

    const imageRow = document.querySelector(".image-row");
    if (imageRow) {
      imageRow.innerHTML = "";

      const innerContainer = document.createElement("div");
      innerContainer.className = "image-row-inner";

      const preloadImages = imageUrls.slice(0, 4);
      await Promise.all(
        preloadImages.map((url) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = resolve;
            img.src = url.trim();
          });
        })
      );

      for (let i = 0; i < 3; i++) {
        imageUrls.forEach((url, index) => {
          const img = document.createElement("img");
          img.className = "row-img";

          if (i > 0 || index >= 4) {
            img.loading = "lazy";
          }

          img.src = url.trim();
          innerContainer.appendChild(img);
        });
      }

      imageRow.appendChild(innerContainer);
    }
  } catch (error) {
    console.error("Error loading images:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadImageCarousel);

document.addEventListener("DOMContentLoaded", function () {
  const video = document.querySelector(".community.video");
  if (video) {
    const videoUrls = [
      "https://res.cloudinary.com/dsdg8ke2n/image/upload/v1754071733/blueguytypeshit2_jglgvx.gif",
      "https://res.cloudinary.com/dsdg8ke2n/image/upload/v1754071732/blueguytypeshit_supx8x.gif",
    ];

    const randomVideo = videoUrls[Math.floor(Math.random() * videoUrls.length)];
    video.src = randomVideo;
    video.volume = 0.25;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  let isPaused = false;

  document.addEventListener("click", function (event) {
    const imageRow = document.querySelector(".image-row-inner");

    if (!imageRow) return;

    if (event.target.classList.contains("row-img")) {
      imageRow.style.animationPlayState = "paused";
      isPaused = true;
    } else if (isPaused && !event.target.closest(".image-row")) {
      imageRow.style.animationPlayState = "running";
      isPaused = false;
    }
  });

  function isMobile() {
    return window.innerWidth <= 768;
  }

  if (isMobile()) {
    window.addEventListener("resize", function () {
      const imageRow = document.querySelector(".image-row-inner");
      if (!imageRow) return;

      if (!isMobile() && isPaused) {
        imageRow.style.animationPlayState = "running";
        isPaused = false;
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const addressButton = document.querySelector(".address");
  if (addressButton) {
    addressButton.addEventListener("click", async function () {
      const contractAddress = "5qb7EzgKz2WC3McRgFhZKpTJFHAE8m1nJgdTw9Kfpump";

      try {
        await navigator.clipboard.writeText(contractAddress);
        const originalText = addressButton.textContent;

        addressButton.style.color = "transparent";

        setTimeout(() => {
          addressButton.textContent = "Copied to clipboard!";
          addressButton.style.color = "#141715";

          setTimeout(() => {
            addressButton.style.color = "transparent";

            setTimeout(() => {
              addressButton.textContent = originalText;
              addressButton.style.color = "#141715";
            }, 200);
          }, 1500);
        }, 200);
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    });
  }
});
