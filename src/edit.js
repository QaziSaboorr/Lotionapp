import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function NoteEditor({
  activeNote,
  onUpdateNote,
  onPreviewNote,
  onDeleteNote,
  sidebarOpen,
}) {
  const navigate = useNavigate();
  const [setLastModified] = useState(
    activeNote ? activeNote.lastModified : null
  );

  const noteBody = activeNote.body || "";

  const handlePreviewClick = () => {
    onPreviewNote(activeNote.id);
    navigate(`/notes/${activeNote.id}`);
  };

  const onEditField = (field, value) => {
    if (field === "lastModified") {
      setLastModified(value);
    }
    onUpdateNote({
      ...activeNote,
      [field]: value,
      lastModified:
        field === "lastModified" ? activeNote.lastModified : Date.now(),
    });
  };

  const handleDeleteNote = () => {
    navigate(`/notes/${onDeleteNote(activeNote.id)}/edit`);
  };

  const defaultTitle = activeNote ? activeNote.title : "";
  const defaultBody = activeNote ? activeNote.body : null;

  if (!activeNote) return <div className="no-active-note">No Note made</div>;
  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <div className="note-header">
          <input
            className="header-input"
            id="title"
            placeholder="Note Title"
            value={defaultTitle}
            onChange={(e) => onEditField("title", e.target.value)}
            autoFocus
          />
          <div className="editor-toolbar">
            <button className="tools-edit" onClick={handlePreviewClick}>
              Save Note
            </button>
          </div>
          <div className="editor-toolbar">
            <button className="tools-edit" onClick={handleDeleteNote}>
              Delete Note
            </button>
          </div>
        </div>

        <input
          className="timestamp"
          type="text"
          readOnly
          value={
            activeNote &&
            new Date(activeNote.lastModified)
              .toLocaleDateString("en-GB", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
                hourCycle: "h24",
              })
              .toLocaleUpperCase()
          }
        />
        <div style={{ height: "700px" }}>
          <div style={{ height: "100%", overflowY: "auto" }}>
            <ReactQuill
              value={noteBody || defaultBody}
              onChange={(value) => onEditField("body", value)}
              placeholder={"Write your note here..."}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteEditor;
