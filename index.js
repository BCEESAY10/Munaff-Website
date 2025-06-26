document.addEventListener("DOMContentLoaded", function(){
    window.addEventListener('scroll', function() {
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('nav a');

    sections.forEach(section => {
      let top = window.scrollY;
      let offset = section.offsetTop - 150;
      let height = section.offsetHeight;
      let id = section.getAttribute('id');

      if (top >= offset && top < offset + height) {
        navLinks.forEach(link => {
          link.classList.remove('bg-[#151B54]', 'text-white');
          document.querySelector('nav a[href*=' + id + ']').classList.add('bg-[#151B54]', 'text-white');
        });
      }
    });
  });

  document.addEventListener('DOMContentLoaded', function () {
    const burger = document.getElementById('burger');
    const menu = document.getElementById('menu');
    const navLinks = document.querySelectorAll('#menu a');

    burger.addEventListener('click', function() {
        if (menu) {
            menu.classList.toggle('hidden');
            menu.classList.toggle('flex'); 
        } else {
            console.error("Menu element not found!");
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (menu.classList.contains('flex')) {
                menu.classList.add('hidden');
                menu.classList.remove('flex');
            }
        });
    });
});

//Sliding images in the About section
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector('.carousel');
  const items = document.querySelectorAll('.carousel-item');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  let currentIndex = 0;
  const totalSlides = items.length;
  const slideInterval = 5000; 

  // Function to update the carousel's position
  const updateCarousel = () => {
    const offset = -currentIndex * 100; // Slide based on index
    carousel.style.transform = `translateX(${offset}%)`;
  };

  // Show the next slide
  const showNext = () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  };

  // Show the previous slide
  const showPrev = () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  };

  // Auto-slide functionality
  let autoSlide = setInterval(showNext, slideInterval);

  // Pause auto-slide on hover and resume on mouse leave
  const carouselContainer = document.querySelector('.carousel-container');
  carouselContainer.addEventListener('mouseover', () => clearInterval(autoSlide));
  carouselContainer.addEventListener('mouseleave', () => {
    autoSlide = setInterval(showNext, slideInterval);
  });

  // Event listeners for navigation buttons
  prevBtn.addEventListener("click", () => {
    clearInterval(autoSlide); 
    showPrev();
    autoSlide = setInterval(showNext, slideInterval);
  });

  nextBtn.addEventListener("click", () => {
    clearInterval(autoSlide); // Reset auto-slide
    showNext();
    autoSlide = setInterval(showNext, slideInterval);
  });

  // Optional: Add swipe gestures for touch devices
  let startX = 0;
  carousel.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX));
  carousel.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX > endX + 50) showNext(); 
    else if (startX < endX - 50) showPrev(); 
  });
});

//Chatbot

document.addEventListener("DOMContentLoaded", function () {
  const chatToggle = document.getElementById("chat-toggle");
  if (chatToggle) {
      chatToggle.addEventListener("click", function() {
        let chatBox = document.getElementById("chat-box");
        if (chatBox.style.display === "none" || chatBox.style.display === "") {
            chatBox.style.display = "block";
        } else {
            chatBox.style.display = "none";
        }
      });
  } else {
      console.error("Element with ID 'chat-toggle' not found!");
  }
});

})

// Services

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.service-card');
  const revealCards = () => {
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        card.style.opacity = 1;
        card.style.transform = 'translateY(0)';
      }
    });
  };
  window.addEventListener('scroll', revealCards);
  revealCards();
});
