import React from 'react';
import { FilterValuesType } from './App';
import { Button } from './components/Button';

import AddInputForm from './components/AddInputForm';
import { EditableSpan } from './components/EditableSpan';

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
   removeTodolist: (todolistId: string) => void;
   removeTask: (id: string, todolistId: string) => void;
   addTask: (title: string, todolistId: string) => void;
   changeTaskTitle: (todolistId: string, taskId: string, title: string) => void;
   changeFilter: (value: FilterValuesType, todolistId: string) => void;
   changeTaskStatus: (id: string, newStatusValue: boolean, todolistId: string) => void;
   changeTodoTitle: (todolistId: string, title: string) => void;
};

export const Todolist = (props: TodolistType) => {
   const removeTodolistHandler = () => {
      props.removeTodolist(props.todolistId);
   };

   const addTaskHandler = (title: string) => {
      props.addTask(title, props.todolistId);
   };

   const changeFilterTasksHandler = (filter: FilterValuesType) => () => props.changeFilter(filter, props.todolistId);
   const changeTodoTitleHandler = (title: string) => {
      props.changeTodoTitle(props.todolistId, title);
   };

   const changeTaskStatusHandler = (taskId: string, e: React.ChangeEvent<HTMLInputElement>) => {
      props.changeTaskStatus(taskId, e.currentTarget.checked, props.todolistId);
   };
   const removeTaskHandler = (taskId: string) => {
      props.removeTask(taskId, props.todolistId);
   };
   const changeTaskTitleHandler = (title: string, taskId: string) => {
      props.changeTaskTitle(props.todolistId, taskId, title);
   };

   let tasksForTodolist = props.tasks;
   if (props.filter === 'active') {
      tasksForTodolist = tasksForTodolist.filter((t) => !t.isDone);
   }
   if (props.filter === 'completed') {
      tasksForTodolist = tasksForTodolist.filter((t) => t.isDone);
   }

   return (
      <div>
         <div className={'todolist-title-container'}>
            <EditableSpan onChange={changeTodoTitleHandler} title={props.title} />
            <Button Btntitle={'x'} callback={removeTodolistHandler} />
         </div>
         <div>
            <AddInputForm addItem={addTaskHandler} />
         </div>
         {tasksForTodolist.length === 0 ? (
            <p>Тасок нет</p>
         ) : (
            <ul>
               {tasksForTodolist.map((task) => {
        
                  return (
                     <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                        <input
                           onChange={(e) => changeTaskStatusHandler(task.id, e)}
                           checked={task.isDone}
                           type="checkbox"
                        ></input>
                        <EditableSpan onChange={() => changeTaskTitleHandler(task.title, task.id)} title={task.title} />
                        <Button callback={() => removeTaskHandler(task.id)} Btntitle={'X'}></Button>
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
