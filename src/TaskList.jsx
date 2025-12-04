import { useState } from "react";

export default function TaskList({ tasks, onDelete, onEdit, onToggle }) {
  const [readingId, setReadingId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editText, setEditText] = useState("");

  function startEdit(task) {
    setEditId(task.id);
    setEditTitle(task.title);
    setEditText(task.items.map(i => i.text).join("\n"));
    setReadingId(null);
  }

  function saveEdit(id) {
    onEdit(id, editTitle, editText);
    setEditId(null);
  }

  return (
    <div className="task-list">

      {tasks.length === 0 && <p>No tasks yet.</p>}

      {tasks.map(task => {
        const completed =
          task.items.length > 0 &&
          task.items.every(i => i.done);

        return (
          <div key={task.id} className={`task-card ${completed ? "done" : ""}`}>

            {editId === task.id ? (

              <div className="edit-box">
                <h3>Edit Task</h3>

                <div className="horizontal-edit">

                  <input
                    className="edit-input"
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                  />

                  <textarea
                    className="edit-textarea"
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                  />

                  <div className="edit-actions">
                    <button className="btn-save" onClick={() => saveEdit(task.id)}>Save</button>
                    <button className="btn-cancel" onClick={() => setEditId(null)}>Cancel</button>
                  </div>

                </div>
              </div>

            ) : (

              <>
                <h3>
                  {task.title}
                  {completed && <span className="badge">Completed</span>}
                </h3>

                <div className="btn-group">
                  <button onClick={() => setReadingId(readingId === task.id ? null : task.id)}>
                    {readingId === task.id ? "Hide" : "Read"}
                  </button>
                  <button onClick={() => startEdit(task)}>Edit</button>
                  <button onClick={() => onDelete(task.id)}>Delete</button>
                </div>

                {readingId === task.id && (
                  <div className="checklist">
                    {task.items.map((item, index) => (
                      <div key={index}>
                        <label>
                          <input
                            type="checkbox"
                            checked={item.done}
                            onChange={() => onToggle(task.id, index)}
                          />
                          <span className={item.done ? "strike" : ""}>
                            {item.text}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
