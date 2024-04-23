import './App.css';
import React from 'react';
import AddInputForm from './components/AddInputForm';
import { v1 } from 'uuid';
import { TaskType, Todolist } from './Todolist';

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

      setTasksObj({ ...taskObj, [todolistId]: [newTask, ...taskObj[todolistId]] });
   };

   const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
      const tasksStatus = taskObj[todolistId].map((task) =>
         task.id === taskId ? { ...task, isDone: taskStatus } : task
      );

      setTasksObj({ ...taskObj, [todolistId]: tasksStatus });
   };
   const removeTodolist = (todolistId: string) => {
      const newTodolists = todolists.filter((tl) => tl.id !== todolistId);
      setTodolists(newTodolists);
      delete taskObj[todolistId];
      setTasksObj({ ...taskObj });
   };
   const addTodolist = (title: string) => {
      const todolistId = v1();
      const newTodolist: TodolistsType = { id: todolistId, title: title, filter: 'all' };
      setTodolists([newTodolist, ...todolists]);
      setTasksObj({ ...taskObj, [todolistId]: [] });
   };

   const filterTasksForTodoList = (todolistId: string, filter: FilterValuesType) => {
      let tasksForTodolist = taskObj[todolistId];
      if (filter === 'active') {
         tasksForTodolist = tasksForTodolist.filter((t) => !t.isDone);
      }
      if (filter === 'completed') {
         tasksForTodolist = tasksForTodolist.filter((t) => t.isDone);
      }
      return tasksForTodolist;
   };

   return (
      <div className="App">
         <AddInputForm addItem={addTodolist} />
         {todolists.map((tl) => {
            const tasksForTodolist = filterTasksForTodoList(tl.id, tl.filter);

            return (
               <Todolist
                  key={tl.id}
                  title={tl.title}
                  todolistId={tl.id}
                  filter={tl.filter}
                  tasks={tasksForTodolist}
                  addTask={addTask}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  removeTodolist={removeTodolist}
                  changeTaskStatus={changeTaskStatus}
                  
               />
            );
         })}
      </div>
   );
}

export default App;
