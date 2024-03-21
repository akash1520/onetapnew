import Button from "components/Button/Button"
import { FilterProvider, useFilter } from "./MarketplaceFilterContext"

export function MarketBanner(){
  return (
    <div className="flex justify-between relative overflow-hidden border-2">
      <img className="absolute -left-10" src="/shroom_bg.png" alt="dice"/>
      <img className="z-20 h-64 bottom-0 absolute" src="/shroom.png" alt="dice"/>
      <div className="flex ml-80">
      <div className="flex flex-col justify-center gap-2 items-center">
          <h1 className="text-xl font-Impact">Explore Marketplace.  Buy Your favourite gaming items</h1>
          <form className="w-full">
            <input type="text" style={{caretColor:"black"}} className="text-xl h-10 w-full focus:outline-none p-2 bg-[#939393] border-[1px] rounded border-white font-Impact"/>
          </form>
      </div>
      <img className="" src="/dice.png" alt="dice"/>
      </div>
    </div>
  )
}

export const MarketTitleBar: React.FC = () => {
  const { filters, updateFilters } = useFilter();

  // Handle the change for the multi-select dropdown
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  // Construct an array from the selected options
  const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
  // Update the filters with this new array
  updateFilters(selectedOptions);
};

  // Explicitly type your filter options
  const filterOptions: string[] = ['By Genre', 'By Game', 'By Release Date'];

  return (
    <div className="flex py-10 mx-2 justify-between">
      <p className="text-2xl font-Impact">Shop Now</p>
      <div className="flex items-center gap-4">
        <p className="font-Impact text-2xl">Filter</p>
        <select multiple={true} className="focus:outline-none flex text-center bg-[#383838] text-[#C6C6C6] font-Poppins" onChange={handleFilterChange} value={filters}>
          {filterOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export function MarketCard () {
  return (
    <div className="rounded bg-[#FFC3C3] w-fit">
            <div className="flex">
                <img className="w-40" src="/marketplace_cards/image 50.svg" alt=""/>
                <div className="p-2">
                  <img className="" src="/marketplace_icons/pubg.svg" alt=""/>
                  <p className="text-2xl font-Impact">600 UC</p>
                </div>
            </div>
            <div className="bg-[#222222] p-2">
              <h2>PUBG 600 UC</h2>
              <div className="flex items-center gap-2"><img src="/icons/coin.svg" alt=""/> <span>200</span> <span className="line-through text-[#C6C6C6]">500</span> <span className="bg-red-500 px-1">60% off</span> </div>
              <div className="text-red-400"><p>Expires in 2 days.</p></div>
              <div><p>Bought by 200 people today.</p></div>
              <div><Button className="w-full">Buy Now</Button></div>
            </div>
          </div>
  )
}

export default function Marketplace({className}:{className:string}) {
  return (
    <FilterProvider>
      <div className={`${className} pr-5`}>
        <MarketBanner/>
        <MarketTitleBar/>
        <div className="grid grid-cols-4 gap-4 p-2">
            <MarketCard/>
            <MarketCard/>
            <MarketCard/>
            <MarketCard/>
            <MarketCard/>
        </div>
      </div>
    </FilterProvider>
  )
}
