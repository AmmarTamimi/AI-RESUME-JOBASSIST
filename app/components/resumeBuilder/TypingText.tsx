'use client';

import React, { useEffect, useState, useRef } from 'react';

interface TypingTextProps {
  text: string;
  isTyping?: boolean;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export function TypingText({
  text,
  isTyping = false,
  speed = 15,
  delay = 300,
  className = "",
  onComplete
}: TypingTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const indexRef = useRef(0);
  const textRef = useRef(text);

  // Reset when text changes
  useEffect(() => {
    // Clear any existing timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Reset state
    setDisplayText('');
    setIsComplete(false);
    setIsAnimating(false);
    indexRef.current = 0;
    textRef.current = text;

    if (!text) return;

    // If not typing, show full text immediately
    if (!isTyping) {
      setDisplayText(text);
      setIsComplete(true);
      return;
    }

    // Start typing animation
    setIsAnimating(true);

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
  }, [text, isTyping, delay]);

  const typeNextChar = () => {
    const currentText = textRef.current;
    
    if (indexRef.current < currentText.length) {
      const nextChar = currentText[indexRef.current];
      setDisplayText(prev => prev + nextChar);
      indexRef.current++;
      
      // Random speed variation for natural feel
      const randomSpeed = speed + (Math.random() * 10 - 5);
      const minSpeed = 8;
      const maxSpeed = 40;
      const finalSpeed = Math.min(Math.max(randomSpeed, minSpeed), maxSpeed);
      
      timeoutRef.current = setTimeout(typeNextChar, finalSpeed);
    } else {
      setIsComplete(true);
      setIsAnimating(false);
      if (onComplete) onComplete();
    }
  };

  // If text is empty, show nothing
  if (!text) return null;

  // If not typing and we have text, show full text
  if (!isTyping && text) {
    return <div className={className}>{text}</div>;
  }

  return (
    <div className={`typing-text ${className}`}>
      {displayText}
      {isAnimating && !isComplete && (
        <span className="inline-block w-0.5 h-4 bg-purple-500 ml-0.5 animate-pulse" style={{ display: 'inline-block' }} />
      )}
    </div>
  );
}