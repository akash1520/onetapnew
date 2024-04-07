import { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context value, now to hold a single string filter value
interface MarketPlaceFilterContextType {
  filter: string;
  updateFilter: (selectedFilter: string) => void;
}

// Create a context with an undefined initial value but specify the type
const MarketPlaceFilterContext = createContext<MarketPlaceFilterContextType | undefined>(undefined);

// Props type for the provider to accept children
interface FilterProviderProps {
  children: ReactNode;
}

export function FilterProvider({ children }: FilterProviderProps) {
  const [filter, setFilter] = useState<string>(''); // State to hold a single filter

  const updateFilter = (selectedFilter: string) => {
    setFilter(selectedFilter); // Update the filter directly
  };

  return (
    <MarketPlaceFilterContext.Provider value={{ filter, updateFilter }}>
      {children}
    </MarketPlaceFilterContext.Provider>
  );
}

// Custom hook to use the filter context
export function useFilter() {
  const context = useContext(MarketPlaceFilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}
