import { ButtonHTMLAttributes } from 'react';

type ButtonPropsType = {
   Btntitle: string;
   callback: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: ButtonPropsType) => {
   const handleButtonClick = () => {
      props.callback();
   };

   return (
      <button className={props.className} onClick={handleButtonClick}>
         {props.Btntitle}
      </button>
   );
};
