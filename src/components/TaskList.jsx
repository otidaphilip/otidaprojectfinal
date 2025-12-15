import { useState } from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onDelete, onEdit, onToggle }) {

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6; // change this if you want

  // Calculate total pages
  const totalPages = Math.ceil(tasks.length / ITEMS_PER_PAGE);

  // Get tasks for current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTasks = tasks.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  function nextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  function prevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  return (
    <div className="task-list">

      {tasks.length === 0 && <p>No tasks yet.</p>}

      {paginatedTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggle={onToggle}
        />
      ))}

      {/* Pagination Buttons */}
      {tasks.length > 0 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={prevPage}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={nextPage}
          >
            Next
          </button>
        </div>
      )}

    </div>
  );
}
