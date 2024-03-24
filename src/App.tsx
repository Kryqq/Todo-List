import React from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';

const tasks1: TaskType[] = [
   { id: 1, title: 'HTML&CSS', isDone: true },
   { id: 2, title: 'JS', isDone: true },
   { id: 3, title: 'ReactJS', isDone: false },
   { id: 4, title: 'Redux', isDone: false },
   { id: 5, title: 'Typescript', isDone: false },
   { id: 6, title: 'RTK query', isDone: false },
];

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
   let [tasks, setTasks] = React.useState<TaskType[]>(tasks1);
   const [filter, setFilter] = React.useState<FilterValuesType>('all');

   const removeTask = (id: number) => {
      const newTasks = tasks.filter((t) => t.id !== id);
      setTasks(newTasks);
   };

   const changeFilter = (value: FilterValuesType) => {
      setFilter(value);
   };

   let tasksForTodolist = tasks;

   if (filter === 'completed') {
      tasksForTodolist = tasks.filter((t) => t.isDone === true);
   }
   if (filter === 'active') {
      tasksForTodolist = tasks.filter((t) => t.isDone === false);
   }

   return (
      <div className="App">
         <Todolist
            changeFilter={changeFilter}
            removeTask={removeTask}
            title={'what to learn'}
            tasks={tasksForTodolist}
         />
      </div>
   );
}

export default App;
