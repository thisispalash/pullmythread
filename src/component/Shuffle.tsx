// import { useReader } from '@/context/ReaderContext';
// import { cn } from '@/lib/shadcn';
import clsx from 'clsx';

function ShuffleIcon() {
  
  /* Courtesy of Tabler Icons (https://tabler.io/icons/icon/arrows-shuffle) */

  return (
    <svg  
      xmlns="http://www.w3.org/2000/svg"  
      width="100%"  
      height="100%"  
      viewBox="0 0 24 24"  
      fill="none"  
      stroke="currentColor"  
      strokeWidth={1.75}  
      strokeLinecap="round"  
      strokeLinejoin="round"  
      className="icon icon-tabler icons-tabler-outline icon-tabler-arrows-shuffle"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M18 4l3 3l-3 3" />
      <path d="M18 20l3 -3l-3 -3" />
      <path d="M3 7h3a5 5 0 0 1 5 5a5 5 0 0 0 5 5h5" />
      <path d="M21 7h-5a4.978 4.978 0 0 0 -3 1m-4 8a4.984 4.984 0 0 1 -3 1h-3" />
    </svg>
  );
}

export default function ShuffleButton({ color, bgColor, onShuffle }: { color: string, bgColor: string, onShuffle: () => void }) {

  // const { getForeground, getBackground } = useReader();

  return (
    <button
      style={{
        '--shuffle-color': color,
        '--shuffle-hover-color': bgColor,
      } as React.CSSProperties}
      className={clsx(
        'h-20 w-20 p-2 cursor-pointer',
        'fixed right-0 bottom-0 m-6',
        'flex items-center justify-center',
        'transition-all duration-200',
        'text-[var(--shuffle-color)] hover:text-[var(--shuffle-hover-color)]',
      )}
      onClick={onShuffle}
    >
      <ShuffleIcon />
    </button>
  );
}