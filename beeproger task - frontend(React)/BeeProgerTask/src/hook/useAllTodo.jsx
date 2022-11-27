import {useState, useEffect, useCallback} from 'react';
import {getAllTodo} from '../Api/Client';

export const useAllTodo = () => {
	const [allTodo, setAllTodo] = useState([]);
	const [loading, setLoading] = useState(false);
	const [metaData, setMetaData] = useState(undefined);

	const fetchAllTodo = useCallback(async () => {
		setLoading(true);
		await getAllTodo()
			.then((res) => {
				setAllTodo(res.data?.data);
				setMetaData(res.data?.meta);
			})
			.catch((error) => console.log('error', error))
			.finally(() => setAllTodo);
		setLoading(false);
	}, []);

	useEffect(() => {
		fetchAllTodo();
	}, [fetchAllTodo]);

	return [fetchAllTodo, {allTodo, setAllTodo}, {loading}, {metaData}];
};
