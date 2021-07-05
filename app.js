const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const galleryRef = document.querySelector('.js-gallery');

const lightbox = {
  modalRef: document.querySelector('.js-lightbox'),
  imgRef: document.querySelector('.lightbox__image'),
  prevBtnRef: document.querySelector('[data-action="prevEl"]'),
  nextBtnRef: document.querySelector('[data-action="nextEl"]'),
  closeBtnRef: document.querySelector('[data-action="close-lightbox"]'),
  overlayRef: document.querySelector('.lightbox__overlay'),
};

console.log('lightbox.prevBtnRef :>> ', lightbox.prevBtnRef);

const galleryMarkup = createGalleryMarkup(galleryItems);
galleryRef.insertAdjacentHTML('beforeend', galleryMarkup);

galleryRef.addEventListener('click', onGalleryClick);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
      <li class="gallery__item">
        <a
          class="gallery__link"
          href="${original}"
        >
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>
    `;
    })
    .join('');
}

function onGalleryClick(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  e.preventDefault();

  const galleryImage = e.target;
  const activeImage = document.querySelector('.gallery__image .is-active');

  if (activeImage) {
    activeImage.classList.remove('is-active');
  }

  galleryImage.classList.add('is-active');

  openModal(lightbox.modalRef);
  replacementImage(galleryImage, lightbox.imgRef);
}

function openModal(modalRef) {
  modalRef.classList.add('is-open');
  buttonNavigation();
  closeModal(lightbox);
}

function replacementImage(newImageRef, oldImageRef) {
  const srcNewImage = newImageRef.dataset.source;
  const altNewImage = newImageRef.alt;

  oldImageRef.src = srcNewImage;
  oldImageRef.alt = altNewImage;
}

function closeModal({ closeBtnRef, overlayRef }) {
  closeBtnRef.addEventListener('click', onCloseModalBtnClick);
  overlayRef.addEventListener('click', onOverlayModalClick);
  window.addEventListener('keydown', onPressKeyEsc);
}

function onCloseModalBtnClick() {
  lightbox.modalRef.classList.remove('is-open');
  this.removeEventListener('click', onCloseModalBtnClick);
  lightbox.prevBtnRef.removeEventListener('click', onPrevBtnClick);
  lightbox.nextBtnRef.removeEventListener('click', onPrevBtnClick);
}

function onOverlayModalClick(e) {
  if (e.currentTarget !== e.target) {
    return;
  }

  lightbox.modalRef.classList.remove('is-open');
  lightbox.modalRef.removeEventListener('click', onOverlayModalClick);
  lightbox.prevBtnRef.removeEventListener('click', onPrevBtnClick);
  lightbox.nextBtnRef.removeEventListener('click', onPrevBtnClick);
}

function onPressKeyEsc(e) {
  if (e.code !== 'Escape') {
    return;
  }

  lightbox.modalRef.classList.remove('is-open');
  window.removeEventListener('keydown', onPressKeyEsc);
  lightbox.prevBtnRef.removeEventListener('click', onPrevBtnClick);
  lightbox.nextBtnRef.removeEventListener('click', onPrevBtnClick);
}

function buttonNavigation() {
  lightbox.prevBtnRef.addEventListener('click', onPrevBtnClick);
  lightbox.nextBtnRef.addEventListener('click', onNextBtnClick);
}

function onPrevBtnClick() {
  const currentImg = document.querySelector('.gallery__image.is-active');
  const currentItem = currentImg.closest('.gallery__item');

  const prevItem = currentItem.previousElementSibling;

  if (!prevItem) {
    return;
  }

  const prevImg = prevItem.querySelector('.gallery__image');

  currentImg.classList.remove('is-active');
  prevImg.classList.add('is-active');
  replacementImage(prevImg, lightbox.imgRef);
}

function onNextBtnClick(e) {
  const currentImg = document.querySelector('.gallery__image.is-active');
  const currentItem = currentImg.closest('.gallery__item');

  const nextItem = currentItem.nextElementSibling;
  if (!nextItem) {
    return;
  }

  const nextImg = nextItem.querySelector('.gallery__image');

  currentImg.classList.remove('is-active');
  nextImg.classList.add('is-active');
  replacementImage(nextImg, lightbox.imgRef);
}
