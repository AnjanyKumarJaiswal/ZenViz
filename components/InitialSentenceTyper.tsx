import React, { useState, useEffect, useCallback } from 'react';
import { cn } from "@/lib/utils";


interface Word {
  text: string;
  className: string;
}

interface InitialSentenceTyperProps {
  zenvizSentence: Word[];
  onComplete: () => void;
  charDelayMs: number;
  cursorClassProp: string;
  pauseAfterInitialMs?: number;
}

export const InitialSentenceTyper: React.FC<InitialSentenceTyperProps> = ({
  zenvizSentence,
  onComplete,
  charDelayMs,
  cursorClassProp,
  pauseAfterInitialMs = 500, 
}) => {
  const [typedDisplay, setTypedDisplay] = useState<Word[]>([]);
  const [showCursor, setShowCursor] = useState<boolean>(true);

  const stableOnComplete = useCallback(onComplete, [onComplete]);

  useEffect(() => {
    if (!zenvizSentence || zenvizSentence.length === 0) {
      stableOnComplete(); // Call onComplete immediately if no sentence
      return;
    }

    let currentWordIdx = 0;
    let currentCharInWordIdx = 0;
    let initialTypingTimerId: NodeJS.Timeout | undefined;
    // let cursorBlinkTimerId: NodeJS.Timeout | undefined;
    const cursorBlinkTimerId = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    const typeChar = () => {
      if (currentWordIdx >= zenvizSentence.length) {
        setShowCursor(false);
        initialTypingTimerId = setTimeout(stableOnComplete, pauseAfterInitialMs);
        return;
      }

      const targetWord = zenvizSentence[currentWordIdx];
      const newDisplayArray: Word[] = [];

      for (let i = 0; i < zenvizSentence.length; i++) {
        if (i < currentWordIdx) {
          newDisplayArray.push(zenvizSentence[i]);
        } else if (i === currentWordIdx) {
          newDisplayArray.push({
            ...zenvizSentence[i],
            text: zenvizSentence[i].text.substring(0, currentCharInWordIdx + 1)
          });
        } else {
          newDisplayArray.push({ ...zenvizSentence[i], text: "" });
        }
      }
      setTypedDisplay(newDisplayArray);

      if (currentCharInWordIdx + 1 < targetWord.text.length) {
        currentCharInWordIdx++;
      } else {
        currentWordIdx++;
        currentCharInWordIdx = 0;
      }
      initialTypingTimerId = setTimeout(typeChar, charDelayMs);
    };

    initialTypingTimerId = setTimeout(typeChar, charDelayMs); // Start typing
    // cursorBlinkTimerId = setInterval(() => {
    //   setShowCursor(prev => !prev);
    // }, 500); // Cursor blink speed

    return () => {
      if (initialTypingTimerId) clearTimeout(initialTypingTimerId);
      if (cursorBlinkTimerId) clearInterval(cursorBlinkTimerId);
    };
  }, [zenvizSentence, stableOnComplete, charDelayMs, pauseAfterInitialMs]);

  return (
    <div className="flex space-x-1 my-1 md:my-2">
      {typedDisplay.map((word, idx) => (
        <div key={`custom-initial-word-${idx}`} className={cn(word.className, "whitespace-pre")}>
          {word.text}
        </div>
      ))}
      {showCursor && typedDisplay.length > 0 && <span className={cursorClassProp}></span>}
    </div>
  );
};

export default React.memo(InitialSentenceTyper);