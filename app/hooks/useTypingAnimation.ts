import { useState, useEffect, useRef } from 'react';

interface UseTypingAnimationOptions {
  speed?: number; // milliseconds per character
  delay?: number; // initial delay before starting
  onComplete?: () => void;
}

export function useTypingAnimation(
  text: string,
  options: UseTypingAnimationOptions = {}
) {
  const { speed = 15, delay = 300, onComplete } = options;
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const indexRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset when text changes
    setDisplayText('');
    setIsComplete(false);
    indexRef.current = 0;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!text) {
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    
    // Initial delay before typing starts
    const startTimeout = setTimeout(() => {
      typeNextChar();
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, delay]);

  const typeNextChar = () => {
    if (indexRef.current < text.length) {
      const currentChar = text[indexRef.current];
      setDisplayText((prev) => prev + currentChar);
      indexRef.current++;
      
      // Randomize speed slightly for more natural feel
      const randomSpeed = speed + (Math.random() * 8 - 4);
      timeoutRef.current = setTimeout(typeNextChar, randomSpeed);
    } else {
      setIsTyping(false);
      setIsComplete(true);
      if (onComplete) onComplete();
    }
  };

  return { displayText, isComplete, isTyping };
}