
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!highlighted) {
    return (
      <span 
        className={`font-stylized ${className} transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        {text}
      </span>
    );
  }

  const parts = text.split(highlighted);
  const highlightedText = highlighted?.replace(/"/g, '') || '';

  return (
    <span 
      className={`font-stylized ${className} transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
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
