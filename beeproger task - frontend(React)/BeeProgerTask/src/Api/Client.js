import axios from "axios";

const MakeClient = axios.create({
  baseURL: "https://react.thrilldigitals.com/api",
  timeout: 60000,
});

export const getAllTodo = async () => await MakeClient.get("/todo-list");
export const getSingleTodo = async (id) =>
  await MakeClient.get(`/todo-list/${id}`);
export const postTodo = async (body) =>
  await MakeClient.post("/todo-list", body);
export const updateIncompleteTodo = async (id) =>
  await MakeClient.put(`/todo-list/${id}/incomplete`);
export const updateCompleteTodo = async (id) =>
  await MakeClient.put(`/todo-list/${id}/complete`);
export const removeTodo = async (id) =>
  await MakeClient.delete(`/todo-list/${id}`);

export const updateTodo = async (id) =>
  await MakeClient.put(`/todo-list/${id}`);