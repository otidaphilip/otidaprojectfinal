import { useState } from "react";

export default function TaskEditor({ task, onEdit, onClose }) {

  const [title, setTitle] = useState(task.title);
  const [text, setText] = useState(task.items.map(i => i.text).join("\n"));

  function save() {
    onEdit(task.id, title, text);
    onClose();
  }

  return (
    <div className="edit-box">
      <h3>Edit Task</h3>

      <div className="horizontal-edit">
        <input
          className="edit-input"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          className="edit-textarea"
          value={text}
          onChange={e => setText(e.target.value)}
        />

        <div className="edit-actions">
          <button className="btn-save" onClick={save}>Save</button>
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
