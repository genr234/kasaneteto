"use client";

import React, { useEffect, useState, useRef } from "react";

const CuteMovingImagesPage = () => {
  const [positions, setPositions] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Responsive number of images based on screen size
    const imageCount = 15;

    const initialPositions = Array.from({ length: imageCount }, (_, i) => ({
      id: i,
      x: Math.random() * 90, // % of viewport width
      y: Math.random() * 90, // % of viewport height
      speedX: (Math.random() - 0.5) * 0.6, // slower for better performance
      speedY: (Math.random() - 0.5) * 0.6,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.5,
      scale: 0.4 + Math.random() * 0.4, // slightly smaller
    }));

    setPositions(initialPositions);

    const interval = setInterval(() => {
      setPositions((prevPositions) =>
        prevPositions.map((pos) => {
          let newX = pos.x + pos.speedX;
          let newY = pos.y + pos.speedY;

          // Bounce off edges
          let newSpeedX = pos.speedX;
          let newSpeedY = pos.speedY;

          if (newX <= 0 || newX >= 90) {
            newSpeedX = -newSpeedX;
            newX = Math.max(0, Math.min(90, newX));
          }

          if (newY <= 0 || newY >= 90) {
            newSpeedY = -newSpeedY;
            newY = Math.max(0, Math.min(90, newY));
          }

          const newRotation = (pos.rotation + pos.rotationSpeed) % 360;

          return {
            ...pos,
            x: newX,
            y: newY,
            speedX: newSpeedX,
            speedY: newSpeedY,
            rotation: newRotation,
          };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current
          .play()
          .catch((e) => console.log("Audio playback prevented:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-200 via-pink-300 to-purple-200">
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Animated bubbles */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-pink-100 opacity-40 animate-pulse"></div>
        <div
          className="absolute top-3/4 left-1/2 w-24 h-24 rounded-full bg-purple-100 opacity-30 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-pink-100 opacity-30 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Shapes */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-purple-200 opacity-40 rounded-lg rotate-12"></div>
        <div className="absolute bottom-20 left-10 w-16 h-16 bg-pink-200 opacity-50 rounded-lg -rotate-12"></div>

        {/* Decorative patterns */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ff9ec3 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          ></div>
        </div>
      </div>

      {/* Main content - centered and responsive */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full min-h-screen p-4">
        <div className="p-6 md:p-8 text-center bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg w-full max-w-md mx-auto my-8">
          <h1 className="text-3xl md:text-4xl font-bold text-pink-500 mb-3">
            Chi è veramente Kasane Teto?? 🤔
          </h1>
          <p className="text-base md:text-lg text-pink-700 mb-4">
            MISTERO RIVELATO!! 🕵️‍♀️ Organizzazioni internazionali cercano di
            catturare questa creatura da anni! Hai informazioni segrete o vuoi
            solo mandare un messaggio a Teto? Scrivilo qui sotto e forse ti
            risponderà... (o forse no!) ✨
          </p>

          <button className="mt-4 px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold rounded-full transform transition-all duration-300 hover:scale-105 shadow-lg border-2 border-pink-300 hover:border-pink-200 focus:outline-none w-full md:w-auto">
            <div className="flex items-center justify-center">
              <span className="mr-2">✉️</span>
              <span>Manda un messaggio a Teto!</span>
              <span className="ml-2">💕</span>
            </div>
          </button>
        </div>
      </div>

      {/* Moving Teto images */}
      {positions.map((pos) => (
        <div
          key={pos.id}
          className="absolute pointer-events-none"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            transform: `rotate(${pos.rotation}deg) scale(${pos.scale})`,
            transition: "transform 0.5s ease-out",
            zIndex: 0,
          }}
        >
          <img
            src="https://files.catbox.moe/9k10ff.png"
            alt="tetooo"
            className="w-12 h-12 md:w-16 md:h-16 object-contain"
            loading="lazy"
          />
        </div>
      ))}

      {/* Audio control button - fixed position for mobile */}
      <div className="fixed bottom-4 right-4 z-30">
        <button
          onClick={togglePlay}
          className="bg-white bg-opacity-90 p-3 rounded-full shadow-lg border-2 border-pink-300 hover:border-pink-400 transition-all duration-300 transform hover:scale-110"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <span className="text-xl md:text-2xl">🎵</span>
          ) : (
            <span className="text-xl md:text-2xl">🔇</span>
          )}
        </button>
      </div>

      {/* Flying heart decorations */}
      <div
        className="absolute top-1/3 left-10 animate-bounce text-2xl"
        style={{ animationDuration: "3s" }}
      >
        💖
      </div>
      <div
        className="absolute bottom-1/4 right-10 animate-bounce text-2xl"
        style={{ animationDuration: "2.5s", animationDelay: "0.5s" }}
      >
        💗
      </div>
      <div
        className="absolute top-1/4 right-1/4 animate-bounce text-2xl"
        style={{ animationDuration: "4s", animationDelay: "1s" }}
      >
        💘
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef} src="https://files.catbox.moe/0u7xhf.mp3" loop />
    </div>
  );
};

export default CuteMovingImagesPage;
