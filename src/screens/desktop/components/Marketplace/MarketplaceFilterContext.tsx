import { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context value
interface FilterContextType {
  filters: string[];
  updateFilters: (selectedFilter: string[]) => void;
}

// Create a context with an undefined initial value but specify the type
const FilterContext = createContext<FilterContextType | undefined>(undefined);

// Props type for the provider to accept children
interface FilterProviderProps {
  children: ReactNode;
}

export function FilterProvider({ children }: FilterProviderProps) {
  const [filters, setFilters] = useState<string[]>([]);

  const updateFilters = (selectedFilters: string[]) => {
    setFilters((currentFilters) => {
      // Create a new set from the current filters for easy addition/removal
      const updatedFilterSet = new Set(currentFilters);
  
      // Loop through the selected filters
      selectedFilters.forEach((filter) => {
        if (updatedFilterSet.has(filter)) {
          // If the filter is already in the set, it means it remains selected, do nothing
        } else {
          // If the filter is not in the set, it's a new selection, add it
          updatedFilterSet.add(filter);
        }
      });
  
      // Filters that are not in the selectedFilters should be removed
      currentFilters.forEach((filter) => {
        if (!selectedFilters.includes(filter)) {
          updatedFilterSet.delete(filter);
        }
      });
  
      // Return the new filters array
      return Array.from(updatedFilterSet);
    });
  };
  

  return (
    <FilterContext.Provider value={{ filters, updateFilters }}>
      {children}
    </FilterContext.Provider>
  );
}

// Custom hook to use the filter context
export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}
