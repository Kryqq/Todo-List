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
   removeTask: (id: string) => void;
   changeFilter: (value: FilterValuesType) => void;
   addTask: (title: string) => void;
   changeTaskStatus: (id: string, newStatusValue: boolean) => void;
};

export const Todolist = (props: TodolistType) => {
   let [taskTitle, setTaskTitle] = React.useState('');

   const onAddTask = () => {
      if (taskTitle) props.addTask(taskTitle);
      setTaskTitle('');
   };
   const changeTaskTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTaskTitle(event.currentTarget.value);
   };
   const addTaskOnKeyUpHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
      event.key === 'Enter' && taskTitle && props.addTask(taskTitle);
   };

   const changeFilterTasksHandler = (filter: FilterValuesType) => {
      props.changeFilter(filter);
   };

   return (
      <div>
         <h3>{props.title}</h3>
         <div>
            <input onKeyUp={addTaskOnKeyUpHandler} onChange={changeTaskTitleHandler} value={taskTitle} />
            <Button onClick={onAddTask} Btntitle={'+'} />
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
                     <li key={task.id}>
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
            <Button onClick={() => changeFilterTasksHandler('all')} Btntitle={'All'} />
            <Button onClick={() => changeFilterTasksHandler('active')} Btntitle={'Active'} />
            <Button onClick={() => changeFilterTasksHandler('completed')} Btntitle={'Completed'} />
         </div>
      </div>
   );
};
