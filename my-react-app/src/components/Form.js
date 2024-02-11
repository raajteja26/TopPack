import React, { useState,useEffect } from 'react';
import axios from 'axios'; 
import "./Form.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Navbar"

function App() {
  const [keyword, setKeyword] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [imported, setImported] = useState(false);
  const [repos, setRepos] = useState([])
  
  const handleChange = (event) => {
    setKeyword(event.target.value);
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`https://api.github.com/search/repositories?q=${keyword}`);
      setRepositories(response.data.items);
    } catch (error) {
      console.error('Error fetching repositories:', error);
    }
  }
  const getRepoName = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 2] + '/' + parts[parts.length - 1];
  }
  
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/repos/');
        const namesList = response.data.map((item)=> item.name)
        setRepos(namesList);
      } catch (error) {
        console.error('Error fetching repositories:', error);
      }
      setImported(false)
    };

    fetchRepos();
  }, [keyword,setRepositories,imported]);

  const handleImport = async (url) => {
    try {
      const response = await axios.get(`https://api.github.com/repos/${getRepoName(url)}/contents/package.json`);
  
      const packageJsonContent = atob(response.data.content);
      const packageJson = JSON.parse(packageJsonContent);
      const { dependencies, devDependencies } = packageJson;
      const allPackages = { ...dependencies, ...devDependencies };
      const packageList = Object.keys(allPackages);
  
      const savePackagesResponse = await axios.post('http://127.0.0.1:8000/api/save_packages/', { packageList });
  
      if (savePackagesResponse.status === 200) {
        const repoName = getRepoName(url);
        const addRepoResponse = await axios.post('http://127.0.0.1:8000/api/repos/add/', { name: repoName });
        console.log('Response from add_repo API:', addRepoResponse.data);
      }
      setImported(true);
    } catch (error) {
      alert("This project does not contain a package.json file.")
    }
  }
  
  return (
    <>
    <Navbar/>
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
            <button 
              onClick={repos.includes(repo.full_name) ? null :() => handleImport(repo.html_url)} 
              style={{ backgroundColor:  repos.includes(repo.full_name) ? "red" : "green" }}
              disabled={repos.includes(repo.full_name)}
            >
              {repos.includes(repo.full_name) ? "Imported" : "Import"}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
