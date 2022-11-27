import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSingleTodo } from "../redux/features/todoSlice";
import { useParams, useNavigate } from "react-router-dom";
import icon from '../assets/icon.png'
import { updateCompleteTodo, updateIncompleteTodo } from "../Api/Client";

const SingleTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post, loading } = useSelector((state) => state.todo);
  const { id } = useParams();
  const [btnValue, setBtnValue] = useState('Mark as completed')

  const completeTask = async (id, isTodocompleted) => {
    const res = await updateCompleteTodo(id)
    isTodocompleted === 1 && setBtnValue('Mark as not completed')
    dispatch(getSingleTodo(id))
  }

  const uncompleteTask = async (id, isTodocompleted) => {
    const res = await updateIncompleteTodo(id)
    isTodocompleted === 0 && setBtnValue('Mark as completed')
    dispatch(getSingleTodo(id))
  }

  useEffect(() => {
    if (id) {
      dispatch(getSingleTodo(id));
    }
  }, [id]);
  return (
    <div>
      <div className="text-image text-me">
        <img
          // src={post?.data?.image}
          src={icon}
          alt={post?.data?.title}
          height={240}
          width={240}
          className="task-image"
        />
        {post?.data?.isTodocompleted === 0 ? (
          <div className="task">
            <h2 className="">Status:</h2>
            <p className="complete">Task not completed</p>
          </div>
        ) : (
          <div className="task">
            <h2 className="">Status:</h2>
            <p className="complete">Task completed</p>
          </div>
        )}
        <div className="single-btn">
          <button onClick={() => navigate(-1)}>back</button>
          <button onClick={() => post?.data?.isTodocompleted === 0 ? completeTask(post?.data?.id, post?.data?.isTodocompleted) : uncompleteTask(post?.data?.id, post?.data?.isTodocompleted) }> {post?.data?.isTodocompleted === 0 ? "Mark as completed" : "Mark as not completed"} </button>
        </div>
        <div className="text-container-detail">
          <div className="det">
            <h3>Item:</h3> <h4>{post?.data?.title}</h4>
          </div>
          <div className="det">
            <h3>Description:</h3>
            <p >{post?.data?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTask;
