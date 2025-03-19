import { useState } from "react";
import { useEffect } from "react";
import Input from "./Input";

function AddTask({ onAddTask, updatePriorityAndColor }) {
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [range, setRange] = useState(1);

  const [priority, setPriority] = useState();

  const [textColor, setTextColor] = useState("#68bb31");

  useEffect(() => {
    if (range == 1) {
      setPriority("Low priority");
      setTextColor("#68bb31");
    } else if (range == 2) {
      setPriority("Moderate priority");
      setTextColor("#FFA500");
    } else if (range == 3) {
      setPriority("High priority!");
      setTextColor("#FF0000");
    }
    if (updatePriorityAndColor) {
      updatePriorityAndColor(priority, textColor);
    }
  }, [range, priority, textColor, updatePriorityAndColor]);

  return (
    <div className="space-y-4 p-6 bg-[#F9FAFB] rounded-md shadow flex flex-col">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        type="text"
      ></Input>
      <Input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task description"
        type="text"
      ></Input>
      <label htmlFor="" style={{ color: textColor, fontWeight: "bold" }}>
        Set task priority:
      </label>
      <input
        type="range"
        min="1"
        max="3"
        value={range}
        onChange={(e) => setRange(e.target.value)}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        style={{
          "--webkit-slider-thumb":
            "appearance: none; width: 20px; height: 20px; background: #8DDD62; border-radius: 50%; cursor: pointer;",
          "--moz-range-thumb":
            "width: 20px; height: 20px; background: #8DDD62; border-radius: 50%; cursor: pointer;",
        }}
      />
      <span
        className={`text-center font-bold flex items-center justify-center`}
        style={{ color: textColor }}
      >
        <div
          className="w-3 h-3 rounded-full mr-1"
          style={{ backgroundColor: textColor }}
        ></div>
        {priority}
      </span>
      <button
        onClick={() => {
          onAddTask(title, description, priority);
          if (title.length >= 1) {
            setTitle(""), setDescription(""), setRange(1);
          }
        }}
        className="bg-slate-700 text-white px-4 py-2 rounded-md font-medium hover:text-[#8EDB65]"
      >
        Add Task
      </button>
    </div>
  );
}

export default AddTask;
