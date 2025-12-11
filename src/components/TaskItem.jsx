import { useState } from "react";
import TaskEditor from "./TaskEditor";
import Checklist from "./Checklist";

export default function TaskItem({ task, onDelete, onEdit, onToggle }) {

  const [readingId, setReadingId] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const completed =
    task.items.length > 0 &&
    task.items.every(i => i.done);

  return (
    <div className={`task-card ${completed ? "done" : ""}`}>

      {editMode ? (
        <TaskEditor
          task={task}
          onEdit={onEdit}
          onClose={() => setEditMode(false)}
        />
      ) : (
        <>
          <h3>
            {task.title}
            {completed && <span className="badge">Completed</span>}
          </h3>

          <div className="btn-group">
            <button onClick={() => setReadingId(readingId ? null : task.id)}>
              {readingId ? "Hide" : "Read"}
            </button>

            <button onClick={() => setEditMode(true)}>Edit</button>

            <button onClick={() => onDelete(task.id)}>Delete</button>
          </div>

          {readingId === task.id && (
            <Checklist
              task={task}
              onToggle={onToggle}
            />
          )}
        </>
      )}
    </div>
  );
}
