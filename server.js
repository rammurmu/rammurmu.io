const express = require('express');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const marked = require('marked');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));

// API endpoint to get blog posts
app.get('/api/posts', (req, res) => {
    const postsDir = path.join(__dirname, 'posts');
    fs.readdir(postsDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read posts directory' });
        }

        const posts = files.map(file => {
            const filePath = path.join(postsDir, file);
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const { data } = matter(fileContent);
            return { ...data, slug: file.replace('.md', '') };
        });

        res.json(posts);
    });
});

// API endpoint to get a single blog post
app.get('/api/posts/:slug', (req, res) => {
    const postSlug = req.params.slug;
    const postPath = path.join(__dirname, 'posts', `${postSlug}.md`);

    fs.readFile(postPath, 'utf-8', (err, fileContent) => {
        if (err) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const { data, content } = matter(fileContent);
        res.json({ ...data, content: marked(content) });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
