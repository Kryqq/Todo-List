import React from 'react';
import { FilterValuesType } from './App';
import { Button } from './Button';

export type TaskType = {
   id: string;
   title: string;
   isDone: boolean;
};
export type TodolistType = {
   title: string;
   tasks: Array<TaskType>;
   filter: FilterValuesType;
   removeTask: (id: string) => void;
   changeFilter: (value: FilterValuesType) => void;
   addTask: (title: string) => void;
   changeTaskStatus: (id: string, newStatusValue: boolean) => void;
};

export const Todolist = (props: TodolistType) => {
   const [taskTitle, setTaskTitle] = React.useState('');
   const [error, setError] = React.useState<string | null>(null);

   const onAddTask = () => {
      if (taskTitle.trim() !== '') {
         props.addTask(taskTitle.trim());
         setTaskTitle('');
      } else {
         setError('Title is required');
      }
   };
   const changeTaskTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTaskTitle(event.currentTarget.value);
   };
   const addTaskOnKeyUpHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
      setError(null);
      event.key === 'Enter' && taskTitle && props.addTask(taskTitle);
   };

   const changeFilterTasksHandler = (filter: FilterValuesType) => {
      props.changeFilter(filter);
   };

   return (
      <div>
         <h3>{props.title}</h3>
         <div>
            <input
               className={error ? 'error' : ''}
               onKeyUp={addTaskOnKeyUpHandler}
               onChange={changeTaskTitleHandler}
               value={taskTitle}
            />
            <Button onClick={onAddTask} Btntitle={'+'} />
            {error && <div className="error-message">{error}</div>}
         </div>
         {props.tasks.length === 0 ? (
            <p>Тасок нет</p>
         ) : (
            <ul>
               {props.tasks.map((task) => {
                  // const removeTaskHandler = () => {
                  // 	props.removeTaskHandler(task.id)
                  // }
                  //    const changeTaskStatusHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
                  // 	const newStatusValue = e.currentTarget.checked;
                  // 	props.changeTaskStatus(task.id, newStatusValue)

                  //   };
                  return (
                     <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                        <input
                           onChange={(e) => props.changeTaskStatus(task.id, e.currentTarget.checked)}
                           checked={task.isDone}
                           type="checkbox"
                        ></input>
                        <span>{task.title}</span>
                        <Button onClick={() => props.removeTask(task.id)} Btntitle={'X'}></Button>
                     </li>
                  );
               })}
            </ul>
         )}

         <div>
            <Button
               className={props.filter === 'all' ? 'active-filter' : ''}
               onClick={() => changeFilterTasksHandler('all')}
               Btntitle={'All'}
            />
            <Button
               className={props.filter === 'active' ? 'active-filter' : ''}
               onClick={() => changeFilterTasksHandler('active')}
               Btntitle={'Active'}
            />
            <Button
               className={props.filter === 'completed' ? 'active-filter' : ''}
               onClick={() => changeFilterTasksHandler('completed')}
               Btntitle={'Completed'}
            />
         </div>
      </div>
   );
};
