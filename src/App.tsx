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

type TasksState = {
   [key: string]: TaskType[];
};

function App() {
   const todolistId1 = v1();
   const todolistId2 = v1();

   const [tasks, setTasks] = React.useState<TaskType[]>(tasks1);
   const [todolists, setTodolists] = React.useState<TodolistsType[]>([
      { id: todolistId1, title: 'What to learn', filter: 'all' },
      { id: todolistId2, title: 'What to buy', filter: 'all' },
   ]);

   const [taskObj, setTasksObj] = React.useState<TasksState>({
      [todolistId1]: [
         { id: v1(), title: 'HTML&CSS', isDone: false },
         { id: v1(), title: 'JS', isDone: false },
         { id: v1(), title: 'ReactJS', isDone: false },
         { id: v1(), title: 'Redux', isDone: false },
         { id: v1(), title: 'Typescript', isDone: false },
         { id: v1(), title: 'RTK query', isDone: false },
      ],
      [todolistId2]: [
         { id: v1(), title: 'Fruits', isDone: false },
         { id: v1(), title: 'Meat', isDone: false },
      ],
   });

   const changeFilter = (value: FilterValuesType, todolistId: string) => {
      const newTodolists = todolists.map((tl) => {
         return tl.id === todolistId ? { ...tl, filter: value } : tl;
      });
      setTodolists(newTodolists);
   };

   const removeTask = (id: string, todolistId: string) => {
      const newTasks = taskObj[todolistId].filter((task) => task.id !== id);
      setTasksObj({ ...taskObj, [todolistId]: newTasks });
   };

   const addTask = (title: string, todolistId: string) => {
      const newTask: TaskType = {
         id: v1(),
         title,
         isDone: false,
      };
      const newTasks = [newTask, ...taskObj[todolistId]];

      setTasksObj({ ...taskObj, [todolistId]: newTasks });
   };

   const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
    
      const tasksStatus = taskObj[todolistId].map((task) =>
         task.id === taskId ? { ...task, isDone: taskStatus } : task
      );

      setTasksObj({ ...taskObj, [todolistId]: tasksStatus });
   };

   return (
      <div className="App">
         {todolists.map((tl) => {
            let tasksForTodolist = taskObj[tl.id];
            if (tl.filter === 'active') {
               tasksForTodolist = tasksForTodolist.filter((t) => t.isDone === false);
            }
            if (tl.filter === 'completed') {
               tasksForTodolist = tasksForTodolist.filter((t) => t.isDone === true);
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
