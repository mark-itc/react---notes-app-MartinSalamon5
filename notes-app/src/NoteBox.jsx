import "./NoteBox.css";

function NoteBox(props) {
  const { creationDate } = props;
  console.log("muieeee");
  return (
    <div className="note-box">
      <h4>{creationDate}</h4>
      <p>Example Note</p>
    </div>
  );
}

export default NoteBox;
