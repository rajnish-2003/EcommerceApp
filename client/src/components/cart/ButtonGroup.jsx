import {  Button, ButtonGroup, styled } from "@mui/material";
import { useState } from "react";
import { useContext } from "react";
import { DataContext } from "../../context/dataProvider";

const Component = styled(ButtonGroup)`      
  margin-top: 30px;
`;

const StyledButton = styled(Button)`      
  border-radius: 50%;
`;

const GroupedButton = () => {

  const {SetQuantity}=useContext(DataContext);

  const [count, setCount] = useState(1);

  SetQuantity(count) 
  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
    
  };

  const handleDecrement = () => {
    if (count > 1) { 
      setCount(prevCount => prevCount - 1);
    }

  
 
  };

  return (
    <Component>
      <StyledButton onClick={handleDecrement}>-</StyledButton>
      <Button disabled>{count}</Button>
      <StyledButton onClick={handleIncrement}>+</StyledButton>
    </Component>
  );
};

export default GroupedButton;
