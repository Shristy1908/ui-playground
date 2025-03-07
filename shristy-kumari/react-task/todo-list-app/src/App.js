import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [subtaskInputs, setSubtaskInputs] = useState({});
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");
  const addTask = () => {
    if (taskInput.trim() === "") return;
    setTasks([...tasks, { id: Date.now().toString(), text: taskInput, subtasks: [], completed: false }]);
    setTaskInput("");
  };
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };
  const handleSubtaskInputChange = (taskId, value) => {
    setSubtaskInputs({ ...subtaskInputs, [taskId]: value });
  };
  const addSubtask = (taskId) => {
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
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const newTasks = [...tasks];
    const [movedItem] = newTasks.splice(result.source.index, 1);
    newTasks.splice(result.destination.index, 0, movedItem);
    setTasks(newTasks);
  };
  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };
  const toggleSubtaskCompletion = (taskId, subIndex) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.map((sub, i) =>
                i === subIndex ? { ...sub, completed: !sub.completed } : sub
              ),
            }
          : task
      )
    );
  };
  const startEditing = (taskId, text) => {
    setEditingTaskId(taskId);
    setEditedTaskText(text);
  };
  const saveEditedTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, text: editedTaskText } : task
      )
    );
    setEditingTaskId(null);
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
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppableTasks">
            {(provided) => (
              <div 
                className="task-list" 
                ref={provided.innerRef} 
                {...provided.droppableProps}
              >
                {tasks.length > 0 ? (
                  tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          className="task"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
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
                                  <input 
                                    type="checkbox"
                                    checked={subtask.completed}
                                    onChange={() => toggleSubtaskCompletion(task.id, subIndex)}
                                  />
                                  <span className={`subtask-text ${subtask.completed ? "completed" : ""}`}>
                                    {subtask.text}
                                  </span>
                                  <button
                                    className="delete-btn"
                                    onClick={() => {
                                      setTasks(
                                        tasks.map((t) =>
                                          t.id === task.id
                                            ? { ...t, subtasks: t.subtasks.filter((_, i) => i !== subIndex) }
                                            : t
                                        )
                                      );
                                    }}
                                  >
                                    Delete
                                  </button>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <p className="no-tasks">No tasks available. Add a new task!</p>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
