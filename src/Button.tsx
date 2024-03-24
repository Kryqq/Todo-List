type ButtonPropsType = {
   Btntitle: string;
   onClick?: () => void;
};

export const Button = (props: ButtonPropsType) => {

   const handleButtonClick = () => {

      props.onClick && props.onClick();
	 
   };

   return <button onClick={handleButtonClick}>{props.Btntitle}</button>;
};
