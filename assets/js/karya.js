// MENU TOGGLE
const mobileToggle = document.getElementById('mobile-toggle');
const navbar = document.getElementById('navbar');

mobileToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
    mobileToggle.classList.toggle('active');
});


// SLIDESHOW
let galleryImages = [];
let currentSlideIndex = 0;

const modal = document.getElementById("galleryModal");
const modalImg = document.getElementById("modal-img");
const captionText = document.getElementById("caption");
const counterText = document.getElementById("counter");

// Fungsi Buka Gallery (Dipanggil dari HTML onclick)
function openGallery(title, imagesString) {
    galleryImages = [];
    if (imagesString) {
        galleryImages = imagesString.split(',').map(item => item.trim());
    }
    if (galleryImages.length === 0) {
        console.error("Tidak ada gambar ditemukan");
        return;
    }
    if (captionText) captionText.innerText = title;
    currentSlideIndex = 0;
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";

    updateSlide();
}

// Fungsi Update Tampilan Slide
function updateSlide() {
    if (!modalImg) return;

    // Efek fade/zoom reset
    modalImg.style.animation = 'none';
    modalImg.offsetHeight; /* trigger reflow */
    modalImg.style.animation = 'zoom 0.3s';

    // Ganti src gambar
    modalImg.src = galleryImages[currentSlideIndex];

    // Update Counter (Contoh: 1 / 5)
    if (counterText) {
        counterText.innerText = `${currentSlideIndex + 1} / ${galleryImages.length}`;
    }
}

// Fungsi Ganti Slide (Tombol Next/Prev)
function changeSlide(n) {
    currentSlideIndex += n;

    // Loop jika sampai ujung
    if (currentSlideIndex >= galleryImages.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = galleryImages.length - 1;
    }

    updateSlide();
}

// Fungsi Tutup Modal
function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Buka kunci scroll
}

// Event Listeners
window.addEventListener('click', (e) => {
    // Tutup jika klik area hitam luar gambar
    if (e.target === modal) closeModal();
});

// Keyboard Navigation (Panah Kiri/Kanan & ESC)
document.addEventListener('keydown', (e) => {
    if (modal.style.display === "flex") {
        if (e.key === "ArrowLeft") changeSlide(-1);
        if (e.key === "ArrowRight") changeSlide(1);
        if (e.key === "Escape") closeModal();
    }
});