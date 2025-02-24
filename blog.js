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
        }
    ];

    const blogPostsContainer = document.getElementById("blog-posts");
    const searchInput = document.getElementById("search-input");
    const categoryLinks = document.querySelectorAll("#categories a");

    function displayPosts(posts) {
        blogPostsContainer.innerHTML = "";
        posts.forEach(post => {
            const postElement = document.createElement("article");
            postElement.innerHTML = `
                <h2><a href="${post.link}">${post.title}</a></h2>
                <p><small>${post.date}</small></p>
                <p>${post.summary}</p>
            `;
            blogPostsContainer.appendChild(postElement);
        });
    }

    function filterPosts() {
        const query = searchInput.value.toLowerCase();
        const selectedCategory = document.querySelector("#categories a.active")?.dataset.category || "all";
        const filteredPosts = blogPosts.filter(post => {
            const matchesQuery = post.title.toLowerCase().includes(query) || post.summary.toLowerCase().includes(query);
            const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
            return matchesQuery && matchesCategory;
        });
        displayPosts(filteredPosts);
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

    displayPosts(blogPosts);
});
