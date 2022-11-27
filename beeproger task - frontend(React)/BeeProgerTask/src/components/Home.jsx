import React from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

const Home = () => {
  return (
    <div>
      <div className="main">
        <TaskForm />
        <TaskList />
      </div>
    </div>
  );
};

export default Home;
