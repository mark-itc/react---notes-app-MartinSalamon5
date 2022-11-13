import "./App.css";
import { useState } from "react";
import NoteCreatorForm from "./NoteCreatorForm";
import NoteList from "./NoteList";

function App() {
  const [dates, createDate] = useState([]);
  const addNote = () => {
    const dateCreator = new Date();
    const newDate = dateCreator.toString();
    createDate([...dates, newDate]);
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Notes App</h1>
      </header>
      <NoteCreatorForm addNote={addNote} />
      <NoteList noteCreationDates={dates} />
    </div>
  );
}

export default App;
