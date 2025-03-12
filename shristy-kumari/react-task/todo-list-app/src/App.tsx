import React, { useState } from "react";
import "./App.css";

interface Subtask {
  text: string;
  completed: boolean;
}

interface Task {
  id: string;
  text: string;
  subtasks: Subtask[];
  completed: boolean;
}

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState<string>("");
  const [subtaskInputs, setSubtaskInputs] = useState<{ [key: string]: string }>({});
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editedTaskText, setEditedTaskText] = useState<string>("");
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const addTask = () => {
    if (taskInput.trim() === "") return;
    setTasks([...tasks, { id: Date.now().toString(), text: taskInput, subtasks: [], completed: false }]);
    setTaskInput("");
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleSubtaskInputChange = (taskId: string, value: string) => {
    setSubtaskInputs({ ...subtaskInputs, [taskId]: value });
  };

  const addSubtask = (taskId: string) => {
    if (!subtaskInputs[taskId] || subtaskInputs[taskId].trim() === "") return;
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, subtasks: [...task.subtasks, { text: subtaskInputs[taskId], completed: false }] }
          : task
      )
    );
    setSubtaskInputs({ ...subtaskInputs, [taskId]: "" });
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const startEditing = (taskId: string, text: string) => {
    setEditingTaskId(taskId);
    setEditedTaskText(text);
  };

  const saveEditedTask = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, text: editedTaskText } : task
      )
    );
    setEditingTaskId(null);
  };

  // Drag and Drop Handlers
  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (targetTask: Task) => {
    if (!draggedTask || draggedTask.id === targetTask.id) return;

    const reorderedTasks = tasks.filter((task) => task.id !== draggedTask.id);
    const targetIndex = reorderedTasks.findIndex((task) => task.id === targetTask.id);
    reorderedTasks.splice(targetIndex, 0, draggedTask);

    setTasks(reorderedTasks);
    setDraggedTask(null);
  };

  return (
    <div className="app-container">
      <div className="todo-container">
        <h2 className="title">To-Do List</h2>
        <div className="task-input">
          <input
            type="text"
            placeholder="Add a new task..."
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <button className="add-btn" onClick={addTask}>Add</button>
          <button className="clear-btn" onClick={() => setTasks([])}>Clear All</button>
        </div>
        <div className="task-list">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task.id}
                className="task"
                draggable
                onDragStart={() => handleDragStart(task)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(task)}
              >
                <div className="task-header">
                  <input 
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                  />
                  {editingTaskId === task.id ? (
                    <input
                      type="text"
                      className="edit-task-input"
                      value={editedTaskText}
                      onChange={(e) => setEditedTaskText(e.target.value)}
                    />
                  ) : (
                    <span className={`task-text ${task.completed ? "completed" : ""}`}>
                      {task.text}
                    </span>
                  )}
                  {editingTaskId === task.id ? (
                    <button className="save-btn" onClick={() => saveEditedTask(task.id)}>Save</button>
                  ) : (
                    <button className="edit-btn" onClick={() => startEditing(task.id, task.text)}>Edit</button>
                  )}
                  <button className="delete-btn" onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
                <div className="subtask-input">
                  <input
                    type="text"
                    placeholder="Add a subtask..."
                    value={subtaskInputs[task.id] || ""}
                    onChange={(e) => handleSubtaskInputChange(task.id, e.target.value)}
                  />
                  <button className="add-subtask-btn" onClick={() => addSubtask(task.id)}>
                    + Add Subtask
                  </button>
                </div>
                {task.subtasks.length > 0 && (
                  <ul className="subtask-list">
                    {task.subtasks.map((subtask, subIndex) => (
                      <li key={subIndex} className="subtask">
                        <span className={`subtask-text ${subtask.completed ? "completed" : ""}`}>{subtask.text}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          ) : (
            <p className="no-tasks">No tasks available. Add a new task!</p>
          )}
        </div>
      </div>
    </div>
  );
}
