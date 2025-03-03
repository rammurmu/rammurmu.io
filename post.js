document.addEventListener("DOMContentLoaded", function() {
    const blogPostContainer = document.getElementById("blog-post");

    function getPostSlug() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("slug");
    }

    function fetchPost() {
        const slug = getPostSlug();
        if (!slug) {
            blogPostContainer.innerHTML = "<p>Post not found.</p>";
            return;
        }

        fetch(`/api/posts/${slug}`)
            .then(response => response.json())
            .then(post => {
                blogPostContainer.innerHTML = `
                    <h1 class="text-3xl font-bold mb-4">${post.title}</h1>
                    <p class="text-gray-600 mb-4"><small>${post.date}</small></p>
                    <div class="post-content">${post.content}</div>
                `;
            })
            .catch(error => {
                console.error('Error fetching post:', error);
                blogPostContainer.innerHTML = "<p>Failed to load post content.</p>";
            });
    }

    fetchPost();
});
