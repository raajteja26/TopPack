import logo from './logo.svg';
import './App.css';
import Form from './components/Form';
import TopPackage from "./components/TopPackage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Form />} />
        <Route exact path="/packages" element={<TopPackage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
