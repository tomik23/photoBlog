import SmoothScroll from 'smooth-scroll';
import '../scss/modules/_article.scss';
import '../scss/style.scss';
import './modules/Observer';
import backToTop from './modules/BackToTop';
// import progressBar from './modules/ProgressBar';
import DisqusLoader from './modules/Disqusloader';
// import NavMenu from './modules/NavMenu';
import mail from './modules/Mail';
import './modules/snow';
import ShareButton from './modules/ShareButton';

document.addEventListener('DOMContentLoaded', () => {
  const option = {
    speed: 100,
    easing: 'easeOutCubic',
  };
  const scroll = new SmoothScroll('.scroll', option);

  // const navMenu = new NavMenu();
  // navMenu.addToHeaderMenu();

  const sharebutton = new ShareButton();
  sharebutton.renderHTML();

  const disqusloader = new DisqusLoader();
  disqusloader.init();

  mail();
  backToTop();
  // progressBar();
});
