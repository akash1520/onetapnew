import { ReactNode, useContext, useState } from "react";
import { createContext } from "react";

// Define the type for the active route
interface FilterContextValue {
    gameId: string;
    handleFilterChange: (newGameId: string) => void;
  }
  
  // Create the typed context with the defined interface
  export const FilterContext = createContext<FilterContextValue>(undefined as unknown as FilterContextValue);
  
  
  export const FilterProvider = ({children}:{children:ReactNode})=>{
    const [gameId, setGameId] = useState("")
  
    const handleFilterChange = (newGameId:string)=>{
      setGameId(newGameId)
    }
  
    return (
      <FilterContext.Provider value={{ gameId, handleFilterChange }}>
        {children}
      </FilterContext.Provider>
    );
  }
  
  export const useFilterContext = ()=>{
    const {gameId, handleFilterChange} = useContext(FilterContext);
    return {gameId, handleFilterChange};
  }