//занимация и выбор звездочек
import React, { useState, useEffect } from 'react';

export const useStars = () => {
  const [selectedStars, setSelectedStars] = useState(0);

  useEffect(() => {
    const stars = document.querySelectorAll('.stars_item i');

    const handleMouseOver = (star: Element, index: number) => {
      // Заполнить звезды до выбранной звезды
      for (let i = 0; i <= index; i++) {
        stars[i].classList.remove('far');
        stars[i].classList.add('fas');
      }
      // Очистить звезды после выбранной звезды
      for (let i = index + 1; i < stars.length; i++) {
        stars[i].classList.remove('fas');
        stars[i].classList.add('far');
      }
      const starLenght = document.querySelectorAll('.stars_item i.fas').length;
      setSelectedStars(starLenght);
    };

    stars.forEach((star, index) => {
      star.addEventListener('mouseover', () => handleMouseOver(star, index));
    });

    return () => {
      stars.forEach((star) => {
        star.removeEventListener('mouseover', handleMouseOver);
      });
    };
  }, []);

  return selectedStars;
};


