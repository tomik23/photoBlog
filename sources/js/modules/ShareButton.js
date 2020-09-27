/* eslint-disable import/no-unresolved */
// import 'styles/modules/_share-button.scss';

const shareData = {
  title: 'Zdjęcia zebrane',
  text:
    '📸 Blog fotograficzny, ciekawe nietuzinkowe zdjęcia, niezapomniane chwile.',
  url: 'https://grzegorztomicki.pl',
};

const shareButtonOptions = {
  place: {
    stick: 'share-button-stick',
    bottom: 'share-button-bottom',
  },
  title: 'Podziel się',
};

class ShareButton {
  constructor() {
    this.option = shareButtonOptions;
    this.getTitle = document.title;
    this.getUrl = window.location.href;
  }

  initial() {
    const placeStick = document.getElementById(this.option.place.stick);
    const placeBottom = document.getElementById(this.option.place.bottom);

    if (placeStick || placeBottom) {
      placeStick.innerHTML = navigator.share
        ? this.shareButtonNavigation()
        : this.htmlTemplate();
      placeBottom.innerHTML = navigator.share
        ? this.shareButtonNavigation()
        : this.htmlTemplate();

      // placeStick.innerHTML = this.shareButtonNavigation();
      // placeBottom.innerHTML = this.shareButtonNavigation();
    }

    if (navigator.share) {
      const btns = document.querySelectorAll('.share-mobile__btn');
      for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', async () => {
          try {
            await navigator.share(shareData);
          } catch (err) {
            console.log(err);
          }
        });
      }
    } else {
      this.handlerEvent();
    }
  }

  htmlTemplate() {
    const social = {
      facebook:
        '<svg class="share__icon share__btn--facebook"><use xlink:href="#share-icon-facebook"></use></svg>',
      twitter:
        '<svg class="share__icon share__btn--twitter"><use xlink:href="#share-icon-twitter"></use></svg>',
      mail:
        '<svg class="share__icon share__btn--mail"><use xlink:href="#share-icon-mail"></use></svg>',
      add:
        '<svg class="share__icon share__btn--add"><use xlink:href="#share-icon-add-opinion"></use></svg>',
    };

    const template = `
        <h2>${this.option.title}</h2>
        <div class="share fl">
            <div title="Udostępnij w serwisie Facebook. Strona otworzy się w nowym oknie." data-share="facebook" class="share__btn btn-facebook">
                <span class="share__btn--wrapper">${social.facebook}</span>
            </div>
            <div title="Udostępnij w serwisie Twitter. Strona otworzy się w nowym oknie." data-share="twitter" class="share__btn btn-twitter">
                <span class="share__btn--wrapper">${social.twitter}</span>
            </div>
            <div title="Wyślij maila." data-share="mail" class="share__btn btn-mail">
                <span class="share__btn--wrapper">${social.mail}</span>
            </div>

        </div>
        `;
    return template;
  }

  shareButtonNavigation() {
    const share = `
      <div class="share-mobile fl">
        <div class="share-mobile__btn">
          <svg class="share__icon">
            <use xlink:href="#share-icon"></use>
          </svg>
          <h2>${this.option.title}</h2>
        </div>
      </div>
    `;

    return share;
  }

  handlerEvent() {
    const buttonShare = document.querySelectorAll('.share__btn');
    const winWidth = 520;
    const winHeight = 320;
    const winTop = window.screen.height / 2 - winHeight / 2;
    const winLeft = window.screen.width / 2 - winWidth / 2;

    for (let i = 0; i < buttonShare.length; i += 1) {
      buttonShare[i].addEventListener('click', ({ currentTarget }) => {
        const typeSocial = currentTarget.getAttribute('data-share');
        switch (typeSocial) {
          case 'mail': {
            const mailtoLink = `mailto:?subject=Zobacz może Ci się spodoba&body=${this.getTitle} %20%0A ${this.getUrl}`;
            const win = window.open(mailtoLink, 'mail');
            setTimeout(() => {
              win.close();
            }, 500);
            break;
          }

          default: {
            window.open(
              this.showShareLink(typeSocial),
              'sharer',
              `top=${winTop}, left=${winLeft}, toolbar=0, status=0, width=${winWidth}, height=${winHeight}`
            );
            break;
          }
        }
      });
    }
  }

  showShareLink(typeSocial) {
    let url;
    switch (typeSocial) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURI(
          this.getUrl
        )}&p=${encodeURI(this.getDescription())}`;
        break;
      case 'twitter':
        url = `http://twitter.com/share?text=${this.getTitle}&url=${this.getUrl}`;
        break;
      default:
        break;
    }
    return url;
  }

  getDescription() {
    let description;
    const meta = document.getElementsByTagName('meta');

    for (let x = 0, y = meta.length; x < y; x += 1) {
      if (meta[x].name.toLowerCase() === 'description') {
        description = meta[x];
      }
    }
    const content = description.content.replace(/ /g, '%20');
    return content;
  }
}

export default ShareButton;
