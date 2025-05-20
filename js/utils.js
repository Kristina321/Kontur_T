/**
* Создает утилиты для управления прокруткой страницы
* @returns {Object} Объект с утилитами:
*   - lockBodyScroll {Function} - блокирует прокрутку страницы
*   - unLockBodyScroll {Function} - разблокирует прокрутку страницы
*/
export function createScrollUtils() {
  const bodyEl = document.body;
  let scrollPosition;

  const lockBodyScroll = () => {
    scrollPosition = window.pageYOffset;
    bodyEl.style.position = 'fixed';
    bodyEl.style.top = `-${scrollPosition}px`;
    bodyEl.style.width = '100%';
  }

  const unLockBodyScroll = () => {
    bodyEl.style.position = '';
    bodyEl.style.top = '';
    window.scrollTo(0, scrollPosition);
  }

  return {
    lockBodyScroll,
    unLockBodyScroll
  }
}
