import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/'); // está saindo pelo localstorage, mas precisa sair também do state. isso será feito em authSlice com um case próprio
  };
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Suporte Técnico</Link>
      </div>
      {/* o que é visto na navbar é diferente se o usuário está logado ou não */}
      <ul>
        {user ? (
          <li>
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt /> Sair
            </button>
          </li>
        ) : (
          <>
            {/* não pode ter dois elementos envoltados em um, por isso precisa de
            fragment. aqui será o else, ou seja, quando não tiver um usuário logado */}
            <li>
              <Link to="/login">
                <FaSignInAlt /> Entrar
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Cadastrar
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
