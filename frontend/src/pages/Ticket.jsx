import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTicket, reset, closeTicket } from '../features/tickets/ticketSlice';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import NoteItem from '../components/NoteItem';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getNotes,
  createNote,
  reset as notesReset,
} from '../features/notes/noteSlice';
import Modal from 'react-modal';
import { FaPlus } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';

const customStyles = {
  content: {
    width: '90%', // Usa 90% da largura da tela
    maxWidth: '600px', // Limita a largura máxima a 600px em telas maiores
    maxHeight: '80vh', // Limita a altura máxima a 80% da altura da tela
    overflowY: 'auto', // Permite rolagem vertical se o conteúdo for muito longo
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '0', // Remove o marginRight que pode estar causando problemas
    transform: 'translate(-50%, -50%)',
    position: 'relative',
    padding: '20px', // Adiciona um padding para melhor aparência
    boxSizing: 'border-box', // Garante que o padding não aumente a largura
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
    // console.log('Enviado');
    dispatch(createNote({ noteText, ticketId }));
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
          <textarea
            className="ticket-desc"
            value={ticket.description || ''} // Garante que não haja erro se ticket.description for undefined
            readOnly
            style={{
              resize: 'none',
              width: '100%',
              minHeight: '100px',
              height: 'auto',
              border: 'none',
              backgroundColor: 'transparent',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              padding: '0',
            }}
          >
            {ticket.description}
          </textarea>
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
      {ticket.status !== 'fechado' && (
        <>
          {notes.map((note) => (
            <NoteItem key={note._id} note={note} />
          ))}
        </>
      )}
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
