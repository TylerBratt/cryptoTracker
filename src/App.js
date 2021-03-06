import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Coin from './components/Coin';
import Alert from './components/Alert'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/coins/:id" element={<Coin />} />
        </Routes>
      </div>
      <Alert />
    </Router>
  );
}

export default App;
