import axios from 'axios';

type TodolistType = {
   id: string;
   addedDate: string;
   order: number;
   title: string;
};

type FieldErrorType = {
   error: string;
   field: string;
};

type ResponseType<D = {}> = {
   resultCode: number;
   messages: string[];
   fieldsErrors: FieldErrorType[];
   data: D;
};

const instance = axios.create({
   baseURL: 'https://social-network.samuraijs.com/api/1.1/',
   withCredentials: true,
   headers: {
      // Не забываем заменить API-KEY на собственный
      'API-KEY': '8fef2b78-2aab-47e8-b036-0d52e54939f0',
   },
});

export const todolistAPI = {
   updateTodolist(todolistId: string, title: string) {
      return instance.put<ResponseType>(`todo-lists/${todolistId}`, { title });
   },
   deleteTodolist(todolistId: string) {
      return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
   },
   createTodolist(title: string) {
      return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', { title });
   },
   getTodolists() {
      return instance.get<ResponseType>('todo-lists');
   },
};
