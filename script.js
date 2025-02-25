document.addEventListener("DOMContentLoaded", function() {
    // Toggle the navigation menu for mobile view
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    menuToggle.addEventListener("click", function() {
        menu.classList.toggle("open");
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
