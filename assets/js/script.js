document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('open');
        });
    }

    // 2. Form Submission Handling (Mock)
    const leadForm = document.getElementById('leadForm');
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(leadForm);
            console.log("Form submitted to RLELOFTS@GMAIL.COM:", Object.fromEntries(formData));
            alert('Thank you for your enquiry! Your details have been sent to RLELOFTS@GMAIL.COM. A member of the RLE Lofts & Extensions team will call you back shortly.');
            leadForm.reset();
        });
    }

    // 3. Intersection Observer for Fade-In Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.glass-card').forEach(card => {
        observer.observe(card);
    });

    // 4. Sticky CTA Visibility logic (Enhanced)
    const stickyCTA = document.querySelector('.sticky-cta');
    const heroSection = document.querySelector('.hero, .page-hero');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            stickyCTA.style.display = 'flex';
        } else {
            stickyCTA.style.display = 'none';
        }
    });

    // 5. Subtle 3D Tilt Effect (Optional)
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) translateY(0) rotateX(0) rotateY(0)`;
        });
    });
});
