'use client';

import React from 'react';

interface ShinyTextProps {
  text: string;
  speed?: number;
  delay?: number;
  color?: string;
  shineColor?: string;
  spread?: number;
  direction?: 'left' | 'right';
  disabled?: boolean;
  className?: string;
}

export default function ShinyText({
  text,
  speed = 2,
  delay = 0,
  color = '#b5b5b5',
  shineColor = '#ffffff',
  spread = 120,
  direction = 'left',
  disabled = false,
  className = '',
}: ShinyTextProps) {
  if (disabled) {
    return <span className={className} style={{ color }}>{text}</span>;
  }

  const animationDuration = `${speed}s`;
  const initialPosition = direction === 'left' ? '-200%' : '200%';
  const finalPosition = direction === 'left' ? '200%' : '-200%';

  return (
    <span className={`relative inline-block ${className}`}>
      <span
        className="shiny-text"
        style={{
          background: `linear-gradient(90deg, ${color} 40%, ${shineColor} 50%, ${color} 60%)`,
          backgroundSize: '200% 100%',
          backgroundPosition: initialPosition,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: `shine ${animationDuration} linear ${delay}s infinite`,
        }}
      >
        {text}
      </span>
      <style jsx>{`
        @keyframes shine {
          0% {
            background-position: ${initialPosition};
          }
          100% {
            background-position: ${finalPosition};
          }
        }
      `}</style>
    </span>
  );
}
