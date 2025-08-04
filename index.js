// File: index.js
// This file contains JavaScript code for the Munaff Dental Clinic website.
document.addEventListener("DOMContentLoaded", function () {

   // Loader logic
  const loader = document.getElementById('page-loader');
  const percent = document.getElementById('loader-percent');
  let currentPercent = 0;
  let interval;

  // List of images to preload (hero bg + about carousel)
  const imagesToLoad = [
    "images/Home.jpg",
    "images/Home-image.JPG",
    "images/about/img-1.jpg",
    "images/about/img-2.jpg",
    "images/about/img-3.jpg",
    "images/about/img-4.jpg",
    "images/about/img-5.jpg",
    "images/about/img-6.jpg",
    "images/about/img-7.jpg",
    "images/about/img-9.jpg",
    "images/about/img-11.jpg",
    "images/about/img-12.jpg"
  ];
  let loadedCount = 0;

  function updatePercent(val) {
    percent.textContent = `${val}%`;
  }

  function finishLoader() {
    loader.style.opacity = 0;
    setTimeout(() => loader.style.display = 'none', 700);
  }

  // Animate percent from 0 to 100
  interval = setInterval(() => {
    if (currentPercent < 99) {
      currentPercent += 1;
      updatePercent(currentPercent);
    }
  }, 18);

  // Preload images
  imagesToLoad.forEach(src => {
    const img = new Image();
    img.onload = img.onerror = function () {
      loadedCount++;
      // When all images loaded, set percent to 100 and hide loader
      if (loadedCount === imagesToLoad.length) {
        clearInterval(interval);
        updatePercent(100);
        setTimeout(finishLoader, 600);
      }
    };
    img.src = src;
  });

  // Animate the logo
  setTimeout(function () {
      const logo = document.getElementById("munaff-logo");
      logo.classList.remove("opacity-0", "-translate-x-20");
      logo.classList.add("opacity-100", "translate-x-0");
    }, 2000);

  // Navbar scroll highlight
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

  // Burger menu
  const burger = document.getElementById('burger');
  const menu = document.getElementById('menu');
  const navLinks = document.querySelectorAll('#menu a');
  if (burger && menu) {
    burger.addEventListener('click', function() {
      menu.classList.toggle('hidden');
      menu.classList.toggle('flex');
    });
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (menu.classList.contains('flex')) {
          menu.classList.add('hidden');
          menu.classList.remove('flex');
        }
      });
    });
  }
  

  // Carousel
  const carousel = document.querySelector('.carousel');
  const items = document.querySelectorAll('.carousel-item');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const carouselContainer = document.querySelector('.carousel-container');
  if (carousel && items.length && prevBtn && nextBtn && carouselContainer) {
    let currentIndex = 0;
    const totalSlides = items.length;
    const slideInterval = 5000;
    const updateCarousel = () => {
      const offset = -currentIndex * 100;
      carousel.style.transform = `translateX(${offset}%)`;
    };
    const showNext = () => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateCarousel();
    };
    const showPrev = () => {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateCarousel();
    };
    let autoSlide = setInterval(showNext, slideInterval);
    carouselContainer.addEventListener('mouseover', () => clearInterval(autoSlide));
    carouselContainer.addEventListener('mouseleave', () => {
      autoSlide = setInterval(showNext, slideInterval);
    });
    prevBtn.addEventListener("click", () => {
      clearInterval(autoSlide);
      showPrev();
      autoSlide = setInterval(showNext, slideInterval);
    });
    nextBtn.addEventListener("click", () => {
      clearInterval(autoSlide);
      showNext();
      autoSlide = setInterval(showNext, slideInterval);
    });
    // Touch gestures
    let startX = 0;
    carousel.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX));
    carousel.addEventListener("touchend", (e) => {
      const endX = e.changedTouches[0].clientX;
      if (startX > endX + 50) showNext();
      else if (startX < endX - 50) showPrev();
    });
  }


  // Services animation
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



// Home section animation
document.addEventListener("DOMContentLoaded", function () {
  // Animate h1 and button
  setTimeout(() => {
    const title = document.getElementById('home-title');
    const btn = document.getElementById('home-btn');
    if (title) {
      title.classList.remove('opacity-0', 'translate-y-8');
      title.classList.add('opacity-100', 'translate-y-0');
    }
    setTimeout(() => {
      if (btn) {
        btn.classList.remove('opacity-0', '-translate-y-8');
        btn.classList.add('opacity-100', 'translate-y-0');
      }
    }, 400);
  }, 300);

  // Typewriter effect for p, repeat every 25 seconds
  const typewriter = document.getElementById('typewriter');
  const text = "We are here to help you achieve optimal oral health and the beautiful smile you've always wanted.";
  function runTypewriter() {
    let i = 0;
    function type() {
      if (typewriter && i <= text.length) {
        typewriter.textContent = text.slice(0, i);
        i++;
        setTimeout(type, 35);
      }
    }
    type();
  }
  runTypewriter();
  setInterval(() => {
    runTypewriter();
  }, 25000);
});