// import 'styles/modules/_observer.scss';

const images = document.querySelectorAll('source, img');

function loadImage(image) {
  image.classList.add('fade-in');
  if (image.dataset && image.dataset.src) {
    image.src = image.dataset.src;
  }

  if (image.dataset && image.dataset.srcset) {
    image.srcset = image.dataset.srcset;
  }
}

if ('IntersectionObserver' in window) {
  // IntersectionObserver Supported
  const config = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  };

  // eslint-disable-next-line no-inner-declarations
  function onChange(entries, observer) {
    entries.forEach((entrie) => {
      // console.log(change);
      if (entrie.isIntersecting) {
        // Stop watching and load the image
        loadImage(entrie.target);
        observer.unobserve(entrie.target);
      }
    });
  }

  const observer = new IntersectionObserver(onChange, config);
  images.forEach((img) => {
    observer.observe(img);
  });
} else {
  for (let i = 0; i < images.length; i += 1) {
    loadImage(images[i]);
  }
}
