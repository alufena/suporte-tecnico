import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTicket, reset, closeTicket } from '../features/tickets/ticketSlice';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import NoteItem from '../components/NoteItem';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getNotes, reset as notesReset } from '../features/notes/noteSlice';
import Modal from 'react-modal';
import { FaPlus } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
};

Modal.setAppElement('#root'); // o app element é "root" porque virá do index html e será montado na raiz

function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState('');
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  );
  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
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
    dispatch(getNotes(ticketId));
    // eslint-disable-next-line
  }, [isError, message, ticketId]);
  const onTicketClose = () => {
    // event handler de fechar um ticket
    dispatch(closeTicket(ticketId));
    toast.success('Ticket fechado');
    navigate('/tickets');
  };
  const onNoteSubmit = (e) => {
    e.preventDefault();
    console.log('Enviado');
    closeModal();
  };
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  if (isLoading || notesIsLoading) {
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
        <>
          <h2>Observações</h2>
          <button className="btn" onClick={openModal}>
            <FaPlus />
            Adicionar
          </button>
        </>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Criar observação"
      >
        <h2>Haveria algo mais a ser descrito?</h2>
        <button className="btn-close" onClick={closeModal}>
          <FaTimes />
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="notetext"
              id="notetext"
              className="form-control"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Enviar
            </button>
          </div>
        </form>
      </Modal>
      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}
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
