import React from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';

const tasks1: TaskType[] = [
   { id: v1(), title: 'HTML&CSS', isDone: false },
   { id: v1(), title: 'JS', isDone: false },
   { id: v1(), title: 'ReactJS', isDone: false },
   { id: v1(), title: 'Redux', isDone: false },
   { id: v1(), title: 'Typescript', isDone: false },
   { id: v1(), title: 'RTK query', isDone: false },
];

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistsType = {
   id: string;
   title: string;
   filter: FilterValuesType;
};

function App() {
   const [tasks, setTasks] = React.useState<TaskType[]>(tasks1);
   const [todolists, setTodolists] = React.useState<TodolistsType[]>([
      { id: v1(), title: 'What to learn', filter: 'all' },
      { id: v1(), title: 'What to buy', filter: 'all' },
   ]);
   const changeFilter = (value: FilterValuesType, todolistId: string) =>  {
      const newTodolists = todolists.map((tl) => {
         return tl.id === todolistId ? { ...tl, filter: value } : tl;
      });
      setTodolists(newTodolists);
   };

   const removeTask = (id: string) => {
      const newTasks = tasks.filter((t) => t.id !== id);
      setTasks(newTasks);
   };

   const addTask = (title: string) => {
      const newTask: TaskType = {
         id: v1(),
         title,
         isDone: false,
      };
      const newTasks = [newTask, ...tasks];
      setTasks(newTasks);
   };

   const changeTaskStatus = (taskId: string, taskStatus: boolean) => {
      const newState = tasks.map((t) => (t.id === taskId ? { ...t, isDone: taskStatus } : t));
      setTasks(newState);
   };

   return (
      <div className="App">
         {todolists.map((tl) => {
            let tasksForTodolist = tasks;
            if (tl.filter === 'active') {
               tasksForTodolist = tasks.filter((t) => t.isDone === false);
            }
            if (tl.filter === 'completed') {
               tasksForTodolist = tasks.filter((t) => t.isDone === true);
            }

            return (
               <Todolist
                  key={tl.id}
                  addTask={addTask}
                  changeFilter={changeFilter}
                  todolistId={tl.id}
                  removeTask={removeTask}
                  changeTaskStatus={changeTaskStatus}
                  title={tl.title}
                  tasks={tasksForTodolist}
                  filter={tl.filter}
               />
            );
         })}
      </div>
   );
}

export default App;
