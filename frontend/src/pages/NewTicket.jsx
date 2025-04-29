import { useState } from 'react';
import { useSelector } from 'react-redux';

function NewTicket() {
  const { user } = useSelector((state) => state.auth); // antes de pegar e setar o state, será pego o user do global state
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [product, setProduct] = useState('Suporte geral do Windows 10 ou 11');
  const [description, setDescription] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
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
