import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import React from 'react';
import { EditableSpan } from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskType } from '../TodolistWithRedux';
import { getListItemSx } from '../Todolist.styles';
import { useDispatch } from 'react-redux';
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from '../model/tasks-reducer/tasks-reducer';
type TaskPropsType = {
   task: TaskType;
   todolistId: string;
};

export const Task = React.memo((props: TaskPropsType) => {
   const dispatch = useDispatch();
   return (
      <ListItem sx={getListItemSx(props.task.isDone)}>
         <div>
            <Checkbox
               onChange={(e) => dispatch(changeTaskStatusAC(props.task.id, e.currentTarget.checked, props.todolistId))}
               checked={props.task.isDone}
            />
            <EditableSpan
               onClick={(title) => dispatch(changeTaskTitleAC(props.todolistId, props.task.id, title))}
               title={props.task.title}
            />
         </div>
         {/* <Button callback={() => removeTaskHandler(task.id)} Btntitle={'X'}></Button> */}
         <IconButton aria-label="delete" onClick={() => dispatch(removeTaskAC(props.task.id, props.todolistId))}>
            <DeleteIcon />
         </IconButton>
      </ListItem>
   );
});
