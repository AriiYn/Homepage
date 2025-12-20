// MENU TOGGLE
const mobileToggle = document.getElementById('mobile-toggle');
const navbar = document.getElementById('navbar');

mobileToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
    mobileToggle.classList.toggle('active');
});


// IMAGE & VIDEO
const modal = document.getElementById("mediaModal");
const modalImg = document.getElementById("modal-img");
const modalVideo = document.getElementById("modal-video");
const captionText = document.getElementById("caption");
function openModal(element, type = 'image', source = '') {
    if (!modal) return;

    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    const title = element.alt || "Media Preview";
    captionText.innerText = title;

    if (type === 'video') {
        modalImg.style.display = "none";
        modalVideo.style.display = "block";
        modalVideo.src = source;
        modalVideo.play();
    } else {
        modalVideo.style.display = "none";
        modalVideo.pause();
        modalImg.style.display = "block";
        modalImg.src = element.src;
    }
}

// Fungsi Tutup Modal
function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    
    // Stop Video & Reset Source
    modalVideo.pause();
    modalVideo.src = "";
}

// Event Listeners
window.addEventListener('click', (e) => {
    // Tutup jika klik area hitam luar media
    if (e.target === modal) closeModal();
});

// Tutup pakai tombol ESC
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") {
        closeModal();
    }
});