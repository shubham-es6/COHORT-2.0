import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editDescription, setEditDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const { title, description } = e.target.elements;

    console.log(title.value, description.value);

    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        console.log(res.data);
        fetchData();
        title.value = "";
        description.value = "";
      });
  };

  const fetchData = () => {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotes(res.data.notes);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = () => {
    if (!editDescription.trim()) {
      alert("Description cannot be empty");
      return;
    }
    axios
      .patch(`http://localhost:3000/api/notes/${editId}`, {
        description: editDescription,
      })
      .then((res) => {
        fetchData();
        setEditId(null);
        setEditDescription("");
      });
  };

  const handleDeleteNote = (noteId) => {
    axios.delete("http://localhost:3000/api/notes/" + noteId).then((res) => {
      console.log(res.data);
      fetchData();
    });
  };

  return (
    <>
      <form className="note-create-form" onSubmit={handleSubmit}>
        <input name="title" type="text" placeholder="Enter title" />
        <input name="description" type="text" placeholder="Enter Description" />
        <button>Create Note</button>
      </form>

      {editId && (
        <div className="edit-form">
          <input
            type="text"
            value={editDescription}
            onChange={(e) => {
              setEditDescription(e.target.value);
            }}
          />
          <button onClick={handleUpdate}>Save</button>
        </div>
      )}

      <div className="notes">
        {notes.map((note) => {
          return (
            <div key={note._id} className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>

              <button
                onClick={() => {
                  handleDeleteNote(note._id);
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setEditId(note._id);
                  setEditDescription(note.description);
                }}
              >
                Edit
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
