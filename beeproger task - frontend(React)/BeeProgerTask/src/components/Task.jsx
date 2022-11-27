import React, { useContext } from "react";
import { TaskListContext } from "../context/TaskListContext";
// import {FaPlus} from "react-icons/fa"
import { FaPen, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import icon from '../assets/icon.png'

const Task = ({ image, description, title, id }) => {
  const { removeTask, findItem } = useContext(TaskListContext);

  const editItem = async(id) => {
    const res = await findItem(id)
  }

  return (
    <li className="list-item">
      <div className="text-image-container">
        <img
          src={icon}
          alt={title}
          height={70}
          width={70}
          className="task-image"
        />
        <div className="text-container">
          <h2 className="title">{title}</h2>
          <p className="description">{description}</p>
        </div>
      </div>
      <div className="action-buttons">
        <button className="task-btn btn-delete" onClick={() => removeTask(id)}>
          <MdDelete color={"#e58bb8cf"} fontSize={20} />
        </button>

        <button className="task-btn btn-edit" onClick={() => editItem(id)}>
        
            <FaPen color={"#e58bb8cf"} fontSize={17} />
          </button>
       
        <button className="task-btn btn-edit">
          <Link to={`/todo/${id}`}>
            <FaEye color={"#e58bb8cf"} fontSize={17} />
          </Link>
        </button>
      </div>
    </li>
  );
};

export default Task;
