 // Mobile Menu Button: Added a button with an SVG icon to toggle the mobile

     document.addEventListener('DOMContentLoaded', function() {
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            const themeToggle = document.getElementById('theme-toggle');

            mobileMenuButton.addEventListener('click', function() {
                mobileMenu.classList.toggle('hidden');
            });
    
     // theme toggling functionality
    
            themeToggle.addEventListener('change', function() {
                const selectedTheme = themeToggle.value;
                document.documentElement.setAttribute('data-theme', selectedTheme);
                localStorage.setItem('theme', selectedTheme);
            });

            // Load saved theme from localStorage
            const savedTheme = localStorage.getItem('theme') || 'default';
            document.documentElement.setAttribute('data-theme', savedTheme);
            themeToggle.value = savedTheme;
        });
    
    

    // Handle newsletter subscription
    const newsletterForm = document.getElementById("newsletter-form");
    const newsletterEmail = document.getElementById("newsletter-email");
    const newsletterMessage = document.getElementById("newsletter-message");

    newsletterForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const email = newsletterEmail.value;
        if (validateEmail(email)) {
            newsletterMessage.textContent = "Thank you for subscribing!";
            newsletterMessage.classList.add("text-green-500");
            newsletterMessage.classList.remove("text-red-500");
        } else {
            newsletterMessage.textContent = "Please enter a valid email address.";
            newsletterMessage.classList.add("text-red-500");
            newsletterMessage.classList.remove("text-green-500");
        }
    });
    // Handle contact form submission
    const contactForm = document.getElementById("contact-form");
    const formMessage = document.getElementById("form-message");

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        if (name && validateEmail(email) && message) {
            formMessage.textContent = "Thank you for your message!";
            formMessage.classList.add("text-green-500");
            formMessage.classList.remove("text-red-500");
            contactForm.reset();
        } else {
            formMessage.textContent = "Please fill out all fields correctly.";
            formMessage.classList.add("text-red-500");
            formMessage.classList.remove("text-green-500");
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});

    // Blog post pagination and filtering
    const blogPosts = [
        {
            title: "My First Blog Post",
            date: "2025-02-20",
            summary: "This is the summary of my first blog post.",
            link: "blog/my-first-blog-post.html",
            category: "personal"
        },
        {
            title: "Another Interesting Post",
            date: "2025-02-22",
            summary: "This is the summary of another interesting post.",
            link: "blog/another-interesting-post.html",
            category: "technical"
        },
        // Add more blog posts here
    ];

    const postsPerPage = 5;
    let currentPage = 1;

    const blogPostsContainer = document.getElementById("blog-posts");
    const searchInput = document.getElementById("search-input");
    const categoryLinks = document.querySelectorAll("#categories a");
    const prevPageButton = document.getElementById("prev-page");
    const nextPageButton = document.getElementById("next-page");
    const pageInfo = document.getElementById("page-info");

    function displayPosts(posts) {
        blogPostsContainer.innerHTML = "";
        const start = (currentPage - 1) * postsPerPage;
        const end = start + postsPerPage;
        const paginatedPosts = posts.slice(start, end);

        paginatedPosts.forEach(post => {
            const postElement = document.createElement("article");
            postElement.innerHTML = `
                <h2><a href="${post.link}">${post.title}</a></h2>
                <p><small>${post.date}</small></p>
                <p>${post.summary}</p>
            `;
            blogPostsContainer.appendChild(postElement);
        });

        updatePaginationControls(posts.length);
    }

    function filterPosts() {
        const query = searchInput.value.toLowerCase();
        const selectedCategory = document.querySelector("#categories a.active")?.dataset.category || "all";
        const filteredPosts = blogPosts.filter(post => {
            const matchesQuery = post.title.toLowerCase().includes(query) || post.summary.toLowerCase().includes(query);
            const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
            return matchesQuery && matchesCategory;
        });
        currentPage = 1;
        displayPosts(filteredPosts);
    }

    function updatePaginationControls(totalPosts) {
        const totalPages = Math.ceil(totalPosts / postsPerPage);
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = currentPage === totalPages;
    }

    searchInput.addEventListener("input", filterPosts);

    categoryLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            categoryLinks.forEach(link => link.classList.remove("active"));
            this.classList.add("active");
            filterPosts();
        });
    });

    prevPageButton.addEventListener("click", () => {
        currentPage--;
        filterPosts();
    });

    nextPageButton.addEventListener("click", () => {
        currentPage++;
        filterPosts();
    });

    filterPosts();
});


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
});
