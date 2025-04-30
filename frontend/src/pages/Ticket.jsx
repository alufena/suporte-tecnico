import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTicket, reset, closeTicket } from '../features/tickets/ticketSlice';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Ticket() {
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  );
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ticketId } = useParams(); // pega o ticket da url
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
    // eslint-disable-next-line
  }, [isError, message, ticketId]);
  const onTicketClose = () => {
    // event handler de fechar um ticket
    dispatch(closeTicket(ticketId));
    toast.success('Ticket fechado');
    navigate('/tickets');
  };
  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h3>Algo deu errado</h3>;
  }
  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2 style={{ marginBottom: '0px' }}>
          ID do ticket
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <p style={{ marginTop: '0px' }}>{ticket._id}</p>
        <h3 style={{ marginBottom: '0px' }}>Data enviada</h3>
        <p style={{ marginTop: '0px' }}>
          {new Date(ticket.createdAt).toLocaleString('pt-br')}
        </p>
        <h3 style={{ marginBottom: '0px' }}>Categoria</h3>
        <p style={{ marginTop: '0px' }}>{ticket.product}</p>
        <hr />
        <div className="ticket-desc">
          <h3>Descrição do problema </h3>
          <p>{ticket.description}</p>
        </div>
      </header>
      {ticket.status !== 'fechado' && (
        <button className="btn btn-block btn-danger" onClick={onTicketClose}>
          Encerrar ticket
        </button>
      )}
      {/* só exibe o botão caso o ticket não esteja fechado */}
    </div>
  );
}

export default Ticket;
