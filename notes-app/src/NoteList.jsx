import "./NoteList.css";
import NoteBox from "./NoteBox";

function NoteList(props) {
  const { noteCreationDates } = props;
  console.log(noteCreationDates);
  return (
    <div className="note-grid-box">
      {noteCreationDates.map((date) => {
        return <NoteBox creationDate={date} />;
      })}
    </div>
  );
}

export default NoteList;
