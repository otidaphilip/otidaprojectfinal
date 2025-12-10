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

// import { useState, useEffect } from "react";

// export default function TaskList() {

//   // Load from localStorage
//   const [tasks, setTasks] = useState(() => {
//     const saved = localStorage.getItem("tasks");
//     return saved ? JSON.parse(saved) : [];
//   });

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   const [readingId, setReadingId] = useState(null);
//   const [editId, setEditId] = useState(null);
//   const [editTitle, setEditTitle] = useState("");
//   const [editText, setEditText] = useState("");

//   // Save to localStorage
//   useEffect(() => {
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//   }, [tasks]);

//   // Add new task
//   function addTask() {
//     if (!title.trim() || !description.trim()) return;

//     const items = description.split("\n").map(text => ({
//       text,
//       done: false
//     }));

//     setTasks([...tasks, { id: Date.now(), title, items }]);
//     setTitle("");
//     setDescription("");
//   }

//   // Delete
//   function deleteTask(id) {
//     setTasks(tasks.filter(task => task.id !== id));
//   }

//   // Edit
//   function startEdit(task) {
//     setEditId(task.id);
//     setEditTitle(task.title);
//     setEditText(task.items.map(i => i.text).join("\n"));
//     setReadingId(null);
//   }

//   function saveEdit(id) {
//     setTasks(tasks.map(task => {
//       if (task.id !== id) return task;

//       const updatedItems = editText.split("\n").map((text, index) => ({
//         text,
//         done: task.items[index]?.done || false
//       }));

//       return { ...task, title: editTitle, items: updatedItems };
//     }));

//     setEditId(null);
//   }

//   // Toggle checkbox
//   function toggleItem(taskId, index) {
//     setTasks(tasks.map(task => {
//       if (task.id !== taskId) return task;

//       const updated = [...task.items];
//       updated[index].done = !updated[index].done;

//       return { ...task, items: updated };
//     }));
//   }

//   return (
//     <div className="task-list">

//       {/* Add Task Section */}
//       <input
//         className="input"
//         placeholder="Task title"
//         value={title}
//         onChange={e => setTitle(e.target.value)}
//       />

//       <textarea
//         className="textarea"
//         placeholder="One checklist item per line"
//         value={description}
//         onChange={e => setDescription(e.target.value)}
//       />

//       <button className="btn-add" onClick={addTask}>Add Task</button>

//       {tasks.length === 0 && <p>No tasks yet.</p>}

//       {tasks.map(task => {
//         const completed =
//           task.items.length > 0 && task.items.every(i => i.done);

//         return (
//           <div key={task.id} className={`task-card ${completed ? "done" : ""}`}>

//             {/* EDIT MODE */}
//             {editId === task.id ? (
//               <div className="edit-box">
//                 <h3>Edit Task</h3>

//                 <div className="horizontal-edit">
//                   <input
//                     className="edit-input"
//                     value={editTitle}
//                     onChange={e => setEditTitle(e.target.value)}
//                   />

//                   <textarea
//                     className="edit-textarea"
//                     value={editText}
//                     onChange={e => setEditText(e.target.value)}
//                   />

//                   <div className="edit-actions">
//                     <button className="btn-save" onClick={() => saveEdit(task.id)}>Save</button>
//                     <button className="btn-cancel" onClick={() => setEditId(null)}>Cancel</button>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <>
//                 {/* TITLE */}
//                 <h3>
//                   {task.title}
//                   {completed && <span className="badge">Completed</span>}
//                 </h3>

//                 {/* BUTTONS */}
//                 <div className="btn-group">
//                   <button onClick={() => setReadingId(readingId === task.id ? null : task.id)}>
//                     {readingId === task.id ? "Hide" : "Read"}
//                   </button>
//                   <button onClick={() => startEdit(task)}>Edit</button>
//                   <button onClick={() => deleteTask(task.id)}>Delete</button>
//                 </div>

//                 {/* CHECKLIST */}
//                 {readingId === task.id && (
//                   <div className="checklist">
//                     {task.items.map((item, index) => (
//                       <div key={index}>
//                         <label>
//                           <input
//                             type="checkbox"
//                             checked={item.done}
//                             onChange={() => toggleItem(task.id, index)}
//                           />
//                           <span className={item.done ? "strike" : ""}>{item.text}</span>
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </>
//             )}

//           </div>
//         );
//       })}
//     </div>
//   );
// }
