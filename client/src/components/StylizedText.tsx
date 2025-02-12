
import { useEffect, useState } from "react";

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
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    setDisplayText("");
    setIsTyping(true);

    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex]);
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [text]);

  if (!highlighted) {
    return <span className={`font-stylized ${className}`}>{displayText}</span>;
  }

  const parts = displayText.split(highlighted);
  const highlightedText = highlighted.replace(/"/g, '');

  return (
    <span className={`font-stylized text-lg ${className}`}>
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
      {isTyping && <span className="animate-pulse">|</span>}
    </span>
  );
}
