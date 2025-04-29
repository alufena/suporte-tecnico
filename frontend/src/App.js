import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewTicket from './pages/NewTicket';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          {/* tem que estar acima da tag Routes porque Header não é um componente "Route" */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path='/new-ticket' element={<NewTicket />} /> */}
            <Route path="/new-ticket" element={<PrivateRoute />}> {/* nested route. "NewTicket" ficou uma rota privada, envoltada pela "PrivateRoute" e com a mesma URL para ambos */}
              <Route path="/new-ticket" element={<NewTicket />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />{' '}
      {/* permite uso do toast em qualquer canto do projeto */}
    </>
  );
}

export default App;
