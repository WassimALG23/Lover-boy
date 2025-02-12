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
  highlightColor = "gradient-text"
}: StylizedTextProps) {
  if (!highlighted) {
    return <span className={`font-stylized ${className}`}>{text}</span>;
  }

  const parts = text.split(highlighted);
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
    </span>
  );
}