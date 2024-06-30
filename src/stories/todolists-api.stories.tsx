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
   const todolistId = '7afac820-4c44-4bcb-b00c-b515cc0a9927';
   const [state, setState] = useState<any>(null);
   useEffect(() => {
      todolistAPI.deleteTodolist(todolistId).then((res) => {
         setState(res.data);
      });
   }, []);

   return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodolistTitle = () => {
   const todolistId = 'b8a0f5cc-40e1-4210-9710-697b6c1be9b7';
   const [state, setState] = useState<any>(null);
   useEffect(() => {
      todolistAPI.updateTodolist(todolistId, 'SOME NEW TITLE').then((res) => {
		console.log(res.data);
		
         setState(res.data);
      });
   }, []);

   return <div>{JSON.stringify(state)}</div>;
};
