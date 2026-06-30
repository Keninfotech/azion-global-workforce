import { useRef } from "react";
import { Link } from "react-router-dom";

function getClassName(variant, className) {
  const base = variant === "secondary" ? "button-secondary" : "button-primary";
  return `${base} ${className ?? ""}`.trim();
}

export default function MagneticButton({
  children,
  className,
  icon,
  to,
  type = "button",
  variant = "primary",
}) {
  const ref = useRef(null);

  const handleMouseMove = (event) => {
    if (!ref.current || window.matchMedia("(hover: none)").matches) {
      return;
    }

    const bounds = ref.current.getBoundingClientRect();
    const x = event.clientX - bounds.left - bounds.width / 2;
    const y = event.clientY - bounds.top - bounds.height / 2;
    ref.current.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
  };

  const handleLeave = () => {
    if (!ref.current) {
      return;
    }

    ref.current.style.transform = "translate(0px, 0px)";
  };

  const content = (
    <span className="inline-flex items-center gap-2">
      <span>{children}</span>
      {icon ? <span className="transition duration-300 group-hover:translate-x-1">{icon}</span> : null}
    </span>
  );

  if (to) {
    return (
      <Link
        ref={ref}
        className={`group ${getClassName(variant, className)}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleLeave}
        to={to}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={ref}
      className={`group ${getClassName(variant, className)}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      type={type}
    >
      {content}
    </button>
  );
}
