import './App.css';
import React from 'react';

import { TaskType, Todolist } from './Todolist';
import { AddInputForm } from './components/AddInputForm';
import { AppBarHeader } from './AppBarHeader';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@emotion/react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import createTheme from '@mui/material/styles/createTheme';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './model/redux/store/store';
import {
   addTodolistAC,
   changeTodolistFilterAC,
   changeTodolistTitleAC,
   removeTodolistAC,
   todolistId1,
} from './model/todolists-reducer/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './model/tasks-reducer/tasks-reducer';
import { TodolistWithRedux } from './TodolistWithRedux';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistsType = {
   id: string;
   title: string;
   filter: FilterValuesType;
};
type ThemeMode = 'dark' | 'light';
export type TasksState = {
   [key: string]: TaskType[];
};

export const AppRedux = () => {
   const dispatch = useDispatch();

   const todolists = useSelector<AppRootStateType, TodolistsType[]>((state) => state.todolists);

   const [themeMode, setThemeMode] = React.useState<ThemeMode>('light');

   //    const changeFilter = (value: FilterValuesType, todolistId: string) => {
   //       dispatch(changeTodolistFilterAC(todolistId, value));
   //    };

   //    const removeTask = (id: string, todolistId: string) => {
   //       dispatch(removeTaskAC(id, todolistId));
   //    };

   //    const addTask = (title: string, todolistId: string) => {
   //       dispatch(addTaskAC(title, todolistId));
   //    };

   //    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
   //       dispatch(changeTaskStatusAC(taskId, taskStatus, todolistId));
   //    };
   //    const removeTodolist = (todolistId: string) => {
   //       dispatch(removeTodolistAC(todolistId));
   //    };
   const addTodolist = React.useCallback((title: string) => {
      dispatch(addTodolistAC(title));
   }, []);

   //    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
   //       dispatch(changeTaskTitleAC(todolistId, taskId, title));
   //    };

   //    const changeTodoTitle = (todolistId: string, title: string) => {
   //       dispatch(changeTodolistTitleAC(todolistId, title));
   //    };
   const changeModeHandler = React.useCallback(() => {
      setThemeMode(themeMode == 'light' ? 'dark' : 'light');
   }, []);

   const theme = createTheme({
      palette: {
         mode: themeMode === 'light' ? 'light' : 'dark',
         primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
         },
         secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
         },
      },
   });

   return (
      <div className="App">
         <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ flexGrow: 1, mb: 10 }}>
               <AppBarHeader changeModeHandler={changeModeHandler} />
            </Box>
            <Container fixed>
               <Grid container sx={{ flexGrow: 1, mb: 5 }}>
                  <AddInputForm addItem={addTodolist} />
               </Grid>
               <Grid container spacing={3}>
                  {todolists.map((tl) => {
                     return (
                        <Grid item key={tl.id}>
                           <Paper sx={{ p: '10px' }} elevation={6}>
                              <TodolistWithRedux todolist={tl} />
                           </Paper>
                        </Grid>
                     );
                  })}
               </Grid>
            </Container>
         </ThemeProvider>
      </div>
   );
};
