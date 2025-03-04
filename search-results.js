document.addEventListener("DOMContentLoaded", function() {
    const searchParams = new URLSearchParams(window.location.search);
    const query = searchParams.get('q');
    const searchResultsContainer = document.getElementById('search-results');

    if (query) {
        document.getElementById('search-input').value = query;

        // Perform a search on the content
        performSearch(query);
    }

    function performSearch(query) {
        // This is a simple client-side search example. You can replace this with a server-side search if needed.
        const results = [];

        // Search blog posts
        const blogPosts = [
            { title: 'My First Blog Post', url: 'blog.html#post1', content: 'This is the content of my first blog post. It is about web development and programming.' },
            { title: 'Learning JavaScript', url: 'blog.html#post2', content: 'JavaScript is a versatile programming language used for web development.' },
            // Add more blog posts here
        ];

        blogPosts.forEach(post => {
            if (post.title.toLowerCase().includes(query) || post.content.toLowerCase().includes(query)) {
                results.push(post);
            }
        });

        // Search portfolio items
        const portfolioItems = [
            { title: 'Project 1', url: 'portfolio.html#project1', content: 'This is a description of project 1. It includes web development and design.' },
            { title: 'Project 2', url: 'portfolio.html#project2', content: 'This is a description of project 2. It includes mobile development and design.' },
            // Add more portfolio items here
        ];

        portfolioItems.forEach(item => {
            if (item.title.toLowerCase().includes(query) || item.content.toLowerCase().includes(query)) {
                results.push(item);
            }
        });

        // Display results
        searchResultsContainer.innerHTML = '';
        if (results.length > 0) {
            results.forEach(result => {
                const resultElement = document.createElement('div');
                resultElement.classList.add('search-result');
                resultElement.innerHTML = `
                    <h2 class="text-2xl font-bold"><a href="${result.url}" class="hover:underline">${result.title}</a></h2>
                    <p>${result.content}</p>
                `;
                searchResultsContainer.appendChild(resultElement);
            });
        } else {
            searchResultsContainer.innerHTML = '<p>No results found.</p>';
        }
    }
});
