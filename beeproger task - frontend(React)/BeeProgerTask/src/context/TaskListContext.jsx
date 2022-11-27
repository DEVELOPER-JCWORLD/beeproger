import React, {createContext, useState, useEffect, useCallback} from 'react';
import {v4} from 'uuid';
import {postTodo, removeTodo} from '../Api/Client';
import {useAllTodo} from '../hook/useAllTodo';
export const TaskListContext = createContext();
// import reducer from "./reducer";

const TaskListContextProvider = (props) => {
	const [fetchAllTodo, {allTodo, setAllTodo}, {loading}, {metaData}] =
		useAllTodo();

	const [editItem, setEditItem] = useState(null);

	const addTask = async (values) => {
		const formData = new FormData();
		formData.append('image', values.image);
		formData.append('title', values.title);
		formData.append('description', values.description);
		try {
			const result = await postTodo(formData);
			setAllTodo([...allTodo, result.data?.data]);
		} catch (error) {
			console.error(`Error from add to do Item ${error}`);
		} finally {
			fetchAllTodo();
		}
	};

	const removeTask = (id) => {
		removeTodo(id)
			.then((response) => response)
			.catch((error) => console.log(error))
			.finally(() => fetchAllTodo());
	};

	const clearList = () => {
		setAllTodo([]);
	};

	const findItem = (id) => {
		const item = allTodo.find((task) => task.id === id);
		setEditItem(item);
	};

	const editTask = (title, id) => {
		const newTask = allTodo.map((task) =>
			task.id === id ? {title, id} : task
		);
		setAllTodo(newTask);
		setEditItem(null);
	};

	return (
		<TaskListContext.Provider
			value={{
				tasks: allTodo,
				addTask,
				loading,
				removeTask,
				clearList,
				findItem,
				editItem,
				editTask,
			}}
		>
			{props.children}
		</TaskListContext.Provider>
	);
};

export default TaskListContextProvider;
