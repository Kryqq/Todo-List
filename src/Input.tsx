import React from 'react';

type InputPropsType = {
   setInputTitle: (title: string) => void;
   onKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => void;
   className: string;
   inputTitle: string;

};

export const Input = (props: InputPropsType) => {
   const inputOnKeyUpHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
      props.onKeyUp(event);
   };
   const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.currentTarget.value.length < 15) {
         let inputTitle = event.currentTarget.value;
         props.setInputTitle(inputTitle);
      } else {
	    alert('Task title must be less than 15 characters');
      }
   };

   return (
      <input
         value={props.inputTitle}
         className={props.className}
         onKeyUp={inputOnKeyUpHandler}
         onChange={inputChangeHandler}
      ></input>
   );
};
