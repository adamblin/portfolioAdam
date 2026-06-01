import { useEffect } from 'react';

/**
 * Drives scroll-entrance animations.
 * Adds 'is-visible' to matching elements when they enter the viewport.
 */
export function useReveal(
  rootMargin = '-60px 0px',
  selector = '[data-reveal]',
  threshold = 0.08
) {
  useEffect(() => {
    const pendingReveals = new Map<Element, number>();
    const observed = new Set<HTMLElement>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          const pendingReveal = pendingReveals.get(el);

          if (pendingReveal) {
            window.clearTimeout(pendingReveal);
            pendingReveals.delete(el);
          }

          if (entry.isIntersecting) {
            const delay = el.dataset.revealDelay ? parseInt(el.dataset.revealDelay, 10) : 0;
            if (delay > 0) {
              const timeoutId = window.setTimeout(() => {
                el.classList.add('is-visible');
                pendingReveals.delete(el);
                observer.unobserve(el);
                observed.delete(el);
              }, delay);
              pendingReveals.set(el, timeoutId);
              return;
            }

            el.classList.add('is-visible');
            observer.unobserve(el);
            observed.delete(el);
            return;
          }
        });
      },
      { rootMargin, threshold }
    );

    const observeTargets = () => {
      const targets = Array.from(document.querySelectorAll<HTMLElement>(selector));

      targets.forEach((el) => {
        if (el.classList.contains('is-visible') || observed.has(el)) return;
        observed.add(el);
        observer.observe(el);
      });
    };

    observeTargets();

    const mutationObserver = new MutationObserver(observeTargets);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      pendingReveals.forEach((timeoutId) => window.clearTimeout(timeoutId));
      pendingReveals.clear();
      observed.clear();
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, [rootMargin, selector, threshold]);
}
