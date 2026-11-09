import { useEffect, useState } from "react";

export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-38% 0px -52% 0px", threshold: [0, 0.1, 0.4, 0.75] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
