import React from 'react';
import { TodolistsType } from './App';
import { MyButton } from './components/MyButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddInputForm } from './components/AddInputForm';
import { EditableSpan } from './components/EditableSpan';
import IconButton from '@mui/material/IconButton';

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
import { Task } from './components/Task';

export type TaskType = {
   id: string;
   title: string;
   isDone: boolean;
};

export type TodolistType = {
   todolist: TodolistsType;
};

export const TodolistWithRedux = React.memo((props: TodolistType) => {
   let tasks = useSelector<AppRootStateType, TaskType[]>((state) => state.tasks[props.todolist.id]);
   const dispatch = useDispatch();

   const removeTodolistHandler = React.useCallback(() => {
      dispatch(removeTodolistAC(props.todolist.id));
   }, [dispatch, props.todolist.id]);

   const addTaskHandler = React.useCallback(
      (title: string) => {
         dispatch(addTaskAC(title, props.todolist.id));
      },
      [dispatch, props.todolist.id]
   );

   const changeToAllFilterHandler = React.useCallback(() => {
      dispatch(changeTodolistFilterAC(props.todolist.id, 'all'));
   }, [dispatch, props.todolist.id]);

   const changeToActiveFilterHandler = React.useCallback(() => {
      dispatch(changeTodolistFilterAC(props.todolist.id, 'active'));
   }, [dispatch, props.todolist.id]);

   const changeToCompletedFilterHandler = React.useCallback(() => {
      dispatch(changeTodolistFilterAC(props.todolist.id, 'completed'));
   }, [dispatch, props.todolist.id]);

   const changeTodoTitleHandler = React.useCallback(
      (title: string) => {
         dispatch(changeTodolistTitleAC(props.todolist.id, title));
      },
      [dispatch, props.todolist.id]
   );

   tasks = React.useMemo(() => {
      if (props.todolist.filter === 'active') {
         tasks = tasks.filter((t) => !t.isDone);
      }
      if (props.todolist.filter === 'completed') {
         tasks = tasks.filter((t) => t.isDone);
      }

      return tasks;
   }, [tasks, props.todolist.filter]);

   return (
      <div>
         <div className={'todolist-title-container'}>
            <EditableSpan onClick={changeTodoTitleHandler} title={props.todolist.title} />

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
                  return <Task key={task.id} task={task} todolistId={props.todolist.id} />;
               })}
            </List>
         )}

         <Box sx={filterButtonsContainerSx}>
            <MyButton
               variant={props.todolist.filter === 'all' ? 'contained' : 'outlined'}
               color={'inherit'}
               onClick={changeToAllFilterHandler}
               Btntitle={'All'}
            />
            <MyButton
               variant={props.todolist.filter === 'active' ? 'contained' : 'outlined'}
               color={'secondary'}
               onClick={changeToActiveFilterHandler}
               Btntitle={'active'}
            />
            <MyButton
               variant={props.todolist.filter === 'completed' ? 'contained' : 'outlined'}
               color={'primary'}
               onClick={changeToCompletedFilterHandler}
               Btntitle={'completed'}
            />
         </Box>
      </div>
   );
});
