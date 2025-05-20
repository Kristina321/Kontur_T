import { createScrollUtils } from "./utils.js";

/**
* Инициализирует попап: навешивает обработчики событий на кнопки и элементы попапа
*/
export function initPopup() {
  const { overlayEl, popupEl } = getConstantsPopupElements();
  const { handleShowPopup, handleHidePopupEl, handleKeyupInPopup } = createPopupHandlers(overlayEl, popupEl);

  document.querySelector('.swiper').addEventListener('click', (e) => {
    if (e.target.closest('.slide__button')) {
      handleShowPopup(e);
    }
  });

  overlayEl.addEventListener('click', handleHidePopupEl);

  popupEl.addEventListener('keyup', handleKeyupInPopup);
}

/**
* Получает DOM-элементы, связанные с попапом
* @returns {Object} Объект с элементами:
*   - overlayEl {HTMLElement} - элемент оверлея
*   - popupEl {HTMLElement} - элемент попапа
*   - slideButtonElements {NodeList} - коллекция кнопок, открывающих попап
*/
export function getConstantsPopupElements() {
  const overlayEl = document.querySelector('#overlay');
  const popupEl = document.querySelector('#popup');

  return {
    overlayEl,
    popupEl,
  }
}

/**
* Создает обработчики событий для попапа
* @param {HTMLElement} overlayEl - элемент оверлея
* @param {HTMLElement} popupEl - элемент попапа
* @returns {Object} Объект с обработчиками:
*   - handleShowPopup {Function} - показывает попап
*   - handleHidePopupEl {Function} - скрывает попап
*   - handleKeyupInPopup {Function} - обработчик клавиатуры в попапе
*/
export function createPopupHandlers(overlayEl, popupEl) {
  const { lockBodyScroll, unLockBodyScroll } = createScrollUtils();
  const { setClassListForHidePopup, setClassListForShowPopup, setFocusOnPopup, isFocusOnLastElement } = createPopupDOMUtils();

  const handleHidePopupEl = () => {
    setClassListForHidePopup(overlayEl, popupEl);
    unLockBodyScroll();
    cleanFormAndErrors();
  }

  const handleShowPopup = () => {
    setClassListForShowPopup(overlayEl, popupEl);
    setFocusOnPopup(popupEl);
    lockBodyScroll();
  }

  const handleKeyupInPopup = (e) => {
    if (e.key === 'Tab' && isFocusOnLastElement(popupEl)) {
      setFocusOnPopup(popupEl);
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      handleHidePopupEl();
    }
  }

  return {
    handleShowPopup,
    handleHidePopupEl,
    handleKeyupInPopup
  }
}

/**
* Создает утилиты для работы с DOM попапа
* @returns {Object} Объект с утилитами:
*   - setClassListForHidePopup {Function} - скрывает попап через классы
*   - setClassListForShowPopup {Function} - показывает попап через классы
*   - setFocusOnPopup {Function} - устанавливает фокус на попап
*   - isFocusOnLastElement {Function} - проверяет, находится ли фокус на последнем элементе
*/
function createPopupDOMUtils() {
  const setClassListForHidePopup = (overlayEl, popupEl) => {
    overlayEl.classList.remove('overlay-active');
    popupEl.classList.remove('popup-active');
  }

  const setClassListForShowPopup = (overlayEl, popupEl) => {
    overlayEl.classList.add('overlay-active');
    popupEl.classList.add('popup-active');
    popupEl.classList.remove('popup-hide');
  }

  const setFocusOnPopup = (popupEl) => {
    popupEl.setAttribute('tabindex', '0');
    popupEl.focus();
  }

  const isFocusOnLastElement = (popupEl) => {
    const activeElement = document.activeElement;
    const lastElement = popupEl.querySelector('[data-last-element]');

    return activeElement === lastElement;
  }

  return {
    setClassListForHidePopup,
    setClassListForShowPopup,
    setFocusOnPopup,
    isFocusOnLastElement
  }
}

/**
 * Очищает содержимое формы и контейнеров с ошибками
 */
function cleanFormAndErrors() {
  const formEl = document.forms['popup-form'];
  const errorBoxElements = Array.from(formEl.querySelectorAll('.form__error'));

  formEl.reset();
  errorBoxElements.forEach(el => el.innerHTML = '')
}
