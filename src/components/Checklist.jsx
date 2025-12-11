export default function Checklist({ task, onToggle }) {
    return (
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
    );
  }
  