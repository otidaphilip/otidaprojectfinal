import { useState, useEffect } from "react";
import TaskList from "./TaskList";
import "./TaskApp.css";

export default function App() {

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
 
  function addTask() {
    if (!title.trim() || !description.trim()) return;

    const items = description.split("\n").map(text => ({
      text,
      done: false
    }));

    setTasks([...tasks, { id: Date.now(), title, items }]);
    setTitle("");
    setDescription("");
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function editTask(id, newTitle, newDesc) {
    setTasks(tasks.map(task => {
      if (task.id !== id) return task;
  
      const updatedText = newDesc.split("\n");
  
      const newItems = updatedText.map((text, index) => ({
        text,
        done: task.items[index]?.done || false  //Keep previous state
      }));
  
      return {
        ...task,
        title: newTitle,
        items: newItems
      };
    }));
  }
  
  function toggleItem(taskId, index) {
    setTasks(tasks.map(task => {
      if (task.id !== taskId) return task;
      const updated = [...task.items];
      updated[index].done = !updated[index].done;
      return { ...task, items: updated };
    }));
  }

  return (
    <div className="app-container">
      <h1>To-Do App</h1>

      <input
        className="input"
        placeholder="Task title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <textarea
        className="textarea"
        placeholder="One checklist item per line"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <button className="btn-add" onClick={addTask}>Add Task</button>

      <TaskList
        tasks={tasks}
        onDelete={deleteTask}
        onEdit={editTask}
        onToggle={toggleItem}
      />
    </div>
  );
}

// import TaskList from "./TaskList";
// import "./TaskApp.css";

// export default function App() {
//   return (
//     <div className="app-container">
//       <h1>To-Do App</h1>
//       <TaskList />
//     </div>
//   );
// }

