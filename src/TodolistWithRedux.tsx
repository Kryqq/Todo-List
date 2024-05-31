import React from 'react';
import { FilterValuesType, TodolistsType } from './App';
// import { Button } from './components/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddInputForm } from './components/AddInputForm';
import { EditableSpan } from './components/EditableSpan';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import { filterButtonsContainerSx, getListItemSx } from './Todolist.styles';
import { AppRootStateType } from './model/redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import {
   changeTodolistFilterAC,
   changeTodolistTitleAC,
   removeTodolistAC,
} from './model/todolists-reducer/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './model/tasks-reducer/tasks-reducer';

export type TaskType = {
   id: string;
   title: string;
   isDone: boolean;
};

export type TodolistType = {
   todolist: TodolistsType;
};

export const TodolistWithRedux = (props: TodolistType) => {
   let tasks = useSelector<AppRootStateType, TaskType[]>((state) => state.tasks[props.todolist.id]);
   const dispatch = useDispatch();

   const removeTodolistHandler = () => {
      dispatch(removeTodolistAC(props.todolist.id));
   };

   const addTaskHandler = (title: string) => {
      dispatch(addTaskAC(title, props.todolist.id));
   };

   const changeFilterTasksHandler = (filter: FilterValuesType) => () =>
      dispatch(changeTodolistFilterAC(props.todolist.id, filter));
   const changeTodoTitleHandler = (title: string) => {
      dispatch(changeTodolistTitleAC(props.todolist.id, title));
   };

   const changeTaskStatusHandler = (taskId: string, e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(changeTaskStatusAC(taskId, e.currentTarget.checked, props.todolist.id));
   };
   const removeTaskHandler = (taskId: string) => {
      dispatch(removeTaskAC(taskId, props.todolist.id));
   };
   const changeTaskTitleHandler = (title: string, taskId: string) => {
      dispatch(changeTaskTitleAC(props.todolist.id, taskId, title));
   };

   if (props.todolist.filter === 'active') {
      tasks = tasks.filter((t) => !t.isDone);
   }
   if (props.todolist.filter === 'completed') {
      tasks = tasks.filter((t) => t.isDone);
   }

   return (
      <div>
         <div className={'todolist-title-container'}>
            <EditableSpan onChange={changeTodoTitleHandler} title={props.todolist.title} />
            {/* <Button Btntitle={'x'} callback={removeTodolistHandler} /> */}
            <IconButton aria-label="delete" onClick={removeTodolistHandler}>
               <DeleteIcon />
            </IconButton>
         </div>
         <div>
            <AddInputForm addItem={addTaskHandler} />
         </div>
         {tasks.length === 0 ? (
            <p>Тасок нет</p>
         ) : (
            <List>
               {tasks.map((task) => {
                  return (
                     <ListItem
                        key={task.id}
                        //     className={task.isDone ? 'is-done' : ''}
                        sx={getListItemSx(task.isDone)}
                     >
                        {/* <input
                           onChange={(e) => changeTaskStatusHandler(task.id, e)}
                           checked={task.isDone}
                           type="checkbox"
                        ></input> */}
                        <div>
                           <Checkbox onChange={(e) => changeTaskStatusHandler(task.id, e)} checked={task.isDone} />
                           <EditableSpan
                              onChange={(title) => changeTaskTitleHandler(title, task.id)}
                              title={task.title}
                           />
                        </div>
                        {/* <Button callback={() => removeTaskHandler(task.id)} Btntitle={'X'}></Button> */}
                        <IconButton aria-label="delete" onClick={() => removeTaskHandler(task.id)}>
                           <DeleteIcon />
                        </IconButton>
                     </ListItem>
                  );
               })}
            </List>
         )}

         <Box sx={filterButtonsContainerSx}>
            <Button
               variant={props.todolist.filter === 'all' ? 'contained' : 'outlined'}
               color={'error'}
               onClick={changeFilterTasksHandler('all')}
            >
               All
            </Button>
            <Button
               variant={props.todolist.filter === 'active' ? 'contained' : 'outlined'}
               color={'warning'}
               onClick={changeFilterTasksHandler('active')}
            >
               Active
            </Button>
            <Button
               variant={props.todolist.filter === 'completed' ? 'contained' : 'outlined'}
               color={'secondary'}
               onClick={changeFilterTasksHandler('completed')}
            >
               Completed
            </Button>
            {/* <Button
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
            /> */}
         </Box>
      </div>
   );
};
