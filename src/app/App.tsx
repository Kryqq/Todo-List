import React from 'react'
import './App.css'
import { TodolistsList } from 'features/TodolistsList/TodolistsList'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from './store'
import { RequestStatusType } from './appSlice'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { initializeApp, logout } from '../features/auth/model/authSlice'
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from '@mui/material'
import { Menu } from '@mui/icons-material'
import { ErrorSnackbar } from 'components/ErrorSnackbar/ErrorSnackbar'
import { Login } from 'features/auth/login/Login'

type PropsType = {
  demo?: boolean
}

const App = ({ demo = false }: PropsType) => {
  const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
  const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
  const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)
  const dispatch = useDispatch<any>()

  React.useEffect(() => {
    dispatch(initializeApp())
  }, [])

  const logoutHandler = React.useCallback(() => {
    dispatch(logout())
  }, [])

  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    )
  }
 
  return (
    <BrowserRouter>
      <div className="App">
        <ErrorSnackbar />
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Menu />
            </IconButton>
            <Typography variant="h6">News</Typography>
            {isLoggedIn && (
              <Button color="inherit" onClick={logoutHandler}>
                Log out
              </Button>
            )}
          </Toolbar>
          {status === 'loading' && <LinearProgress />}
        </AppBar>
        <Container fixed>
          <Routes>
            <Route path={'/'} element={<TodolistsList demo={demo} />} />
            <Route path={'/login'} element={<Login />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  )
}

export default App
