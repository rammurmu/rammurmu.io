// Add any JavaScript functionality if needed
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form validation
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name === '' || email === '' || message === '') {
            alert('Please fill in all fields.');
            return;
        }

        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        alert('Thank you for your message! I will get back to you soon.');
        form.reset();
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Project filtering
    const filters = document.querySelectorAll('#project-filters button');
    const projects = document.querySelectorAll('.project');

    filters.forEach(filter => {
        filter.addEventListener('click', function() {
            filters.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const category = this.getAttribute('data-filter');

            projects.forEach(project => {
                if (category === 'all' || project.getAttribute('data-category') === category) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });

    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
    });

    // Animate progress bars
    const progressBars = document.querySelectorAll('.progress-bar');
    window.addEventListener('scroll', function() {
        progressBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (barPosition < windowHeight - 50) {
                bar.style.width = bar.getAttribute('data-progress');
            }
        });
    });

    // Typewriter effect for introduction text
    const typewriterText = document.getElementById('typewriter-text');
    const text = typewriterText.textContent;
    typewriterText.textContent = '';
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            typewriterText.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 50);
        }
    }

    typeWriter();

    // Accordion for experience section
    const accordions = document.querySelectorAll('.accordion-toggle');
    accordions.forEach(accordion => {
        accordion.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    });

    // Lazy loading for images
    const lazyImages = document.querySelectorAll('.lazy');
    const intersectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(entry.target);
            }
        });
    });

    lazyImages.forEach(image => {
        intersectionObserver.observe(image);
    });
});
