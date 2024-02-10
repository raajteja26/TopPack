import React, { useState } from 'react';
import "./Form.css"

function App() {
  const [keyword, setKeyword] = useState('');
  const [repositories, setRepositories] = useState([]);
  
  const handleChange = (event) => {
    setKeyword(event.target.value);
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://api.github.com/search/repositories?q=${keyword}`);
      const data = await response.json();
      setRepositories(data.items);
    } catch (error) {
      console.error('Error fetching repositories:', error);
    }
  }
  
  const handleImport = (url) => {
    // Implement your import logic here
    console.log('Importing repository:', url);
  }
  
  return (
    <div className="App">
      <h1>Github Repository Search</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Enter keyword"
          value={keyword} 
          onChange={handleChange} 
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {repositories.map(repo => (
          <li key={repo.id}>
            <h3>{repo.full_name}</h3>
            <p>Stars: {repo.stargazers_count}</p>
            <p>Forks: {repo.forks_count}</p>
            <button onClick={() => handleImport(repo.html_url)}>Import</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
