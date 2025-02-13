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
                segment.toLowerCase() === 'tv girl' ? '#FF69B4' :
                segment.toLowerCase() === 'not allowed' ? '#FF1493' :
                segment.toLowerCase() === 'sweet' ? '#FFD700' :
                segment.toLowerCase() === 'k.' ? '#FF0000' :
                segment.toLowerCase() === 'from the start' ? '#FFA500' :
                segment.toLowerCase() === 'anything' ? '#006400' :
                segment.toLowerCase() === 'arctic monkeys' ? '#FFFAFA' :
                segment.toLowerCase() === 'like him' ? '#0A0A0A' :
                segment.toLowerCase() === 'beabadoobee' ? '#FFB366' :
                segment.toLowerCase() === 'the perfect pair' ? '#FFA07A' : highlightColor,
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