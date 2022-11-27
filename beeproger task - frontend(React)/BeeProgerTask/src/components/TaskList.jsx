import React, {useContext} from 'react';
import {TaskListContext} from '../context/TaskListContext';
import Task from './Task';

import loader from './loading-c.gif';

const TaskList = () => {
	const {tasks, loading} = useContext(TaskListContext);

	if (loading)
		return (
			<div className='image-loader'>
				<img src={loader} alt='loading' width={'100%'} height={'80%'} />
			</div>
		);

	return (
		<>
			{tasks.length > 0 ? (
				<ul className='list-all-tasks'>
					{tasks.map((task) => {
						const {image, id, title, description} = task;
						return (
							<Task
								id={id}
								key={id}
								image={image}
								title={title}
								description={description}
							/>
						);
					})}
				</ul>
			) : (
				<div className='no-tasks'>NO TASKS</div>
			)}
		</>
	);
};

export default TaskList;
