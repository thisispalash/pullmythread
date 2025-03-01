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
  const [ title, setTitle ] = useState('Pull My Thread');

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
    const random = Math.floor(Math.random() * stories.length);
    if (random === index) {
      shuffle();
    } else {
      setIndex(random);
    }
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
    setTitle(data.title);
  }, [index]);

  // Modify the useEffect to handle the telescopic text functionality
  useEffect(() => {
    // Add essential CSS for telescopic functionality
    const style = document.createElement('style');
    style.textContent = `
      .poem span {
        display: none;
      }
      
      .poem span.on {
        display: inline;
      }
      
      .poem p.off {
        display: none;
      }
      
      .poem p.on {
        display: block;
      }
      
      .poem a {
        cursor: pointer;
        text-decoration: underline;
      }
      
      /* Remove the automatic space addition */
      /* .poem span.on::before {
        content: " ";
        white-space: pre;
      } */
    `;
    document.head.appendChild(style);
    
    // This function will be called whenever new content is loaded
    const handleTelescopicLinks = () => {
      console.log("Setting up telescopic links");
      const links = document.querySelectorAll('a[data-o]');
      console.log(`Found ${links.length} telescopic links`);
      
      links.forEach(link => {
        // Remove existing listeners to prevent duplicates
        link.removeEventListener('click', handleTelescopicClick);
        // Add fresh listener
        link.addEventListener('click', handleTelescopicClick);
      });
    };
    
    // Separate the click handler function
    const handleTelescopicClick = (e) => {
      e.preventDefault();
      console.log("Telescopic link clicked");
      
      const link = e.currentTarget;
      const openedby = link.getAttribute('data-o');
      console.log(`Opening elements with data-ob="${openedby}"`);
      
      // Find all elements with matching data-ob attribute
      const elements = document.querySelectorAll(`[data-ob="${openedby}"]`);
      console.log(`Found ${elements.length} elements to reveal`);
      
      elements.forEach(element => {
        console.log(`Revealing element:`, element);
        element.classList.remove('off');
        element.classList.add('on');
      });
      
      // Unwrap the link (replace with its content)
      const parent = link.parentNode;
      if (parent) {
        // Check if we need to add a space after the content
        const nextNode = link.nextSibling;
        const needsSpace = nextNode && 
                           nextNode.nodeType === Node.TEXT_NODE && 
                           nextNode.textContent && 
                           !nextNode.textContent.startsWith(' ');
        
        // Insert link contents
        while (link.firstChild) {
          parent.insertBefore(link.firstChild, link);
        }
        
        // Only add space if needed
        if (needsSpace) {
          const spaceNode = document.createTextNode(' ');
          parent.insertBefore(spaceNode, link);
        }
        
        // Remove the original link
        parent.removeChild(link);
      }
    };

    // Run once DOM is ready
    handleTelescopicLinks();
    
    // Set up a MutationObserver to detect when new content is added
    const observer = new MutationObserver(handleTelescopicLinks);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });
    
    return () => {
      // Clean up the style element when component unmounts
      document.head.removeChild(style);
      observer.disconnect();
      document.querySelectorAll('a[data-o]').forEach(link => {
        link.removeEventListener('click', handleTelescopicClick);
      });
    };
  }, []);

  return (
    <main 
      style={{
        '--color': color,
        '--bg-color': bgColor,
      } as React.CSSProperties}
      className={clsx(
        'h-screen overflow-y-auto text-[var(--color)] bg-[var(--bg-color)]',
        'py-12 flex flex-col items-center gap-8',
      )}
    >
      <span className="text-4xl font-system">{title}</span>
      <div 
        className={clsx(
          'w-4/5 px-32',
          'flex flex-col gap-3',
          'font-user text-lg',
        )}
      >
        {stories[index]()}
      </div>

      <ShuffleButton color={color} bgColor={bgColor} onShuffle={shuffle} />
    </main>
  );
}
