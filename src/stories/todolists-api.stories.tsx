import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { todolistAPI } from '../api/todolist-api';

export default {
   title: 'API',
};

export const GetTodolists = () => {
   const [state, setState] = useState<any>(null);
   useEffect(() => {
      todolistAPI.getTodolists().then((res) => {
         setState(res.data);
      });
   }, []);
   return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
   const [state, setState] = useState<any>(null);
   useEffect(() => {
      todolistAPI.createTodolist('newTodolist').then((res) => {
         setState(res.data);
      });
   }, []);

   return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
   const todolistId = 'c750e0b8-a103-431c-9873-f86ecaa03fd3';
   const [state, setState] = useState<any>(null);
   useEffect(() => {
      todolistAPI.deleteTodolist(todolistId).then((res) => {
         setState(res.data);
      });
   }, []);

   return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodolistTitle = () => {
   const todolistId = '5a6e4e35-f5d0-4587-a8e5-52d6f24d0d17';
   const [state, setState] = useState<any>(null);
   useEffect(() => {
      todolistAPI.updateTodolist(todolistId, 'SOME NEW TITLE').then((res) => {
         setState(res.data);
      });
   }, []);

   return <div>{JSON.stringify(state)}</div>;
};
