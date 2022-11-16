import "./App.css";
import { useState } from "react";
import Modal from "react-modal";

function NoteBox(props) {
  const { date, noteText, myKey, deleteNote, noteTitle, openModal } = props;
  return (
    <div className="note-box-wrapper">
      <div className="note-box-header">
        <p className="note-date">{date}</p>

        <button
          className="delete-button"
          onClick={() => {
            deleteNote(myKey);
          }}
        >
          x
        </button>
      </div>
      <div
        className="note-box"
        onClick={() => {
          openModal(date, noteTitle, noteText);
        }}
      >
        <h3 className="note-box-title">{noteTitle}</h3>
        <p className="note-box-text-content">{noteText}</p>
      </div>
    </div>
  );
}

function NoteCreatorForm({ addNote }) {
  const [title, setTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  const clearAllInputFields = () => {
    setTitle("");
    setNoteContent("");
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleNoteContent = (e) => {
    setNoteContent(e.target.value);
  };
  const submitNote = (e) => {
    e.preventDefault();
    if (noteContent != "") {
      addNote(title, noteContent);
      clearAllInputFields();
    }
  };
  return (
    <form className="note-creator-form">
      <div className="inputs-box">
        <input
          className="title-input"
          placeholder="Title..."
          onChange={handleTitle}
          value={title}
        ></input>
        <textarea
          className="note-input-area"
          type="text"
          placeholder="Type your note here..."
          onChange={handleNoteContent}
          value={noteContent}
        ></textarea>
      </div>
      <button
        onClick={(title, noteContent) => {
          submitNote(title, noteContent);
        }}
        type="submit"
        className="note-submit-button"
      >
        +
      </button>
    </form>
  );
}

Modal.setAppElement("#root");

function App() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalDate, setModalDate] = useState();
  const [modalTitle, setModalTitle] = useState();
  const [modalText, setModalText] = useState();
  const [dates, createDate] = useState([]);
  const [titles, setTitle] = useState([]);
  const [noteContents, setNoteContent] = useState([]);

  function openModal(date, noteTitle, noteText) {
    setIsOpen(true);
    setModalDate(date);
    setModalTitle(noteTitle);
    setModalText(noteText);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const addNote = (title, noteContent) => {
    const dateCreator = new Date();
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    const newDate = dateCreator.toLocaleDateString(undefined, options);
    createDate([...dates, newDate]);
    const newTitle = title;
    setTitle([...titles, newTitle]);
    const newContent = noteContent;
    setNoteContent([...noteContents, newContent]);
  };
  const removeNote = (myKey) => {
    const deletePopUp = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (deletePopUp == true) {
      const dateDuplicate = [...dates];
      const titlesDuplicate = [...titles];
      const noteContentsDuplicate = [...noteContents];
      dateDuplicate.splice(myKey, 1);
      titlesDuplicate.splice(myKey, 1);
      noteContentsDuplicate.splice(myKey, 1);
      createDate(dateDuplicate);
      setTitle(titlesDuplicate);
      setNoteContent(noteContentsDuplicate);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Notes App</h1>
      </header>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal">
        <button className="modal-close-button" onClick={closeModal}>
          x
        </button>
        <p className="modal-date">{modalDate}</p>
        <h2 className="modal-title">{modalTitle}</h2>
        <p className="modal-text-content">{modalText}</p>
        <button className="modal-edit-button">Edit note</button>
      </Modal>

      <NoteCreatorForm addNote={addNote} />
      <div className="note-grid-box">
        {dates.map((date, key) => {
          return (
            <NoteBox
              date={date}
              key={key}
              myKey={key}
              deleteNote={removeNote}
              noteTitle={titles[key]}
              noteText={noteContents[key]}
              openModal={openModal}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
