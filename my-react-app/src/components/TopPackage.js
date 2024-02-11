import React, { useState, useEffect } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Navbar"

function TopPackagesPage() {
  const [topPackages, setTopPackages] = useState([]);

  useEffect(() => {
    function fetchTopPackages() {
      try {
        axios('http://127.0.0.1:8000/api/top_packages/').then((resp)=>{
            setTopPackages(resp.data)
        })
      } catch (error) {
        console.error('Error fetching top packages:', error);
      }
    }

    fetchTopPackages();
  }, []);

  return (
    <div className="TopPackagesPage">
    <Navbar/>
      <h1>Top 10 Packages</h1>
      <ul>
        {topPackages.map((pkg, index) => (
          <li key={index}>
            <h3>{pkg.name}</h3>
            <p>Number of repositories: {pkg.count}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopPackagesPage;
