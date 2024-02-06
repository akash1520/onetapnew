import Button from "components/Button/Button";
import CountDown from "./CountDown";

export default function Banner() {
  return (
    <>
      <div className="bg-[#222222] ml-2 mr-20 my-10 rounded grid grid-cols-2">
        <div className="col-span-1">
          <img className="w-full p-5" src="/banners/pubg.png" alt="" />
        </div>
        <div className="my-10 relative mx-5">
          <div>
            <h1 className="text-[32px] font-Impact">COD Warzone 2000 Points</h1>
            <div className="flex gap-1">
              <img className="" src="/icons/coin.svg" alt="" />
              <p className="font-Impact">200</p>
              <p className="line-through text-[#C6C6C6] font-Inter">500</p>
            </div>
            <Button className="px-2 py-2 border-none my-5">
              Don't Miss, Buy Now
            </Button>
          </div>
          <div>
            <h1 className="font-Poppins font-[600]">
              Grab the offer now,{" "}
              <span className="text-red-400">Expiring Soon!</span>{" "}
            </h1>
          </div>
          <div className="flex justify-start mx-8 my-2">
            <CountDown />
          </div>
        </div>
        <div className="absolute right-0">
          <img
            src="/icons/coin_point1.svg"
            className="relative -right-16 -top-1"
            alt=""
          />
          <img
            src="/icons/coin_point.svg"
            className=" relative -right-[7.2rem] -top-32"
            alt=""
          />
          <div className="relative w-[18rem] -top-[14rem] right-20">
            <img className="rounded" src="/yellow_block.png" alt=""/>
          </div>
        </div>
      </div>
    </>
  );
}
