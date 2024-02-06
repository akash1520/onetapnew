import { t } from 'i18next';
import { ReactNode } from 'react';

type CarouselProps={className?:string, title?:string, children?:ReactNode}

export default function Carousel({className="", children, title="title"}:CarouselProps) {
  return (
    <div className={`${className}`}>
        <h1 className='ml-2 text-2xl font-Impact mt-12 mb-5'>{t(title)}</h1>
        {children}
    </div>
  );
}
