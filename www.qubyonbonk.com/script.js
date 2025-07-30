async function loadImageCarousel() {
  try {
    const response = await fetch('images.txt');
    const text = await response.text();
    const imageUrls = text.trim().split('\n').filter(url => url.trim() !== '');
    
    const imageRow = document.querySelector('.image-row');
    if (imageRow) {
      imageRow.innerHTML = '';
      
      const innerContainer = document.createElement('div');
      innerContainer.className = 'image-row-inner';
      
      const preloadImages = imageUrls.slice(0, 4);
      await Promise.all(preloadImages.map(url => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve;
          img.src = url.trim();
        });
      }));
      
      for (let i = 0; i < 3; i++) {
        imageUrls.forEach((url, index) => {
          const img = document.createElement('img');
          img.className = 'row-img';
          
          if (i > 0 || index >= 4) {
            img.loading = 'lazy';
          }
          
          img.src = url.trim();
          innerContainer.appendChild(img);
        });
      }
      
      imageRow.appendChild(innerContainer);
    }
  } catch (error) {
    console.error('Error loading images:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadImageCarousel);

document.addEventListener('DOMContentLoaded', function() {
  const video = document.querySelector('.community.video');
  if (video) {
    const videoUrls = [
      'https://res.cloudinary.com/dliqaq40z/video/upload/v1753663351/video_ued178.webm',
      'https://res.cloudinary.com/dliqaq40z/video/upload/v1753609183/video_yu3rbt.webm',
      'https://res.cloudinary.com/dliqaq40z/video/upload/v1753663774/video_vb2lyb.webm',
    ];
    const randomVideo = videoUrls[Math.floor(Math.random() * videoUrls.length)];
    
    video.src = randomVideo;
    video.volume = 0.25;
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const imageRow = document.querySelector('.image-row-inner');
  let isPaused = false;

  function pauseCarousel() {
    if (imageRow) {
      imageRow.style.animationPlayState = 'paused';
      isPaused = true;
    }
  }

  function unpauseCarousel() {
    if (imageRow) {
      imageRow.style.animationPlayState = 'running';
      isPaused = false;
    }
  }

  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('row-img')) {
      pauseCarousel();
      return;
    }

    if (isPaused && !event.target.closest('.image-row')) {
      unpauseCarousel();
    }
  });

  function isMobile() {
    return window.innerWidth <= 768;
  }

  if (isMobile()) {
    window.addEventListener('resize', function() {
      if (!isMobile()) {
        if (isPaused) {
          unpauseCarousel();
        }
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const addressButton = document.querySelector('.address');
  if (addressButton) {
    addressButton.addEventListener('click', async function() {
      const contractAddress = 'Hdmx6XcGyWNdEwYGcBaAQLYWgzknkbonk';
      
      try {
        await navigator.clipboard.writeText(contractAddress);
        
        const originalText = addressButton.textContent;
        
        addressButton.style.color = 'transparent';
        
        setTimeout(() => {
          addressButton.textContent = 'Copied to clipboard!';
          
          addressButton.style.color = '#141715';
          
          setTimeout(() => {
            addressButton.style.color = 'transparent';
            
            setTimeout(() => {
              addressButton.textContent = originalText;
              
              addressButton.style.color = '#141715';
            }, 200);
          }, 1500);
        }, 200);
        
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    });
  }
});
