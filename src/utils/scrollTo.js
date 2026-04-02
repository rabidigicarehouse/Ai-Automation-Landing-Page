export const handleScrollTo = (e, targetId) => {
  e.preventDefault();

  if (targetId === '#') {
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return;
  }

  const element = document.getElementById(targetId.substring(1));
  if (element) {
    const panel = element.closest('.panel-shell') || element;
    const panelId = panel.dataset?.panelId || targetId.substring(1);
    const gsapStart = window.__panelStarts?.[panelId];
    const targetTop = typeof gsapStart === 'number'
      ? gsapStart
      : panel.getBoundingClientRect().top + window.scrollY;

    if (window.lenis) {
      window.lenis.scrollTo(targetTop, { duration: 1.2 });
    } else {
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  }
};
