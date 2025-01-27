import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [data, setData] = useState(null);

  useEffect(()=>{
    axios.get('http://localhost:5000/api/data')
      .then(response => {
        setData(response.data.message);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <header>
        <h1>TESTE</h1>
        <p>{data ? data : 'Loading...'}</p>
      </header>
    </div>
  )
}

export default App
