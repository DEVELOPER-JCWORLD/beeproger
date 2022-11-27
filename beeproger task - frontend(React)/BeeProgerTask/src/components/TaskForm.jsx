import React, { useContext, useState, useEffect, useRef } from "react";
import { TaskListContext } from "../context/TaskListContext";
import FileBase from "react-file-base64";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateTodo } from "../redux/features/todoSlice";
// import {FaPlus} from "react-icons/fa"

const TaskForm = () => {
  const { addTask, clearList, editItem, editTask } =
    useContext(TaskListContext);
  const navigate = useNavigate();

  
  const imageRef = useRef();

  const [userImage, setUserImage] = useState("");
  const [values, setValues] = useState({
    title: "",
    description: "",
    image: "",
  });

  useEffect(()=>{
    if(editItem !== null){
      setValues({
        title: editItem.title,
        description: editItem.description
      })
    }
  },[ editItem])
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      values.title === "" ||
      values.description === "" ||
      values.image === undefined ||
      null
    )
      return;

  
    else {
      setLoading(true);
      await addTask(values);
      setLoading(false);
      setUserImage("");
      setValues({
        title: "",
        description: "",
      });
    }
  };

  

  const imagePicker = (e) => {
    const { files, name } = e.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const image = event.target?.result;
        setUserImage(image);
      };
      setValues({ ...values, [name]: files[0] });

      reader.readAsDataURL(files[0]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handlePicker = () => imageRef.current?.click();

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="form-data">
        <div className="task-input-form">
          <input
            type="text"
            name="title"
            value={values.title}
            className="task-input"
            placeholder="Enter Task"
            required
            onChange={handleChange}
          />
          <textarea
            type="text"
            name="description"
            value={values.description}
            className="task-input text-area"
            placeholder="Enter Description"
            required
            onChange={handleChange}
          />
        </div>
        <div className="image-form" onClick={handlePicker}>
          <p className="add-image">Add Image</p>
          <img
            src={userImage === "" ? "https://picsum.photos/200/300" : userImage}
            alt="avatar"
            className="new-image"
          />
          <input
            ref={imageRef}
            type="file"
            multiple={false}
            accept="image/png, image/jpeg, image/jpg"
            name="image"
            aria-label="image"
            aria-required="true"
            id="image"
            className="image-input"
            onChange={imagePicker}
         
          />
        </div>
      </div>

      <div className="form-buttons">
        <button type="submit" className="btn add-task-btn">
          {loading ? "Submitting......." : editItem ? "Edit Item" : "Add Items"}
        </button>
        <button onClick={clearList} className="btn clear-btn">
          Clear
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
