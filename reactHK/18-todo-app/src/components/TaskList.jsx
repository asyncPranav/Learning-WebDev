import React from "react";
import TaskCard from "./TaskCard";

const TaskList = ({ todos, handleDone, handleDelete }) => {
  return (
    <div className="taskListContainer">
      {todos.map((todoObj, index) => {
        return (
          <TaskCard
            key={index}
            index={index}
            title={todoObj.todoTitle}
            status={todoObj.done}
            description={todoObj.todoDescription}
            handleDone={handleDone}
            handleDelete={handleDelete}
          />
        );
      })}
    </div>
  );
};

export default TaskList;
