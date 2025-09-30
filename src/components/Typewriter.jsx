import { useEffect, useState, useRef } from "react";

const Typewriter = ({ lines, speed = 50 }) => {
  const [displayedLines, setDisplayedLines] = useState(lines.map(() => ""));
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const timeoutRef = useRef(null);

  // Réinitialiser si lines change
  useEffect(() => {
    setDisplayedLines(lines.map(() => ""));
    setCurrentLine(0);
    setCurrentChar(0);
  }, [lines]);

  useEffect(() => {
    if (currentLine >= lines.length) return;

    const lineText = lines[currentLine].text;

    if (currentChar < lineText.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayedLines((prev) => {
          const updated = [...prev];
          updated[currentLine] += lineText[currentChar];
          return updated;
        });
        setCurrentChar((prev) => prev + 1);
      }, speed);
    } else {
      // Passer à la ligne suivante après une petite pause
      timeoutRef.current = setTimeout(() => {
        setCurrentLine((prev) => prev + 1);
        setCurrentChar(0);
      }, speed * 5);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [currentChar, currentLine, lines, speed]);

  return (
    <>
      {displayedLines.map((line, i) => {
        const isActive =
          i === currentLine && currentChar < (lines[i]?.text?.length || 0);
        const isLastAndDone =
          i === lines.length - 1 && currentLine >= lines.length;

        return (
          <span
            key={i}
            className={`hero__typewriter-line ${lines[i]?.className || ""}`}
          >
            {line}
            {(isActive || isLastAndDone) && (
              <span className="hero__cursor-blink" />
            )}
            <br />
          </span>
        );
      })}
    </>
  );
};

export default Typewriter;
