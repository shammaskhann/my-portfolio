import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useMediaQuery } from "./useMediaQuery";

/**
 * Small pointer tilt, only on fine pointers and when motion is allowed.
 * Returns a ref and an inline transform.
 */
export function useTilt(max = 4) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const fine = useMediaQuery("(pointer: fine)");
  const enabled = fine && !reduce;
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const frame = useRef(0);

  useEffect(() => {
    const node = ref.current;
    if (!node || !enabled) return;

    const onMove = (event) => {
      const rect = node.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        setTilt({ x: py * -max, y: px * max });
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(frame.current);
      setTilt({ x: 0, y: 0 });
    };

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame.current);
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, max]);

  return {
    ref,
    style: enabled
      ? { transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }
      : undefined,
  };
}
