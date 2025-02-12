interface StylizedTextProps {
  text: string;
  highlighted?: string;
  className?: string;
}

export default function StylizedText({ text, highlighted, className = "" }: StylizedTextProps) {
  if (!highlighted) {
    return <span className={`font-stylized ${className}`}>{text}</span>;
  }

  const parts = text.split(highlighted);
  const highlightedText = highlighted.replace(/"/g, '');

  return (
    <span className={`font-stylized ${className}`}>
      {parts.map((part, index) => (
        <>
          {part}
          {index < parts.length - 1 && (
            <span className="gradient-text font-bold">
              "{highlightedText}"
            </span>
          )}
        </>
      ))}
    </span>
  );
}
