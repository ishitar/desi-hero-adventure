
import React from 'react';
import { useGame } from '@/context/GameContext';

interface LogoProps {
  type: string;
  x: number;
  y: number;
  width: number;
}

const BuildingLogos: React.FC = () => {
  const { decorations, worldPosition } = useGame();
  
  const renderLogo = ({ type, x, y, width }: LogoProps) => {
    // Calculate positions based on building type and size
    const logoSize = width * 0.3;
    const logoX = x + (width / 2) - (logoSize / 2);
    const logoY = y + (width * 0.2); // Position logo near the top of building
    
    // Apply parallax scrolling based on world position
    const adjustedX = logoX - (worldPosition.current * 0.9);
    
    // Only render logos for buildings that are visible on screen
    if (adjustedX < -logoSize || adjustedX > window.innerWidth + logoSize) {
      return null;
    }
    
    // Define company based on building type
    let company = '';
    let logoSvg = null;
    
    switch (type) {
      case 'temple':
        company = 'Apple';
        logoSvg = (
          <svg viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" 
              fill="currentColor"
            />
          </svg>
        );
        break;
      case 'mosque':
        company = 'Microsoft';
        logoSvg = (
          <svg viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h11v11H0z" fill="#F25022"/>
            <path d="M12 0h11v11H12z" fill="#7FBA00"/>
            <path d="M0 12h11v11H0z" fill="#00A4EF"/>
            <path d="M12 12h11v11H12z" fill="#FFB900"/>
          </svg>
        );
        break;
      case 'gurudwara':
        company = 'Samsung';
        logoSvg = (
          <svg viewBox="0 0 5200 1000" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M307.8,197.1v348.9c0,117.3,94.3,117.3,212.2,117.3c118,0,212.2,0,212.2-117.3V197.1h182.6v385.6c0,248-230.8,266.6-394.8,266.6c-164,0-394.8-18.6-394.8-266.6V197.1H307.8z M1602.4,827.7h-182.6l-116-188.2h-228v188.2h-182.6V197.1c95-3.7,190-6.8,285-6.8c150.1,0,339.5,18.6,339.5,212.9c0,91.9-53.5,155-134.7,182.6L1602.4,827.7z M1164.5,296v242.1h102.1c69.8,0,156.5-13,156.5-121.1c0-108.1-86.8-121.1-156.5-121.1H1164.5z M1706.4,197.1h505v99.6h-322.4v117.3h285v95.7h-285v117.3h322.4V827H1706.4V197.1z M2251.6,197.1h182.6v438.5h322.4V827h-505V197.1z M3032.1,640.1l148.4-443h195.5l-245.5,630.5h-196.9L2688.2,197.1h195.5L3032.1,640.1z M3499.5,197.1h505v99.6h-322.4v117.3h285v95.7h-285v117.3h322.4V827h-505V197.1z M4060.6,827.7V197.1h182.6v529.8h282.5V827L4060.6,827.7z"
              fill="currentColor"
            />
          </svg>
        );
        break;
      case 'google-temple':
        company = 'Google';
        logoSvg = (
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="#4285F4"/>
          </svg>
        );
        break;
      case 'adobe-temple':
        company = 'Adobe';
        logoSvg = (
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.58 3H22v18L14.58 3zM2 3h7.42L2 21V3zm7.84 9.13h3.32l-1.66 3.95h2.42L12.26 21l-4.59-9.13h2.17z" fill="#ED2224"/>
          </svg>
        );
        break;
      default:
        return null;
    }
    
    return (
      <div 
        className="logo-container"
        style={{
          position: 'absolute',
          left: `${adjustedX}px`,
          top: `${logoY}px`,
          width: `${logoSize}px`,
          height: `${logoSize}px`,
          zIndex: 10
        }}
      >
        {/* Logo background circle for better visibility */}
        <div className="bg-white rounded-full w-full h-full p-2 flex flex-col items-center justify-center shadow-lg">
          <div className="w-3/4 h-3/4 text-blue-900">
            {logoSvg}
          </div>
          <div className="text-xs font-bold mt-1 text-black">
            {company}
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="building-logos">
      {decorations.map(building => {
        if (['temple', 'mosque', 'gurudwara', 'google-temple', 'adobe-temple'].includes(building.type)) {
          return (
            <React.Fragment key={`logo-${building.id}`}>
              {renderLogo({
                type: building.type,
                x: building.x,
                y: building.y,
                width: building.width
              })}
            </React.Fragment>
          );
        }
        return null;
      })}
    </div>
  );
};

export default BuildingLogos;
