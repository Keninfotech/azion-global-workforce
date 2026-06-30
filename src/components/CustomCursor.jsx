import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches || !cursorRef.current) {
      return undefined;
    }

    const cursor = cursorRef.current;
    const interactiveSelector = "a, button, input, textarea, [role='button']";

    const handleMove = (event) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
      cursor.style.opacity = "1";
    };

    const handleLeave = () => {
      cursor.style.opacity = "0";
    };

    const handleOver = (event) => {
      if (!event.target.closest(interactiveSelector)) {
        return;
      }

      cursor.style.width = "40px";
      cursor.style.height = "40px";
    };

    const handleOut = () => {
      cursor.style.width = "24px";
      cursor.style.height = "24px";
    };

    document.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerleave", handleLeave);
    document.addEventListener("pointerover", handleOver);
    document.addEventListener("pointerout", handleOut);

    return () => {
      document.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerleave", handleLeave);
      document.removeEventListener("pointerover", handleOver);
      document.removeEventListener("pointerout", handleOut);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor opacity-0" />;
}
