import { FaArrowCircleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BackButton = ({ url }) => {
  return (
    <Link className="btn btn-reverse btn-back" to={url}>
      <FaArrowCircleLeft />
      Voltar
    </Link>
  );
};

export default BackButton;
