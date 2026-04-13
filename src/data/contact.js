import facebookIcon from '../assets/social icons/facebook.png';
import instagramIcon from '../assets/social icons/instagram.png';
import linkedinIcon from '../assets/social icons/linkedin.png';
import whatsappIcon from '../assets/social icons/whatsapp.png';
import youtubeIcon from '../assets/social icons/youtube.png';
import { assetSrc } from '../utils/assetSrc';

export const companyPhoneDisplay = '+1 (848) 384 3773';
export const companyPhoneHref = 'tel:+18483843773';
export const stickyCallLabel = 'Call Now';
export const stickyBarClass = 'bg-[linear-gradient(90deg,#0f172a,#155e75)]';

export const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/digicarehouseagency',
    image: assetSrc(facebookIcon),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/digicarehouseagency/',
    image: assetSrc(instagramIcon),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/18483843773',
    image: assetSrc(whatsappIcon),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@digicarehouseagency',
    image: assetSrc(youtubeIcon),
  },
  {
    label: 'LinkedIn',
    href: 'http://linkedin.com/company/digicarehouseagency',
    image: assetSrc(linkedinIcon),
  },
];
