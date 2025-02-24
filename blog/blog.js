document.addEventListener("DOMContentLoaded", function() {
    const blogPosts = [
        {
            title: "My First Blog Post",
            date: "2025-02-20",
            summary: "This is the summary of my first blog post.",
            link: "blog/my-first-blog-post.html"
        },
        {
            title: "Another Interesting Post",
            date: "2025-02-22",
            summary: "This is the summary of another interesting post.",
            link: "blog/another-interesting-post.html"
        }
    ];

    const blogPostsContainer = document.getElementById("blog-posts");

    blogPosts.forEach(post => {
        const postElement = document.createElement("article");
        postElement.innerHTML = `
            <h2><a href="${post.link}">${post.title}</a></h2>
            <p><small>${post.date}</small></p>
            <p>${post.summary}</p>
        `;
        blogPostsContainer.appendChild(postElement);
    });
});
