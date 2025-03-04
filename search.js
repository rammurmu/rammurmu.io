document.addEventListener("DOMContentLoaded", function() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const query = searchInput.value.trim().toLowerCase();

        if (query) {
            // Redirect to search results page with query as URL parameter
            window.location.href = `search.html?q=${encodeURIComponent(query)}`;
        }
    });
});
