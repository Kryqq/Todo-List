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
  
   let tasksForTodolist = tasks;
   if (filter === 'completed') {
      tasksForTodolist = tasks.filter((t) => t.isDone === true);
   }
   if (filter === 'active') {
      tasksForTodolist = tasks.filter((t) => t.isDone === false);
   }

   const removeTask = (id: string) => {
      const newTasks = tasks.filter((t) => t.id !== id);
      setTasks(newTasks);
   };
   const changeFilter = (value: FilterValuesType) => {
      setFilter(value);
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

   const changeTaskStatus = (id: string, taskStatus: boolean) => {
      const task = tasks.find((task) => task.id === id);
      if (task) {
         task.isDone = taskStatus;
         setTasks([...tasks]);
      }
	
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
         />
      </div>
   );
}

export default App;
