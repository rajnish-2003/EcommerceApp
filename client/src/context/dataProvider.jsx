import { createContext, useState } from "react";

export const DataContext=createContext();

const DataProvider=({children})=>{

    const [account,setAccount]=useState('');
    const [user,setUser]=useState('');
    const[order,SetOrders]=useState([]);
    const[Quantity,SetQuantity]=useState(1);

    return(
        <DataContext.Provider value={{
            account,
            setAccount,
            user,
            setUser,
            order,
            SetOrders,
            Quantity,
            SetQuantity

        }}>
         {children}
        </DataContext.Provider>
    )
}

export default DataProvider;