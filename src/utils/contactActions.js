import { handleScrollTo } from './scrollTo';

export const handlePrimaryContactAction = (event, phoneHref, targetId = '#contact') => {
  if (typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches) {
    event?.preventDefault();
    window.location.href = phoneHref;
    return;
  }

  if (event) {
    handleScrollTo(event, targetId);
  }
};
