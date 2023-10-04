const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use('/css', express.static(path.join(__dirname, 'views', 'css')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/search', async (req, res) => {
    const query = req.query.q;

    // check if the query is empty
    if (!query || !query.trim()) {
        return res.redirect('/');
    }

    // search main
    try {
        const response = await axios.get(`https://ddg-api.herokuapp.com/search?query=${query}&limit=30`);
        const results = response.data;
        res.render('results', { query: query, results: results });
    } catch (error) {
        console.error("Error fetching search results:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.listen(PORT, () => {
    console.log(`Cortex Search Engine has started on http://localhost:${PORT}`);
});