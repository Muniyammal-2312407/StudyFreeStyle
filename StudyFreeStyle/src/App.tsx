import { useState } from "react";

interface Task {
  subject: string;
  text: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState("");
  const [subject, setSubject] = useState("");

  const addTask = () => {
    if (task.trim() && subject.trim()) {
      setTasks([...tasks, { subject, text: task, completed: false }]);
      setTask("");
      setSubject("");
    }
  };

  const toggleTask = (index: number) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const deleteTask = (index: number) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>📚 Study Planner</h1>

      <input
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Enter subject"
        style={{ marginRight: "10px" }}
      />
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter study task"
        style={{ marginRight: "10px" }}
      />
      <button onClick={addTask}>Add Task</button>

      <h2>My Tasks</h2>
      <ul>
        {tasks.map((t, i) => (
          <li key={i} style={{ marginBottom: "10px" }}>
            <b>{t.subject}:</b>{" "}
            <span
              onClick={() => toggleTask(i)}
              style={{
                cursor: "pointer",
                textDecoration: t.completed ? "line-through" : "none"
              }}
            >
              {t.text}
            </span>
            <button
              onClick={() => deleteTask(i)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>

      <h3>
        Progress:{" "}
        {tasks.length
          ? `${tasks.filter((t) => t.completed).length}/${tasks.length}`
          : "No tasks yet"}
      </h3>
    </div>
  );
}

export default App;
