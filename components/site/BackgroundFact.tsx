"use client";

import React from "react";
import Container from "./Container";

interface BackgroundFactProps {
  title: string;
  imagePath: string;
  text: string;
  subText: string;
}

const BackgroundFact: React.FC<BackgroundFactProps> = ({
  title,
  imagePath,
  text,
  subText,
}) => {
  return (
    <section
      className="w-full flex items-center justify-center py-10 sm:py-16 px-4"
      style={{
        backgroundImage: `url(${imagePath})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Semi-transparent overlay for readability */}
      <div className="absolute inset-0 bg-black/30 rounded-xl pointer-events-none"></div>

      <Container className="relative z-10 flex justify-center">
        {/* Card */}
        <div className="bg-white/95 backdrop-blur-sm text-gray-800 shadow-xl rounded-xl p-5 sm:p-8 md:p-10 w-full sm:w-[90%] md:w-[70%] lg:w-[60%] max-w-3xl">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#00C896] mb-3 sm:mb-4 text-center md:text-left break-words">
            {title}
          </h2>

          <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 break-words">
            {text}
          </p>

          <p className="text-gray-700 text-sm sm:text-base leading-relaxed break-words">
            {subText}
          </p>
        </div>
      </Container>
    </section>
  );
};

export default BackgroundFact;
