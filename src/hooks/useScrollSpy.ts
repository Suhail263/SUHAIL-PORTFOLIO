import { useEffect, useState, useRef } from 'react';

export function useScrollSpy(sectionIds: string[], offset = 120): string {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '');
  const activeIdRef = useRef(activeId);
  activeIdRef.current = activeId;
  const idsRef = useRef(sectionIds);
  idsRef.current = sectionIds;

  const idsKey = sectionIds.join(',');

  useEffect(() => {
    let ticking = false;

    const checkActive = () => {
      const ids = idsRef.current;
      let current = ids[0] ?? '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - offset <= 0) current = id;
      }
      if (current && current !== activeIdRef.current) {
        activeIdRef.current = current;
        setActiveId(current);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(checkActive);
      }
    };

    checkActive();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [idsKey, offset]);

  return activeId;
}
