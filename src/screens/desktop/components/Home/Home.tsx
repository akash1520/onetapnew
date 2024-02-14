import Carousel from "components/CardsCarousel/Carousel";
import GamesBanner from "./GamesBanner";
import { useDesktopHooks } from "../Desktop.hooks";
import PopCards from "components/CardsCarousel/PopCards";
import DodCards from "components/CardsCarousel/DodCards";
import Banner from "../../../../components/Banner/Banner";
import CODBanner from "./CODBanner";

export default function Home({ className }: { className: string }) {
  
  useDesktopHooks()

  return (
    <div className={`${className}`}>
      <GamesBanner/>
      <Carousel title="Popular Games">
        <PopCards/>
      </Carousel>
      <Carousel>
        <DodCards/>
      </Carousel>
      <Banner className="ml-2 mr-20" imgSrc="pubg">
        <CODBanner/>
        </Banner>
      <Carousel>
        <DodCards/>
      </Carousel>
    </div>
  );
}
