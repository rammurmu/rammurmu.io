document.addEventListener("DOMContentLoaded", function() {
    const commentForm = document.getElementById("comment-form");
    const commentsList = document.getElementById("comments-list");

    commentForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const name = document.getElementById("comment-name").value.trim();
        const text = document.getElementById("comment-text").value.trim();
        if (name && text) {
            const comment = document.createElement("div");
            comment.classList.add("comment", "p-4", "border", "border-gray-300", "rounded-lg", "mb-2");
           
