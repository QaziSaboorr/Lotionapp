import { useNavigate } from "react-router-dom";

function Sidebar({ notes, onAddNote, activeNote, setActiveNote }) {
  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);

  const navigate = useNavigate();

  const handleAddClick = () => {
    const newNoteId = onAddNote();
    setActiveNote(newNoteId);
    navigate(`/notes/${newNoteId}`);
  };

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>Your Notes</h1>
        <button onClick={handleAddClick}>+</button>
      </div>
      <div className="app-sidebar-notes">
        {sortedNotes.map(({ id, title, body, lastModified }, i) => (
          <div
            key={id} // Add a unique key prop
            className={`app-sidebar-note ${id === activeNote && "active"}`}
            onClick={() => {
              navigate(`/notes/${id}`);
              setActiveNote(id);
            }}
          >
            <div className="sidebar-note-title">
              <strong>{title}</strong>
            </div>
            <p>
              {body &&
                `${new DOMParser()
                  .parseFromString(body, "text/html")
                  .documentElement.innerText.substr(0, 25)}...`}
            </p>
            <small className="note-meta">
              Last Modified{" "}
              {new Date(lastModified).toLocaleDateString("en-US", {
                month: "numeric",
                day: "2-digit",
                year: "numeric",
              })}{" "}
              At{" "}
              {new Date(lastModified).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
