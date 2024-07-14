import React, { useEffect } from 'react';
import './App.css';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Menu } from '@mui/icons-material';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import { useAppDispatch, useAppSelector } from './store';
import { RequestStatusType } from './app-reducer';
import CustomizedSnackbars from '../components/ErrorSnackbar/ErrorSnackbar';
import { Outlet } from 'react-router-dom';
import { meTC } from '../features/Login/auth-reducer';

function App() {
   const status = useAppSelector<RequestStatusType>((state) => state.app.status);

   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(meTC());
   }, []);

   return (
      <div className="App">
         <AppBar position="static">
            <CustomizedSnackbars />
            <Toolbar>
               <IconButton edge="start" color="inherit" aria-label="menu">
                  <Menu />
               </IconButton>
               <Typography variant="h6">News</Typography>
               <Button color="inherit">Login</Button>
            </Toolbar>
            {status === 'loading' && <LinearProgress color="secondary" />}
         </AppBar>
         <Container fixed>
            <Outlet />
         </Container>
      </div>
   );
}

export default App;
