import { Button, Input } from "antd";
import { Checkbox } from "antd";
import React, { useState } from "react";

const TodoList = () => {
  const [task, setTasks] = useState([]);
  const [newtask, setNewtasks] = useState("");

  const handleChange = (e) => {
    setNewtasks(e.target.value);
  };

  const handleTasks = (e) => {
    e.preventDefault();

    if (newtask.trim() !== "") {
      const newTaskObj = {
        id: Date.now(),
        text: newtask,
        isCompleted: false,
      };
      setTasks([...task, newTaskObj]);
      setNewtasks("");
    }
  };

  const handleToggle = (taskId) => {
    setTasks(
      task.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleDelete = (taskId) => {
    setTasks(task.filter((task) => task.id !== taskId));
  };

  return (
    <div className="container bg-slate-400 rounded h-screen max-w-lg mx-auto mt-4 flex justify-center flex-col">
      <h2 className="font-bold text-center text-2xl mt-2 mb-2 ">
        {" "}
        To-do Application{" "}
      </h2>
      <div className="flex flex-row justify-center gap-2 mb-4">
        <Input
          className="w-96"
          placeholder="Enter task"
          value={newtask}
          onChange={handleChange}
        />
        <Button
          className="bg-blue-400 font-medium"
          type="primary"
          onClick={handleTasks}
        >
          Add Task
        </Button>
      </div>

      <div className="h-full flex justify-center">
        {task.length === 0 ? (
          <p className="my-4">No tasks</p>
        ) : (
          <div className="w-96 flex mt-2">
            <ul>
              {task.map((task) => (
                <li
                  key={task.id}
                  className="mb-2 p-2 bg-slate-200 rounded border w-96 flex flex-row justify-between"
                >
                  <Checkbox
                    className={task.isCompleted ? "line-through" : ""}
                    onClick={() => {
                      handleToggle(task.id);
                    }}
                  >
                    <p className="text-lg font-semibold">{task.text}</p>
                  </Checkbox>
                  <Button
                    className="bg-blue-400 font-medium "
                    type="primary"
                    onClick={() => handleDelete(task.id)}
                    danger
                  >
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
