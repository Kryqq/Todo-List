import { FilterValuesType } from './App';
import { Button } from './Button';

export type TaskType = {
   id: number;
   title: string;
   isDone: boolean;
};
export type TodolistType = {
   title: string;
   tasks: Array<TaskType>;
   removeTask: (id: number) => void;
   changeFilter: (value: FilterValuesType) => void;
};

export const Todolist = (props: TodolistType) => {
	
   return (
      <div>
         <h3>{props.title}</h3>
         <div>
            <input />
            <Button Btntitle={'+'} />
         </div>
         {props.tasks.length === 0 ? (
            <p>Тасок нет</p>
         ) : (
            <ul>
               {props.tasks.map((task) => {
				// const handleRemoveTask = () => {
				// 	props.removeTask(task.id)
				// }

                  return (
                     <li key={task.id}>
                        <input checked={task.isDone} type="checkbox" ></input>
                        <span>{task.title}</span>
                        <Button onClick={()=>props.removeTask(task.id)} Btntitle={'X'}></Button>
                     </li>
                  );
               })}
            </ul>
         )}

         <div>
            <Button onClick={() => props.changeFilter('all')} Btntitle={'All'} />
            <Button onClick={() => props.changeFilter('active')} Btntitle={'Active'} />
            <Button onClick={() => props.changeFilter('completed')} Btntitle={'Completed'} />
         </div>
      </div>
   );
};

