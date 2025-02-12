
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
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayText('');
    setIsComplete(false);
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex]);
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [text]);

  if (!highlighted) {
    return (
      <span className={`font-stylized ${className} ${isComplete ? 'opacity-100' : 'opacity-80'}`}>
        {displayText}
      </span>
    );
  }

  const parts = displayText.split(highlighted);
  const highlightedText = highlighted?.replace(/"/g, '') || '';

  return (
    <span className={`font-stylized ${className} ${isComplete ? 'opacity-100' : 'opacity-80'}`}>
      {parts.map((part, index) => (
        <span key={index}>
          {part}
          {index < parts.length - 1 && (
            <span className={`font-stylized ${highlightColor}`}>
              {highlightedText}
            </span>
          )}
        </span>
      ))}
    </span>
  );
}
