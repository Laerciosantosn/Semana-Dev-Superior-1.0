import React from 'react';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Home />
    </>
  );
};

export default App;
