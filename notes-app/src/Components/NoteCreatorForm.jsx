import { useState } from "react";

function NoteCreatorForm({ postNote }) {
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
      postNote(title, noteContent);
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

export default NoteCreatorForm;
