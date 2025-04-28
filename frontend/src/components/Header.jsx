import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Suporte Técnico</Link>
      </div>
      {/* o que é visto na navbar é diferente se o usuário está logado ou não */}
      <ul>
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
      </ul>
    </header>
  );
}

export default Header;
