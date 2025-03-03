document.addEventListener("DOMContentLoaded", function() {
    const blogPostsContainer = document.getElementById("blog-posts");
    const searchInput = document.getElementById("search-input");
    const categoryLinks = document.querySelectorAll("#categories a");
    const prevPageButton = document.getElementById("prev-page");
    const nextPageButton = document.getElementById("next-page");
    const pageInfo = document.getElementById("page-info");

    let allPosts = [];
    let filteredPosts = [];
    let currentPage = 1;
    const postsPerPage = 5;

    function fetchPosts() {
        fetch('/api/posts')
            .then(response => response.json())
            .then(posts => {
                allPosts = posts;
                filteredPosts = posts;
                displayPosts();
            })
            .catch(error => console.error('Error fetching posts:', error));
    }

    function displayPosts() {
        blogPostsContainer.innerHTML = "";
        const start = (currentPage - 1) * postsPerPage;
        const end = start + postsPerPage;
        const paginatedPosts = filteredPosts.slice(start, end);

        paginatedPosts.forEach(post => {
            const postElement = document.createElement("article");
            postElement.classList.add("p-4", "border-b", "border-gray-300", "relative", "pl-6");
            postElement.innerHTML = `
                <h2 class="text-2xl font-bold mb-2"><a href="post.html?slug=${post.slug}" class="hover:underline">${post.title}</a></h2>
                <p class="text-gray-600 mb-2"><small>${post.date}</small></p>
                <p>${post.category}</p>
            `;
            blogPostsContainer.appendChild(postElement);
        });

        updatePaginationControls();
    }

    function filterPosts() {
        const query = searchInput.value.toLowerCase();
        const selectedCategory = document.querySelector("#categories a.active").dataset.category;

        filteredPosts = allPosts.filter(post => {
            const matchesQuery = post.title.toLowerCase().includes(query) || post.content.toLowerCase().includes(query);
            const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
            return matchesQuery && matchesCategory;
        });

        currentPage = 1;
        displayPosts();
    }

    function updatePaginationControls() {
        const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
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

    prevPageButton.addEventListener("click", function() {
        if (currentPage > 1) {
            currentPage--;
            displayPosts();
        }
    });

    nextPageButton.addEventListener("click", function() {
        if (currentPage * postsPerPage < filteredPosts.length) {
            currentPage++;
            displayPosts();
        }
    });

    fetchPosts();
});
