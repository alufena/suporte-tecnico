<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          {/* tem que estar acima da tag Routes porque Header não é um componente "Route" */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
      </Router>
    </>
=======
function App() {
  return (
    <div>
      My App
    </div>
>>>>>>> 7878055cd64d177ebc30ae3f5449135b24c2d67c
  );
}

export default App;
