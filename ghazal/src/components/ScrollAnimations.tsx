"use client";
import { useEffect, useRef } from 'react';

const ScrollAnimations = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Use passive intersection observer for better performance
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
          entry.target.classList.remove('section-hidden');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -10px 0px'
    });

    // Only observe sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      section.classList.add('section-hidden');
      observerRef.current?.observe(section);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return null;
};

export default ScrollAnimations;
