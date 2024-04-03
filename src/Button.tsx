type ButtonPropsType = {
   Btntitle: string;
   callback: () => void;
   className?: string;
};

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
