import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';

function NoteItem({ note }) {
  const { user } = useSelector((state) => state.auth);
  const textareaRef = useRef(null);
  // Ajusta a altura da textarea automaticamente
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reseta a altura para recalcular
      textarea.style.height = `${textarea.scrollHeight}px`; // Define a altura com base no conteúdo
    }
  }, [note.text]); // Executa sempre que note.text mudar
  return (
    <div
      className="note"
      style={{
        backgroundColor: note.isStaff ? 'rgba(0,0,0,0.7' : '#fff',
        color: note.isStaff ? '#fff' : '#000',
      }}
    >
      <h4>
        Observações de{' '}
        {note.isStaff ? <span>suporte</span> : <span>{user.name}</span>}
        <textarea
          ref={textareaRef} // Agora textareaRef está definido
          className="note-textarea"
          value={note.text || ''} // Garante que não haja erro se note.text for undefined
          readOnly
          style={{
            resize: 'none',
            width: '100%',
            minHeight: '50px',
            height: 'auto',
            border: 'none',
            backgroundColor: 'transparent',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            padding: '0',
            color: 'inherit',
          }}
        />
        <div className="note-date">
          {new Date(note.createdAt).toLocaleString('pt-br')}
        </div>
      </h4>
    </div>
  );
}

export default NoteItem;
