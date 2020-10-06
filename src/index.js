import { useEffect, useRef, useState } from 'react';

const useIsInView = () => {
  const [isInView, setIsInView] = useState();
  const [isBelow, setIsBelow] = useState();
  const [nodeRef, setRef] = useState(null);
  const observer = useRef(null);
  const callbackRef = (node) => {
    if (node !== null) {
      setRef(node);
    }
  };

  useEffect(() => {
    observer.current = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        setIsBelow(entry.boundingClientRect.top < 0);
      },
      {
        threshold: 0.25,
      }
    );
  }, []);

  useEffect(() => {
    if (nodeRef && observer.current) {
      observer.current.observe(nodeRef);
    }
  }, [nodeRef, observer]);

  return { isInView, ref: callbackRef, isBelow };
};

export default useIsInView;
