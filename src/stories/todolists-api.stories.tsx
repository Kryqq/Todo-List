import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default {
   title: 'API',
};
const settings = {
   withCredentials: true,
};
export const GetTodolists = () => {
   const [state, setState] = useState<any>(null);
   useEffect(() => {
      axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings).then((res) => {
         setState(res.data);
      });
   }, []);
   return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
   const [state, setState] = useState<any>(null);
   useEffect(() => {
      axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', { title: 'newTodolist' }, settings);
   }, []);

   return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
   const todolistId = 'c750e0b8-a103-431c-9873-f86ecaa03fd3';
   const [state, setState] = useState<any>(null);
   useEffect(() => {
      axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings).then((res) => {
         setState(res.data);
      });
   }, []);

   return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodolistTitle = () => {
   const todolistId = '5a6e4e35-f5d0-4587-a8e5-52d6f24d0d17';
   const [state, setState] = useState<any>(null);
   useEffect(() => {
      axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, { title: 'React' }, settings);
   }, []);

   return <div>{JSON.stringify(state)}</div>;
};
