
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
          <span key={index} className={`font-stylized ${highlightColor}`}>
            {segment}
          </span>
        ) : (
          <span key={index}>{segment}</span>
        )
      ))}
    </span>
  );
}
