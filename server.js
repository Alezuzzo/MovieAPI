const express = require('express');
const cors = require('cors');
const axios = require('axios');
const helmet = require('helmet');
const app = express();
const port = 5000;

const apiKey = 'APIKEY' //substituir pela api-key

// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:5173', //porta do frontend
}));

app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          fontSrc: ["'self'", "https://fonts.gstatic.com"],
          styleSrc: ["'self'", "https://fonts.googleapis.com"],
          // Adicione outras diretivas conforme necessário
        },
      },
    })
);

app.get('/api/movies', async (req, res) => {
    const movieQuery = req.query.query;
    if (!movieQuery) {
        return res.status(400).json({ error: 'O parâmetro query é obrigatório' });
    }

    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieQuery)}`;

    try {
        const response = await axios.get(apiUrl);
        const movies = response.data.results.map(movie => ({
            id: movie.id,
            title: movie.title,
            poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            vote_average: movie.vote_average,
            overview: movie.overview,
            vote_count: movie.vote_count
        }));

        const sortedMovies = movies.sort((a, b) => b.vote_average - a.vote_average);

        res.json(sortedMovies);
    } catch (error) {
        console.error('Erro ao buscar os dados da API:', error);
        res.status(500).json({ error: 'Erro ao buscar os dados da API' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});