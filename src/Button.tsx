type ButtonPropsType = {
   Btntitle: string;
   onClick: () => void;
   className?: string;
};

export const Button = (props: ButtonPropsType) => {
	
   const handleButtonClick = () => {
      props.onClick && props.onClick();
   };

   return <button className={props.className} onClick={handleButtonClick}>{props.Btntitle}</button>;
};
