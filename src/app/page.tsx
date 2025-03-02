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
  const [ remountKey, setRemountKey ] = useState(0);

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
    setRemountKey(prev => prev + 1);
    
    const random = Math.floor(Math.random() * stories.length);
    if (random === index) {
      setTimeout(() => shuffle(), 0);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // Modify the useEffect to handle the telescopic text functionality
  useEffect(() => {
    console.log("Setting up telescopic text functionality");
    
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
    `;
    
    // Only add the style if it doesn't already exist
    if (!document.getElementById('telescopic-style')) {
      style.id = 'telescopic-style';
      document.head.appendChild(style);
    }
    
    // This function will be called whenever new content is loaded
    const handleTelescopicLinks = () => {
      console.log("Setting up telescopic links");
      const links = document.querySelectorAll('a[data-o]');
      console.log(`Found ${links.length} telescopic links`);
      
      links.forEach(link => {
        // Remove existing listeners to prevent duplicates
        link.removeEventListener('click', handleTelescopicClick as EventListener);
        // Add fresh listener
        link.addEventListener('click', handleTelescopicClick as EventListener);
      });
    };
    
    // Separate the click handler function
    const handleTelescopicClick = (e: MouseEvent) => {
      e.preventDefault();
      console.log("Telescopic link clicked");
      
      const link = e.currentTarget as HTMLElement;
      if (!link) return; // Safety check
      
      const openedby = link.getAttribute('data-o');
      if (!openedby) return; // Safety check
      
      console.log(`Opening elements with data-ob="${openedby}"`);
      
      // Find all elements with matching data-ob attribute
      const elements = document.querySelectorAll(`[data-ob="${openedby}"]`);
      console.log(`Found ${elements.length} elements to reveal`);
      
      elements.forEach(element => {
        console.log(`Revealing element:`, element);
        element.classList.remove('off');
        element.classList.add('on');
      });
      
      try {
        // Get the parent node
        const parent = link.parentNode;
        if (!parent) return; // Safety check
        
        // Create a document fragment to hold the link's contents
        const fragment = document.createDocumentFragment();
        
        // Move all child nodes to the fragment
        while (link.firstChild) {
          fragment.appendChild(link.firstChild);
        }
        
        // Insert the fragment before the link
        parent.insertBefore(fragment, link);
        
        // Add a space if needed (check if the next node is text and doesn't start with punctuation)
        const nextNode = link.nextSibling;
        if (nextNode && 
            nextNode.nodeType === Node.TEXT_NODE && 
            nextNode.textContent && 
            !/^[\s.,;:!?'"()-]/.test(nextNode.textContent)) {
          parent.insertBefore(document.createTextNode(' '), link);
        }
        
        // Remove the link
        parent.removeChild(link);
      } catch (error) {
        console.error("Error handling telescopic click:", error);
      }
    };

    // Initial setup with a delay to ensure DOM is ready
    const setupTimeout = setTimeout(handleTelescopicLinks, 100);
    
    // Set up a MutationObserver to detect when new content is added
    const observer = new MutationObserver(() => {
      setTimeout(handleTelescopicLinks, 100);
    });
    
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });
    
    // Return cleanup function
    return () => {
      console.log("Cleaning up telescopic text functionality");
      
      // Clear the setup timeout
      clearTimeout(setupTimeout);
      
      // Disconnect observer
      try {
        observer.disconnect();
        console.log("Observer disconnected");
      } catch (error) {
        console.error("Error disconnecting observer:", error);
      }
      
      // Remove event listeners
      try {
        document.querySelectorAll('a[data-o]').forEach(link => {
          link.removeEventListener('click', handleTelescopicClick as EventListener);
        });
        console.log("Event listeners removed");
      } catch (error) {
        console.error("Error removing event listeners:", error);
      }
    };
  }, [remountKey]);

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
      <span className="w-3/5 text-left text-4xl font-system">{title}</span>
      <div 
        className={clsx(
          'w-4/5 px-32',
          'flex flex-col gap-3',
          'font-user text-lg',
        )}
        key={remountKey}
      >
        {stories[index]()}
      </div>

      <ShuffleButton color={color} bgColor={bgColor} onShuffle={shuffle} />
    </main>
  );
}
