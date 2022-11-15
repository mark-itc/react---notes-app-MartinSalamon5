import "./App.css";
import { useState } from "react";
import Modal from "react-modal";

function NoteBox(props) {
  const { date, noteText, myKey, deleteNote, noteTitle, openModal } = props;
  return (
    <div className="note-box-wrapper">
      <button
        className="delete-button"
        onClick={() => {
          deleteNote(myKey);
        }}
      >
        x
      </button>
      <div
        className="note-box"
        onClick={() => {
          openModal(date, noteTitle, noteText);
        }}
      >
        <p className="note-date">{date}</p>
        <h5>{noteTitle}</h5>
        <p>{noteText}</p>
      </div>
    </div>
  );
}

function NoteCreatorForm({ addNote }) {
  const submitNote = (e) => {
    e.preventDefault();
    addNote("Note Title");
  };
  return (
    <form className="note-creator-form">
      <div className="inputs-box">
        <input className="title-input" placeholder="Title..."></input>
        <textarea
          className="note-input-area"
          type="text"
          placeholder="Type your Note here..."
        ></textarea>
      </div>
      <button onClick={submitNote} type="submit" className="note-submit-button">
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

  function openModal(date, noteTitle, noteText) {
    setIsOpen(true);
    setModalDate(date);
    setModalTitle(noteTitle);
    setModalText(noteText);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const [dates, createDate] = useState([]);
  const addNote = () => {
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
  };
  const removeNote = (myKey) => {
    const deletePopUp = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (deletePopUp == true) {
      const dateDuplicate = [...dates];
      dateDuplicate.splice(myKey, 1);
      createDate(dateDuplicate);
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
        <p>{modalDate}</p>
        <h2>{modalTitle}</h2>
        <p>{modalText}</p>
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
              noteTitle={"Note Title"}
              noteText={"Example Note"}
              openModal={openModal}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
