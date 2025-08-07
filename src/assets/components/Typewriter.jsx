// src/components/Typewriter.jsx
import { useEffect, useState } from "react";

const Typewriter = ({ lines, speed = 50 }) => {
  const [displayedLines, setDisplayedLines] = useState(lines.map(() => ""));
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (currentLine >= lines.length) {
      setDone(true);
      return;
    }

    if (currentChar < lines[currentLine].text.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const updated = [...prev];
          updated[currentLine] += lines[currentLine].text[currentChar];
          return updated;
        });
        setCurrentChar((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      setCurrentLine((prev) => prev + 1);
      setCurrentChar(0);
    }
  }, [currentChar, currentLine, lines, speed]);

  return (
    <>
      {displayedLines.map((line, i) => {
        const isActive =
          i === currentLine && currentChar < lines[i].text.length;
        const isLastAndDone = i === lines.length - 1 && done;

        return (
          <span
            key={i}
            className={`hero__typewriter-line ${lines[i].className || ""}`}
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
