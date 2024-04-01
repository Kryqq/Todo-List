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

function App() {
   let [tasks, setTasks] = React.useState<TaskType[]>(tasks1);
   const [filter, setFilter] = React.useState<FilterValuesType>('all');

   const getStatusForTodoList = (tasks: TaskType[], taskStatus: FilterValuesType) => {
      if (taskStatus === 'completed') {
         return tasks.filter((t) => t.isDone === true);
      }
      if (taskStatus === 'active') {
         return tasks.filter((t) => t.isDone === false);
      } else return tasks;
   };

   const changeFilter = (value: FilterValuesType) => {
      setFilter(value);
   };

   let tasksForTodolist = getStatusForTodoList(tasks, filter);

   const removeTask = (id: string) => {
      const newTasks = tasks.filter((t) => t.id !== id);
      setTasks(newTasks);
   };

   const addTask = (title: string) => {
      const newTask = {
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
         <Todolist
            addTask={addTask}
            changeFilter={changeFilter}
            removeTask={removeTask}
            changeTaskStatus={changeTaskStatus}
            title={'what to learn'}
            tasks={tasksForTodolist}
            filter={filter}
         />
      </div>
   );
}

export default App;
