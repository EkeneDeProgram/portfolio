"use client";

import { useState, useEffect } from "react";

type Keyword = {
  text: string;
  color: string;
};

interface Props {
  keywords: Keyword[];
}

const HighlightKeywords: React.FC<Props> = ({ keywords }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [keywordIndex, setKeywordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentKeyword = keywords[keywordIndex].text;

    if (charIndex < currentKeyword.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentKeyword[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 80);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedText("");
        setCharIndex(0);
        setKeywordIndex((prev) => (prev + 1) % keywords.length);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, keywordIndex, keywords]);

  return (
    <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold leading-tight ${keywords[keywordIndex].color}`}>
      <span>{displayedText}</span>
      <span className="animate-pulse">|</span>
    </h1>
  );
};

export default HighlightKeywords;
