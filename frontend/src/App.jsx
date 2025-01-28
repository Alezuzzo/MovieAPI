import { useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const searchMovies = async () => {
    if(!query) {
      alert('Por favor, digite um nome de filme!');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/movies?query=${encodeURIComponent(query)}`);
      setMovies(response.data);
    } catch (error) {
      console.log('Erro:', error);
    }
  };

  return (
    <div className="App">
            <header className="App-header">
                <h1>Busca de Filmes</h1>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Digite o nome do filme"
                />
                <button onClick={searchMovies}>Buscar</button>
                <div className="movies">
                    {movies.map(movie => (
                        <div key={movie.id} className="movie">
                            <h2>{movie.title}</h2>
                            <img src={movie.poster_path} alt={movie.title} />
                            <p><strong>Média de Votos:</strong> {movie.vote_average}</p>
                            <p><strong>Descrição:</strong> {movie.overview}</p>
                            <p><strong>Quantidade de Votos:</strong> {movie.vote_count}</p>
                        </div>
                    ))}
                </div>
            </header>
        </div>
  );
}

export default App;
