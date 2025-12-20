// MENU TOGGLE
const mobileToggle = document.getElementById('mobile-toggle');
const navbar = document.getElementById('navbar');

mobileToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
    mobileToggle.classList.toggle('active');
});

// SCRIPT PARTICLE ANIMATION
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

let particlesArray;
const numberOfParticles = 80; // Jumlah partikel

// Atur ukuran canvas sesuai layar
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

// Class Particle
class Particle {
    constructor(x, y, directionX, directionY, size) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#00aaff'; // Warna partikel
        ctx.fill();
    }

    update() {
        // Pantulan jika kena pinggir layar
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

// Inisialisasi Partikel
function init() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = Math.random() * (window.innerWidth - size * 2);
        let y = Math.random() * (window.innerHeight - size * 2);
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        particlesArray.push(new Particle(x, y, directionX, directionY, size));
    }
}

// Menghubungkan titik (Garis)
function connect() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let dx = particlesArray[a].x - particlesArray[b].x;
            let dy = particlesArray[a].y - particlesArray[b].y;
            let distance = dx * dx + dy * dy;

            if (distance < (canvas.width/7) * (canvas.height/7)) {
                ctx.strokeStyle = 'rgba(0, 170, 255, 0.1)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Loop Animasi
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

// Jalankan
init();
animate();


// --- 2. SCRIPT TYPING EFFECT (MANUAL / TANPA LIBRARY) ---
const textElement = document.querySelector('.typing-text');
const words = ["Programmer", "IT Support", "Informatics Student", "Machine Learning Engineer", "Designer", "Data Analyst"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        // Hapus karakter
        textElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Tambah karakter
        textElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        // Selesai ngetik, pause sebentar lalu hapus
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        // Selesai hapus, pindah ke kata berikutnya
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

// Jalankan efek ketik saat halaman load
document.addEventListener('DOMContentLoaded', typeEffect);