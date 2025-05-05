import { useState, useEffect } from 'react';

interface UseOutsideClickProps {
  initialState?: boolean;
  elementIds: string[];
}

interface UseOutsideClickResult {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleMenu: () => void;
}

const useOutsideClick = ({ initialState = false, elementIds }: UseOutsideClickProps): UseOutsideClickResult => {
  const [isOpen, setIsOpen] = useState(initialState);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen) {
        const target = e.target as HTMLElement;
        const shouldClose = !elementIds.some(id => {
          const element = document.getElementById(id);
          return element && element.contains(target);
        });

        if (shouldClose) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Add overflow hidden to body when menu is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isOpen, elementIds]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return { isOpen, setIsOpen, toggleMenu };
};

export default useOutsideClick; 