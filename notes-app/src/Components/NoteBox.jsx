// import { useState } from "react";

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
          openModal(date, noteTitle, noteText, myKey);
        }}
      >
        <h3 className="note-box-title">{noteTitle}</h3>
        <p className="note-box-text-content">{noteText}</p>
      </div>
    </div>
  );
}

export default NoteBox;
