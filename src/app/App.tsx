import './App.css';
import React from 'react';
import { useAppDispatch, useAppSelector } from './store';
import { Outlet } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Menu } from '@mui/icons-material';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import CustomizedSnackbars from '../components/ErrorSnackbar/ErrorSnackbar';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';

import { RequestStatusType } from './app-reducer';
import { meTC } from '../features/Login/auth-reducer';

function App() {
   const status = useAppSelector<RequestStatusType>((state) => state.app.status);
   const isInitialized = useAppSelector<boolean>((state) => state.app.isInitialized);
   const dispatch = useAppDispatch();

   React.useEffect(() => {
      dispatch(meTC());
   }, []);

   if (!isInitialized) {
      return (
         <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
            <CircularProgress />
         </div>
      );
   }

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
