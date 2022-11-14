import "./App.css";
import { useState } from "react";

function NoteBox(props) {
  const { date, myKey, deleteNote } = props;
  return (
    <div className="note-box">
      <h3>{date}</h3>
      <p>Example Note</p>
      <button
        onClick={() => {
          deleteNote(myKey);
        }}
      >
        x
      </button>
    </div>
  );
}

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

function App() {
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
      <NoteCreatorForm addNote={addNote} />
      <div className="note-grid-box">
        {dates.map((date, key) => {
          return (
            <NoteBox
              date={date}
              key={key}
              myKey={key}
              deleteNote={removeNote}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
