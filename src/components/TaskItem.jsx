import { useState } from "react";

export default function TaskItem({ task, onDelete, onEdit, onToggle }) {

  const [readingId, setReadingId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editText, setEditText] = useState("");

  // ✅ FORMAT DATE
  const formattedDate = task.createdAt
    ? new Date(task.createdAt).toLocaleDateString()
    : "No date";

  // ✅ NUMBER OF CHECKLIST ITEMS
  const taskCount = task.items.length;

  const completed =
    task.items.length > 0 &&
    task.items.every(i => i.done);

  function startEdit() {
    setEditId(task.id);
    setEditTitle(task.title);
    setEditText(task.items.map(i => i.text).join("\n"));
    setReadingId(null);
  }

  function saveEdit() {
    onEdit(task.id, editTitle, editText);
    setEditId(null);
  }

  return (
    <div className={`task-card ${completed ? "done" : ""}`}>

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
              <button className="btn-save" onClick={saveEdit}>Save</button>
              <button className="btn-cancel" onClick={() => setEditId(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>

      ) : (

        <>
          <h3>
            {task.title}
            {completed && <span className="badge">Completed</span>}
          </h3>

          {/* ✅ DATE & TASK COUNT */}
          <p className="task-meta">
            📅 {formattedDate} • 🔢 {taskCount} item{taskCount > 1 ? "s" : ""}
          </p>

          <div className="btn-group">
            <button onClick={() => setReadingId(readingId === task.id ? null : task.id)}>
              {readingId === task.id ? "Hide" : "Read"}
            </button>
            <button onClick={startEdit}>Edit</button>
            <button onClick={() => onDelete(task.id)}>Delete</button>
          </div>

          {readingId === task.id && (
            <div className="checklist">
              {task.items.map((item, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => onToggle(task.id, index)}
                  />
                  <span className={item.done ? "strike" : ""}>
                    {item.text}
                  </span>
                </label>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
