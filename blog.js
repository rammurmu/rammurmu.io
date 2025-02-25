document.addEventListener("DOMContentLoaded", function() {
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
            postElement.classList.add("p-4", "border-b", "border-gray-300", "relative", "pl-6");
            postElement.innerHTML = `
                <h2 class="text-2xl font-bold mb-2"><a href="${post.link}" class="hover:underline">${post.title}</a></h2>
                <p class="text-gray-600 mb-2"><small>${post.date}</small></p>
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
