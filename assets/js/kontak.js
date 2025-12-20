// MENU TOGGLE
const mobileToggle = document.getElementById('mobile-toggle');
const navbar = document.getElementById('navbar');

mobileToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
    mobileToggle.classList.toggle('active');
});

// FORM SUBMISSION
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Mencegah reload halaman
        
        const btn = document.querySelector('.btn-send');
        const name = document.getElementById('name').value;
        const originalText = btn.innerText;

        // Ubah tombol jadi loading
        btn.innerText = "Mengirim...";
        btn.style.opacity = "0.7";
        btn.disabled = true;

        // Simulasi kirim data (delay 1.5 detik)
        setTimeout(() => {
            alert(`Halo ${name}, pesan Anda berhasil dikirim! (Ini hanya simulasi).`);
            
            // Reset Form & Tombol
            contactForm.reset();
            btn.innerText = originalText;
            btn.style.opacity = "1";
            btn.disabled = false;
        }, 1500);
    });
}