import { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'; // hook "useSelector" permite seleções do global state. "useDispatch" permite enviar ações
import { register, reset } from '../features/auth/authSlice'; // reset é um reducer que redefine os valores dos states para o padrão
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '', // senha de confirmação do formulário
  });
  const { name, email, password, password2 } = formData; // desestruturação
  const dispatch = useDispatch(); // irá despachar "register" e outras funções
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    // traz pedaços do global state em um componente através do hook "useSelector"
    (state) => state.auth
  );
  useEffect(() => {
    // traz todos pedaços de state
    if (isError) {
      toast.error(message); // "mesage" será definida no redux através do hook "useSelector"
    }
    if (isSuccess || user) {
      // se sucesso e "user" preenchido
      navigate('/'); // redireciona para página inicial
    }
    dispatch(reset()); // reseta para padrão
  }, [isError, isSuccess, user, message, navigate, dispatch]);
  const onChange = (e) => {
    // parâmetro evento
    setFormData((prevState) => ({
      // o nome recém-criado atualizará o valor de "name" em "formData" pelo valor escrito no form
      ...prevState, // todos os campos passados
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error('Senha não coincide');
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData)); // envia o register de "authSlice.js"
    }
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Cadastramento {/* {user} */}
        </h1>
        <p>Crie uma conta</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Digite seu nome"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Digite seu e-mail"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Digite sua senha"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
              placeholder="Confirme sua senha"
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Enviar</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
