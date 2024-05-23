import React, { useEffect, useRef } from "react";
import InputBox from "../components/input.component";
import { useTheme } from "../themecontext";
import './styles/background-animation.css';

export default function UserAuthForm({ type }) {
  const backgroundRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const wave = document.createElement('div');
      wave.className = 'cursor-wave';
      wave.style.left = `${clientX - 25}px`;
      wave.style.top = `${clientY - 25}px`;
      document.body.appendChild(wave);

      setTimeout(() => {
        wave.remove();
      }, 1000);
    };

    const createStar = () => {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      backgroundRef.current.appendChild(star);

      setTimeout(() => {
        star.remove();
      }, 5000);
    };

    const createShootingStar = () => {
      const shootingStar = document.createElement('div');
      shootingStar.className = 'shooting-star';
      shootingStar.style.top = `${Math.random() * 100}%`;
      shootingStar.style.left = `${Math.random() * 100}%`;
      backgroundRef.current.appendChild(shootingStar);

      setTimeout(() => {
        shootingStar.remove();
      }, 2000);
    };

    for (let i = 0; i < 100; i++) {
      createStar();
    }

    const shootingStarInterval = setInterval(createShootingStar, 3000);

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(shootingStarInterval);
    };
  }, []);

  return (
    <div className={`relative h-screen overflow-hidden flex items-center justify-center ${theme === "dark" ? "dark" : ""}`}>
      <div ref={backgroundRef} className="bg-animation starfield"></div>
      <section className="relative z-10 h-cover items-center flex justify-center">
        <form className={`w-[80%] max-w-[400px] p-8 rounded-md shadow-lg ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
          <h1 className={`text-4xl font-bold capitalize text-center mb-24 ${theme === "dark" ? "text-white" : "text-black"}`}>
            {type === "sign-in" ? "Welcome back!" : "Join us now!"}
          </h1>

          {type !== "sign-in" && (
            <InputBox
              type="text"
              placeholder="Username"
              value=""
              onChange={() => {}}
              id="username"
              name="username"
              icon="fi-rr-user"
              theme={theme}
            />
          )}
          <InputBox
            type="text"
            placeholder="Email"
            value=""
            onChange={() => {}}
            id="email"
            name="email"
            icon="fi-rr-envelope"
            theme={theme}
          />
          <InputBox
            type="password"
            placeholder="Password"
            value=""
            onChange={() => {}}
            id="password"
            name="password"
            icon="fi-rr-lock"
            theme={theme}
          />
        </form>
      </section>
    </div>
  );
}
