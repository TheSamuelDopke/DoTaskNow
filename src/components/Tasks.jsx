import {
  ChevronRightIcon,
  Trash,
  Filter,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useState } from "react";

function Tasks({
  tasks,
  onTaskClick,
  onDelClick,
  theme,
  themeColor,
  setPriorityOrder,
  setDateOrder,
  priorityOrder,
  dateOrder,
  activeFilter,
}) {
  const navigate = useNavigate();

  const [showFilters, setShowFilters] = useState(false);

  function onSeeDetailsClick(task) {
    const query = new URLSearchParams();
    query.set("title", task.title);
    query.set("description", task.description);
    query.set("createdAt", task.createdAt);
    query.set("theme", theme);
    query.set("themeColor", themeColor);

    navigate(`/task?${query.toString()}`);
  }

  function getPriorityColor(priority) {
    if (priority === "Low priority") {
      return "#68bb31";
    } else if (priority === "Moderate priority") {
      return "#FFA500";
    } else if (priority === "High priority!") {
      return "#FF0000";
    }

    return "#68bb31";
  }

  function getTaskStyle(task) {
    return {
      color: task.isCompleted ? "#6eb94b" : "white",
      textDecoration: task.isCompleted ? "line-through" : "none",
    };
  }

  return (
    <ul className="space-y-4 p-6 bg-[#F9FAFB] rounded-md shadow">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-[#579e28] font-bold text-center m-0">
          Your tasks:
        </h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="p-2 rounded-md"
        >
          <Filter />
        </button>
      </div>

      {showFilters && (
        <div className="flex space-x-2 justify-center align-middle mb-4">
          <p className="max-h-full flex items-center text-[#579e28] font-bold">
            Select by:
          </p>
          <button
            onClick={() => setPriorityOrder()}
            className={`border p-2 rounded-md ${
              activeFilter === "priority" ? "bg-green-400" : ""
            }`}
          >
            <div className="flex items-center">
              Priority{" "}
              {priorityOrder === "asc" ? (
                <ArrowUp size={16} />
              ) : (
                <ArrowDown size={16} />
              )}
            </div>
          </button>
          <button
            onClick={() => setDateOrder()}
            className={`border p-2 rounded ${
              activeFilter === "date" ? "bg-green-400" : ""
            }`}
          >
            <div className="flex items-center">
              Date{" "}
              {dateOrder === "asc" ? (
                <ArrowUp size={16} />
              ) : (
                <ArrowDown size={16} />
              )}
            </div>
          </button>
        </div>
      )}
      {tasks.map((task) => (
        // gap-2 no className abaixo fornece o espaçamento entre o button de icone e a task:
        <li key={task.id} className="flex gap-2">
          <button
            style={getTaskStyle(task)}
            onClick={() => {
              onTaskClick(task.id);
              getTaskStyle(task);
            }}
            className={
              "bg-[#334155] text-left w-full text-white p-2 rounded-md  flex items-center"
            }
          >
            <div
              className="w-3 h-3 rounded-full mr-1"
              style={{ backgroundColor: getPriorityColor(task.priority) }}
            ></div>
            {task.title}
          </button>
          <Button onClick={() => onSeeDetailsClick(task)}>
            {/* Usando Lucide Icons! */}
            <ChevronRightIcon></ChevronRightIcon>
          </Button>

          <Button onClick={() => onDelClick(task.id)}>
            <Trash></Trash>
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default Tasks;
