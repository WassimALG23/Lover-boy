import { useState, useEffect } from "react";

interface StylizedTextProps {
  text: string;
  highlighted?: string;
  className?: string;
  highlightColor?: string;
}

export default function StylizedText({ 
  text, 
  highlighted, 
  className = "",
  highlightColor = "text-pink-500"
}: StylizedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isTyping, setIsTyping] = useState(true);
  const [dots, setDots] = useState('.');

  useEffect(() => {
    if (isTyping) {
      const dotsInterval = setInterval(() => {
        setDots(prev => prev === '.' ? '..' : prev === '..' ? '...' : '.');
      }, 500);
      return () => clearInterval(dotsInterval);
    }
  }, [isTyping]);

  useEffect(() => {
    setDisplayText('');
    setIsTyping(true);
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [text]);

  if (!highlighted || !displayText) {
    return (
      <span className={`font-stylized ${className} ${isTyping ? 'opacity-80' : 'opacity-100'}`}>
        {displayText}{isTyping ? dots : ''}
      </span>
    );
  }

  // Special handling for "Not allowed"
  if (text.toLowerCase().includes("not allowed")) {
    const parts = displayText.split(/(not|allowed)/i);
    return (
      <span className={`font-stylized ${className} ${isTyping ? 'opacity-80' : 'opacity-100'}`}>
        {parts.map((part, index) => {
          const lowerPart = part.toLowerCase();
          if (lowerPart === 'not') {
            return (
              <span 
                key={index}
                className="font-bold hover:scale-105 transition-transform"
                style={{
                  color: '#FF69B4',
                  textShadow: '0 0 8px currentColor',
                  animation: 'bounce 1s ease-in-out infinite, glow 2s ease-in-out infinite'
                }}
              >
                {part}
              </span>
            );
          } else if (lowerPart === 'allowed') {
            return (
              <span 
                key={index}
                className="font-bold hover:scale-105 transition-transform"
                style={{
                  color: '#60A5FA',
                  textShadow: '0 0 8px currentColor',
                  animation: 'bounce 1s ease-in-out infinite, glow 2s ease-in-out infinite'
                }}
              >
                {part}
              </span>
            );
          }
          return <span key={index}>{part}</span>;
        })}
        {isTyping ? dots : ''}
      </span>
    );
  }

  const segments = displayText.split(new RegExp(`(${highlighted})`, 'gi'));

  return (
    <span className={`font-stylized ${className} ${isTyping ? 'opacity-80' : 'opacity-100'}`}>
      {segments.map((segment, index) => (
        segment.toLowerCase() === highlighted.toLowerCase() ? (
          <span 
            key={index} 
            className={`font-bold hover:scale-105 transition-transform`}
            style={{ 
              color: 
                segment.toLowerCase() === 'k.' ? '#FF0000' :
                segment.toLowerCase() === 'beabadoobee' ? '#FFB366' :
                segment.toLowerCase() === 'like him' ? '#0A0A0A' :
                segment.toLowerCase() === 'sweet' ? '#FFD700' :
                segment.toLowerCase() === 'from the start' ? '#FFA500' :
                segment.toLowerCase() === 'anything' ? '#006400' :
                segment.toLowerCase() === 'arctic monkeys' ? '#FFFAFA' :
                segment.toLowerCase() === 'want you' ? '#4B0082' : highlightColor,
              textShadow: '0 0 8px currentColor',
              animation: 'bounce 1s ease-in-out infinite, glow 2s ease-in-out infinite'
            }}
          >
            {segment}
          </span>
        ) : (
          <span key={index}>{segment}</span>
        )
      ))}
      {isTyping ? dots : ''}
    </span>
  );
}