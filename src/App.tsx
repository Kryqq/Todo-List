import './App.css';
import React from 'react';
import AddInputForm from './components/AddInputForm';
import { v1 } from 'uuid';
import { TaskType, Todolist } from './Todolist';

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
      setTodolists(todolists.map((tl) => (tl.id === todolistId ? { ...tl, filter: value } : tl)));
   };

   const removeTask = (id: string, todolistId: string) => {
      setTasksObj({ ...taskObj, [todolistId]: taskObj[todolistId].filter((task) => task.id !== id) });
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
      setTasksObj({
         ...taskObj,
         [todolistId]: taskObj[todolistId].map((task) => (task.id === taskId ? { ...task, isDone: taskStatus } : task)),
      });
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

   const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
      setTasksObj({
         ...taskObj,
         [todolistId]: taskObj[todolistId].map((task) => (task.id === taskId ? { ...task, title } : task)),
      });
   };

   const changeTodoTitle = (todolistId: string, title: string) => {
      setTodolists(todolists.map((tl) => (tl.id === todolistId ? { ...tl, title } : tl)));
   };

   return (
      <div className="App">
         <AddInputForm addItem={addTodolist} />
         {todolists.map((tl) => {
            return (
               <Todolist
                  key={tl.id}
                  title={tl.title}
                  todolistId={tl.id}
                  filter={tl.filter}
                  tasks={taskObj[tl.id]}
                  addTask={addTask}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  removeTodolist={removeTodolist}
                  changeTaskStatus={changeTaskStatus}
                  changeTaskTitle={changeTaskTitle}
                  changeTodoTitle={changeTodoTitle}
               />
            );
         })}
      </div>
   );
}

export default App;
