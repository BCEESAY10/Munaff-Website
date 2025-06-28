// File: index.js
// This file contains JavaScript code for the Munaff Dental Clinic website.
document.addEventListener("DOMContentLoaded", function () {
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

  // Chatbot
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