import React from 'react';
import { FilterValuesType } from './App';
import { Button } from './components/Button';

import AddInputForm from './components/AddInputForm';

export type TaskType = {
   id: string;
   title: string;
   isDone: boolean;
};

export type TodolistType = {
   title: string;
   tasks: Array<TaskType>;
   todolistId: string;
   filter: FilterValuesType;
   removeTask: (id: string, todolistId: string) => void;
   changeFilter: (value: FilterValuesType, todolistId: string) => void;
   addTask: (title: string, todolistId: string) => void;
   changeTaskStatus: (id: string, newStatusValue: boolean, todolistId: string) => void;
   removeTodolist: (todolistId: string) => void;
};

export const Todolist = (props: TodolistType) => {
   const removeTodolistHandler = () => {
      props.removeTodolist(props.todolistId);
   };

   const addTaskHandler = (title: string) => {
      props.addTask(title, props.todolistId);
   };

   const changeFilterTasksHandler = (filter: FilterValuesType) => () => props.changeFilter(filter, props.todolistId);

   return (
      <div>
         <div className={'todolist-title-container'}>
            <h3>{props.title}</h3>
            <Button Btntitle={'x'} callback={removeTodolistHandler} />
         </div>
         <div>
            <AddInputForm addItem={addTaskHandler} />
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
                           onChange={(e) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todolistId)}
                           checked={task.isDone}
                           type="checkbox"
                        ></input>
                        <span>{task.title}</span>
                        <Button callback={() => props.removeTask(task.id, props.todolistId)} Btntitle={'X'}></Button>
                     </li>
                  );
               })}
            </ul>
         )}

         <div>
            <Button
               className={props.filter === 'all' ? 'active-filter' : ''}
               callback={changeFilterTasksHandler('all')}
               Btntitle={'All'}
            />
            <Button
               className={props.filter === 'active' ? 'active-filter' : ''}
               callback={changeFilterTasksHandler('active')}
               Btntitle={'Active'}
            />
            <Button
               className={props.filter === 'completed' ? 'active-filter' : ''}
               callback={changeFilterTasksHandler('completed')}
               Btntitle={'Completed'}
            />
         </div>
      </div>
   );
};
