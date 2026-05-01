
import React from 'react';

interface HouseIconProps {
  house: string;
  className?: string;
}

const housePeriodMap: { [key: string]: string } = {
    'Capet': 'Capetian',
    'Valois': 'Valois',
    'Bourbon': 'Bourbon',
    'Orléans': 'Bourbon',
    'Bonaparte': 'Empires & Restoration',
    'Republic': 'Republics',
};

const HouseIcon: React.FC<HouseIconProps> = ({ house, className }) => {
  const period = housePeriodMap[house] || 'default';

  let icon;

  switch (period) {
    case 'Capetian':
    case 'Valois':
      icon = ( // Fleur-de-lis
        <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Fleur-de-lis Icon">
          <path d="M10.133 0C10.133 0 9.132 1.94 9.132 4.286C9.132 6.631 10.133 7.778 10.133 7.778C10.133 7.778 11.133 6.631 11.133 4.286C11.133 1.94 10.133 0 10.133 0ZM5.52 3.49C5.52 3.49 5.853 4.671 6.521 5.833C7.189 7.000 8.19 7.778 8.19 7.778V14L10.133 15.556L12.077 14V7.778C12.077 7.778 13.078 7 13.746 5.833C14.414 4.667 14.747 3.49 14.747 3.49L10.133 6.222L5.52 3.49Z" />
        </svg>
      );
      break;
    case 'Bourbon':
      icon = ( // Crown
        <svg viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Crown Icon">
          <path d="M139.1,128.3,128,141.4,140.9,153a93.3,93.3,0,0,1,28.2,28.2l-11.9,13.2,13.1,11.1,11.9-13.2a93.3,93.3,0,0,1,28.2,28.2l-11.9,13.2,13.1,11.1,11.9-13.2A93.2,93.2,0,0,1,284,233.9l11.9,13.2,13.1-11.1-11.9-13.2a93.2,93.2,0,0,1,28.2-28.2l11.9,13.2,13.1-11.1L340.9,153a93.3,93.3,0,0,1,28.2-28.2L384,141.4,372.9,128.3a93.3,93.3,0,0,1-28.2,28.2l-11.9-13.2-13.1,11.1,11.9,13.2a93.3,93.3,0,0,1-28.2,28.2l-11.9-13.2-13.1,11.1,11.9,13.2a93.2,93.2,0,0,1-56.4,0l11.9-13.2-13.1-11.1,11.9,13.2a93.2,93.2,0,0,1-28.2-28.2l-11.9-13.2-13.1,11.1,11.9,13.2a93.3,93.3,0,0,1-28.2-28.2Z"/>
          <path d="M432,208,312.3,242.1,256,192,200.7,241.1,80,208,48,352H464Z"/>
        </svg>
      );
      break;
    case 'Empires & Restoration':
       icon = ( // Imperial Eagle
        <svg viewBox="0 0 640 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Imperial Eagle Icon">
          <path d="M576.4 39.2c-9.8-14.7-25.2-24.9-42-28.7-27.5-6.2-56.1 1.4-78.2 18.9-20.4 16.1-38.6 36.9-54.3 61.3-13.6-21.3-32.2-40.4-53.1-55.7-21-15.3-46-21.9-70.8-18-18.1 2.8-34.7 11.1-48.4 23.3-18.1 16-30.2 38.6-34.8 63.3-3.6 19.3 1 39.2 11.1 56.7 13.5 23.7 33.3 43.1 58.2 55.4-25.4 18.2-44.5 43.7-54.8 73.1-5.7 16.2-8.3 33.6-7.5 50.9 1.3 26.6 11.7 51.9 29.8 72.8 19.7 22.6 47.9 36.4 78.4 38.3 3.6 .2 7.2 .3 10.8 .3 10.2 0 20.4-.8 30.4-2.4 22.8-3.6 44.9-10.8 65.4-21.2 22-11.1 41.8-25.2 58.7-41.8 17-16.6 31-35.3 41.5-55.7 10.4-20.4 17.2-42.2 19.8-64.6 1.5-12.6.8-25.2-1.9-37.5-16.1 3.2-32.8 4.8-49.9 4.8-21.8 0-43.2-2.8-63.8-8.2-19.8-5.2-38.7-12.8-56.3-22.6-21.8-12-41-26.9-56.9-44.2 14.5-12.8 31.4-23.2 49.9-30.5 16.2-6.4 33.2-10.3 50.7-11.4 46.2-2.9 89.1 12.6 122.1 42.1 13.9 12.4 29.5 22.9 46.6 31.2 5.5 2.7 11.2 5.1 16.9 7.2 9.4 3.4 19.3 5.1 29.3 5.1 34.4 0 66.3-15.6 88.5-41.4 15.3-17.8 24.2-39.7 25.7-62.5 .3-4.2.1-8.5-.8-12.7z"/>
        </svg>
      );
      break;
    case 'Republics':
        icon = ( // Phrygian cap
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Phrygian Cap Icon">
            <path d="M12.94,2.62A5.44,5.44,0,0,0,8.15,1.5a5.1,5.1,0,0,0-5,5.19,5.22,5.22,0,0,0,2.4,4.24L2,22H22L12.94,2.62Z"/>
          </svg>
        );
        break;
    default:
      icon = null;
  }

  return icon;
};

export default HouseIcon;