import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createTicket, reset } from '../features/tickets/ticketSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

function NewTicket() {
  const { user } = useSelector((state) => state.auth); // antes de pegar e setar o state, será pego o user do global state
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tickets
  );
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [product, setProduct] = useState('Suporte geral do Windows 10 ou 11');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      dispatch(reset());
      navigate('/new-ticket');
    }
  }, [dispatch, isError, isSuccess, navigate, message]);
  const onSubmit = (e) => {
    // "ticketService" conectado com "ticketSlice" permite trazer "createTicket", e, com isso, enviar através do form
    e.preventDefault();
    dispatch(createTicket({ product, description }));
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <BackButton url="/" />
      <section className="heading"></section>
      <h1>Crie um novo ticket</h1>
      <p>Preencha os campos abaixo</p>
      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Seu nome</label>
          <input type="text" className="form-control" value={name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="email">Seu e-mail</label>
          <input type="text" className="form-control" value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Categorias: </label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="Suporte geral do Windows 10 ou 11">
                Suporte geral do Windows 10 ou 11
              </option>
              <option value="Montagem e upgrade de desktop">
                Montagem e upgrade de desktop
              </option>
              <option value="Análise de telas azuis">
                Análise de telas azuis
              </option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Descrição do problema</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Enviar</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewTicket;
