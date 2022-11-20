import "./App.css";
import { useState } from "react";
import Modal from "react-modal";
import NoteCreatorForm from "./Components/NoteCreatorForm";
import NoteBox from "./Components/NoteBox";

Modal.setAppElement("#root");

function App() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalDate, setModalDate] = useState();
  const [modalTitle, setModalTitle] = useState();
  const [modalText, setModalText] = useState();
  const [modalKey, setModalKey] = useState();
  const [dates, createDate] = useState([]);
  const [titles, setTitle] = useState([]);
  const [noteContents, setNoteContent] = useState([]);
  const [editDates, setEditDates] = useState([]);

  function openModal(date, noteTitle, noteText, myKey) {
    setIsOpen(true);
    setModalDate(date);
    setModalTitle(noteTitle);
    setModalText(noteText);
    setModalKey(myKey);
  }
  function closeModal() {
    if (editNote == true) {
      alert("Please save before exiting.");
    } else {
      setIsOpen(false);
      exitEditNoteHandler();
    }
  }

  const postNote = (title, noteContent) => {
    const dateCreator = new Date();
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    const newDate = dateCreator.toLocaleDateString(undefined, options);
    createDate([...dates, newDate]);
    setEditDates([...dates, newDate]);
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
      const datesAfterDelete = [...dates];
      const titlesAfterDelete = [...titles];
      const noteContentsAfterDelete = [...noteContents];
      datesAfterDelete.splice(myKey, 1);
      titlesAfterDelete.splice(myKey, 1);
      noteContentsAfterDelete.splice(myKey, 1);
      createDate(datesAfterDelete);
      setEditDates(datesAfterDelete);
      setTitle(titlesAfterDelete);
      setNoteContent(noteContentsAfterDelete);
    }
  };

  const [editNote, setEditNote] = useState(false);

  const exitEditNoteHandler = () => {
    setEditNote(false);
  };

  const editNoteHandler = () => {
    setEditNote(true);
  };

  const RenderModal = () => {
    const submitNoteEdit = (e) => {
      e.preventDefault();
      if (noteContents != "") {
        exitEditNoteHandler();
        const editedDateCreator = new Date();
        const options = {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        };
        const newEditedDate = editedDateCreator.toLocaleDateString(
          undefined,
          options
        );
        editDates.splice(modalKey, 1, newEditedDate);
      } else {
        alert(
          "Can't save a note without content. Please add some content before saving changes."
        );
      }
    };

    const titleEditChange = (e) => {
      const editedTitlesArr = [...titles];
      editedTitlesArr.splice(modalKey, 1, e.target.value);
      setTitle(editedTitlesArr);
      setModalTitle(editedTitlesArr[modalKey]);
    };

    const noteContentEditChange = (e) => {
      const editedContentArr = [...noteContents];
      editedContentArr.splice(modalKey, 1, e.target.value);
      setNoteContent(editedContentArr);
      setModalText(editedContentArr[modalKey]);
    };

    const diplayEditDateCondition = () => {
      if (editDates[modalKey] != modalDate) {
        return (
          <div className="edit-date">
            <b>Last edited: </b>
            {editDates[modalKey]}
          </div>
        );
      }
    };

    if (editNote == false) {
      return (
        <div>
          <button className="modal-close-button" onClick={closeModal}>
            x
          </button>
          <div className="modal-date">
            <h4 className="creation-date-title">Created on: </h4> {modalDate}
          </div>
          <h2 className="modal-title">{modalTitle}</h2>
          <p className="modal-text-content">{modalText}</p>
          <div className="modal-footer">
            <button className="modal-edit-button" onClick={editNoteHandler}>
              Edit note
            </button>
            {diplayEditDateCondition()}
          </div>
        </div>
      );
    } else if (editNote == true) {
      return (
        <div>
          <button className="modal-close-button" onClick={closeModal}>
            x
          </button>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="modal-edit-form"
          >
            <div>{modalDate}</div>
            <input
              onChange={titleEditChange}
              className="modal-edit-title"
              defaultValue={titles[modalKey]}
            ></input>
            <textarea
              onChange={noteContentEditChange}
              className="modal-edit-text"
              defaultValue={noteContents[modalKey]}
            ></textarea>
          </form>
          <div className="modal-footer">
            <button className="modal-edit-button" onClick={submitNoteEdit}>
              Save Changes
            </button>
            {diplayEditDateCondition()}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Notes App</h1>
      </header>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        modalKey={modalKey}
      >
        {RenderModal()}
      </Modal>
      <NoteCreatorForm postNote={postNote} />
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
