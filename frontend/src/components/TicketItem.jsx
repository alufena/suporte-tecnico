import { Link } from 'react-router-dom';

function TicketItem({ ticket }) {
  return (
    <div className="ticket">
      <div>{new Date(ticket.createdAt).toLocaleString('pt-br')}</div>
      <div>{ticket.product}</div>
      {/* <div className={`status status-${ticket.status}`}>{ticket.status}</div> */}
      <div className="ticket-actions">
        <span className={`status status-${ticket.status}`}>
          {ticket.status}
        </span>
        <Link to={`/ticket/${ticket._id}`} className="btn btn-reverse btn-sm">
          Visualizar
        </Link>
      </div>
    </div>
  );
}

export default TicketItem;
