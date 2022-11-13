import "./NoteCreatorForm.css";
import "./NoteList";

function NoteCreatorForm({ addNote }) {
  const submitNote = (e) => {
    e.preventDefault();
    addNote();
  };
  return (
    <form className="note-creator-form">
      <textarea
        className="note-input-area"
        type="text"
        placeholder="Type your Note here..."
      ></textarea>
      <button onClick={submitNote} type="submit" className="note-submit-button">
        +
      </button>
    </form>
  );
}

export default NoteCreatorForm;
