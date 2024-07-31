'use client';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  desktop: {
    breakpoint: { max: 4000, min: 576 },
    items: 6,
  },
  mobile: {
    breakpoint: { max: 576, min: 0 },
    items: 4,
  },
};

export default function ScrollableBar({ children }: { children: React.ReactNode }) {
  return (
    <Carousel containerClass='flex gap-4 p-4 overflow-x-auto w-full' responsive={responsive}>
      {children}
    </Carousel>
  );
}
