import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Compare from './components/Compare';
import About from './components/About';
import SignInSignUp from './components/SignInSignUp'; 

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/about" element={<About />} />
            <Route path="/signin" element={<SignInSignUp />} /> 
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
