import React, { useEffect, useState } from 'react';

const AnimatedText = () => {
  const [textToType, setTextToType] = useState("")
  

  useEffect(() => {
    setTimeout(() => {
      setTextToType("H");
    }, 100);
    setTimeout(() => {
      setTextToType("Ho");
    }, 200);
    setTimeout(() => {
      setTextToType("How");
    }, 300);
    setTimeout(() => {
      setTextToType("How ");
    }, 400);
    setTimeout(() => {
      setTextToType("How m");
    }, 500);
    setTimeout(() => {
      setTextToType("How mu");
    }, 600);
    setTimeout(() => {
      setTextToType("How muc");
    }, 700);
    setTimeout(() => {
      setTextToType("How much");
    }, 800);
    setTimeout(() => {
      setTextToType("How much ");
    }, 900);
    setTimeout(() => {
      setTextToType("How much d");
    }, 1000);
    setTimeout(() => {
      setTextToType("How much do ");
    }, 1100);
    setTimeout(() => {
      setTextToType("How much do y");
    }, 1200);
    setTimeout(() => {
      setTextToType("How much do yo");
    }, 1300);
    setTimeout(() => {
      setTextToType("How much do yo");
    }, 1400);
    setTimeout(() => {
      setTextToType("How much do you");
    }, 1500);
    setTimeout(() => {
      setTextToType("How much do you ");
    }, 1600);
    setTimeout(() => {
      setTextToType("How much do you r");
    }, 1700);
    setTimeout(() => {
      setTextToType("How much do you re");
    }, 1800);
    setTimeout(() => {
      setTextToType("How much do you rea");
    }, 1900);
    setTimeout(() => {
      setTextToType("How much do you real");
    }, 2000);
    setTimeout(() => {
      setTextToType("How much do you reall");
    }, 2100);
    setTimeout(() => {
      setTextToType("How much do you really");
    }, 2200);
    setTimeout(() => {
      setTextToType("How much do you really ");
    }, 2300);
    setTimeout(() => {
      setTextToType("How much do you really K");
    }, 2400);
    setTimeout(() => {
      setTextToType("How much do you really Kn");
    }, 2500);
    setTimeout(() => {
      setTextToType("How much do you really Kno");
    }, 2600);
    setTimeout(() => {
      setTextToType("How much do you really know");
    }, 2700);
    setTimeout(() => {
      setTextToType("How much do you really know?");
    }, 2800);
  }, []);

  return (
    <div className="animated-text">
      <p>
        {textToType} 
      </p>
    </div>
  );
};

export default AnimatedText;
