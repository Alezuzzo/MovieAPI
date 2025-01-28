import { useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

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

  const getMovieDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/movie/${id}`);
      setSelectedMovie(response.data);
    } catch (error) {
      console.log('Erro:', error);
    }
  };

  return (
    <div className="App">
            <header className="App-header">
                <h1>Busca de Filmes</h1>
                <input
                    className='input-buscar'
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Digite o nome do filme"
                />
                <button className='button-buscar' onClick={searchMovies}>Buscar</button>
              </header>
              {selectedMovie && (
                <div className="movie-details">
                    <h2>{selectedMovie.title}</h2>
                    <p><strong>Contagem de Votos:</strong> {selectedMovie.vote_count}</p>
                    <p><strong>Descrição:</strong> {selectedMovie.overview}</p>
                    <button onClick={() => setSelectedMovie(null)}>Fechar</button>
                </div>
            )}
            <div className="movies">
                {movies.map(movie => (
                    <div key={movie.id} className="movie">
                        <img src={movie.poster_path} alt={movie.title} />
                        <h2>{movie.title}</h2>
                        <button onClick={() => getMovieDetails(movie.id)}>Ver Detalhes</button>
                    </div>
                ))}
            </div>
        </div>
  );
}

export default App;
