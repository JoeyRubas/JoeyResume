import { useEffect, useState } from "react";

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useIntersectionObserver = (
  elementRef: React.RefObject<Element | null> | string,
  options: UseIntersectionObserverOptions = {}
) => {
  const [isVisible, setIsVisible] = useState(false);
  const { threshold = 0.3, rootMargin = '0px' } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold, rootMargin }
    );

    let element: Element | null = null;
    
    if (typeof elementRef === 'string') {
      element = document.querySelector(elementRef);
    } else if (elementRef.current) {
      element = elementRef.current;
    }

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
      observer.disconnect();
    };
  }, [elementRef, threshold, rootMargin]);

  return isVisible;
};
