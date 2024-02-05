import Carousel from "components/CardsCarousel/Carousel";
import GamesBanner from "./GamesBanner";
import { useDesktopHooks } from "../Desktop.hooks";

export default function Home({ className }: { className: string }) {
  
  useDesktopHooks()

  return (
    <div className={`${className}`}>
      <GamesBanner/>
      <Carousel title="Popular Games"/>
    </div>
  );
}
