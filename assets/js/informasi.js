// MENU TOGGLE
const mobileToggle = document.getElementById('mobile-toggle');
const navbar = document.getElementById('navbar');

mobileToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
    mobileToggle.classList.toggle('active');
});


// FAQ
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const body = item.querySelector('.faq-body');

    if (header && body) {
        header.addEventListener('click', () => {
            // Opsional: Tutup item lain saat satu dibuka
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-body').style.maxHeight = null;
                }
            });

            // Toggle item saat ini
            item.classList.toggle('active');
            
            if (item.classList.contains('active')) {
                body.style.maxHeight = body.scrollHeight + "px";
            } else {
                body.style.maxHeight = null;
            }
        });
    }
});