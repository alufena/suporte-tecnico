import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa';

function Home() {
  return (
    <>
      <section className="heading">
        <h1>Bem-vindo, o que você precisa?</h1>
        <p>Escolha uma opção abaixo</p>
      </section>
      <Link to="/new-ticket" className="btn btn-reverse btn-block">
        <FaQuestionCircle />
        Crie um ticket novo
      </Link>
      <Link to="/tickets" className="btn btn-block">
        <FaTicketAlt />
        Acessar meus tickets
      </Link>
    </>
  );
}

export default Home;
