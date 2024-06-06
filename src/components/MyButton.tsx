import { ButtonHTMLAttributes } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import React from 'react';
type ButtonPropsType = {
   Btntitle: string;
   onClick: () => void;
   color: 'primary' | 'secondary' | 'error' | 'success' | 'info' | 'warning' | 'inherit';
   variant: 'text' | 'outlined' | 'contained';
} & ButtonProps;

export const MyButton = React.memo((props: ButtonPropsType) => {
   const handleButtonClick = () => {
      props.onClick();
   };

   return (
      <Button variant={props.variant} color={props.color} onClick={handleButtonClick}>
         {props.Btntitle}
      </Button>
   );
});
