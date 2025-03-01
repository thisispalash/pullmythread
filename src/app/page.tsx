'use client';

import clsx from 'clsx';
import { useState, useEffect } from 'react';


import Amour, { metadata as AmourMetadata } from '@/component/Amour';
import Spliff, { metadata as SpliffMetadata } from '@/component/Spliff';
import Small, { metadata as SmallMetadata } from '@/component/Small';
import Taco, { metadata as TacoMetadata } from '@/component/Taco';

import ShuffleButton from '@/component/Shuffle';

export default function Home() {

  const [ index, setIndex ] = useState(0);
  const [ color, setColor ] = useState('hsl(0,0%,50%)');
  const [ bgColor, setBgColor ] = useState('hsla(0,0%,50%,0.1)');

  const stories = [
    Amour,
    Spliff,
    Small,
    Taco,
  ];

  const metadata = [
    AmourMetadata,
    SpliffMetadata,
    SmallMetadata,
    TacoMetadata,
  ];

  const shuffle = () => {
    console.log('shuffle');
    setIndex(Math.floor(Math.random() * stories.length));
  };

  // const setColor = () => {
  //   const data = metadata[index];
  //   setColor(`hsl(${data.hue}, ${data.saturation}%, 50%)`);
  //   setBgColor(`hsla(${data.hue}, ${data.saturation}%, 50%, 0.1)`);
  // }

  useEffect(() => {
    const data = metadata[index];
    setColor(`hsl(${data.hue}, ${data.saturation}%, 50%)`);
    setBgColor(`hsla(${data.hue}, ${data.saturation}%, 50%, 0.1)`);
  }, [index, metadata]);


  return (
    <main 
      style={{
        '--color': color,
        '--bg-color': bgColor,
      } as React.CSSProperties}
      className='h-screen overflow-y-auto text-[var(--color)] bg-[var(--bg-color)]'
    >
      <div 
        className={clsx(
          'flex flex-col items-center justify-center',
        )}
      >
        {stories[index]()}
      </div>

      <ShuffleButton color={color} bgColor={bgColor} onShuffle={shuffle} />
    </main>
  );
}
