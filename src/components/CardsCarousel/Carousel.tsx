import { t } from 'i18next';
import Card from './Card';

export default function Carousel({className, title}:{className?:string, title:string}) {
  return (
    <div className={`${className}`}>
        <h1>{t(title)}</h1>
    <div className='flex overflow-x-scroll my-10 ml-2 mr-20 gap-4'>
      {Array.from({ length: 10 }, (_, i) => (
        <Card key={i} game_name="Pubg" discount={10} offers_count={10} />
      ))}
    </div>
    </div>
  );
}
