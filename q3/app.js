const carousel = document.getElementById('carousel');
const carouselInner = document.getElementById('carousel-inner');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const dotsContainer = document.getElementById('carousel-dots');
const dots = document.querySelectorAll('.dot');
const slides = document.querySelectorAll('.carousel-slide');

let currentIndex = 0;
const totalSlides = slides.length;
let autoSlideInterval = null;

function updateCarousel() {
    carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function startAutoSlide() {
    if (!autoSlideInterval) {
        autoSlideInterval = setInterval(nextSlide, 3000);
    }
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

prevBtn.addEventListener('click', () => {
    prevSlide();
});

nextBtn.addEventListener('click', () => {
    nextSlide();
});

dotsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('dot')) {
        currentIndex = parseInt(e.target.getAttribute('data-index'), 10);
        updateCarousel();
    }
});

carousel.addEventListener('mouseenter', () => {
    stopAutoSlide();
});

carousel.addEventListener('mouseleave', () => {
    startAutoSlide();
});

startAutoSlide();
