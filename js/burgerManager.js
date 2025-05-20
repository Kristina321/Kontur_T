import { createScrollUtils } from "./utils.js";

/**
 * Инициализирует функционал бургер-меню и навигации
 * - Навешивает обработчики кликов на бургер-кнопку
 * - Добавляет обработчики для пунктов меню
 */
export function initBurger() {
  const burgerEl = document.querySelector('#burger');
  const navListEl = document.querySelector('#header-list');
  const { handleBurgerButton, handleNavItem } = createHeaderHandlers();

  navListEl.addEventListener('click', (e) => {
    const navItem = e.target.closest('.nav__item');
    if (navItem) handleNavItem(e, burgerEl);
  });

  burgerEl.addEventListener('click', handleBurgerButton);
}

/**
 * Создает обработчики событий для header-компонентов
 * @returns {Object} Объект с методами-обработчиками:
 *   - handleBurgerButton {Function} - обработчик клика по бургеру
 *   - handleNavItem {Function} - обработчик клика по пункту меню
 */
function createHeaderHandlers() {
  const swiper = document.querySelector('.swiper');
  const navEl = document.querySelector('.header__nav');
  const { lockBodyScroll, unLockBodyScroll } = createScrollUtils();

  const handleBurgerButton = (e) => {
    e.preventDefault();

    const isActive = e.currentTarget.classList.toggle('burger--active');

    navEl.classList.toggle('header__nav--active', isActive);
    swiper.classList.toggle('swiper--nav-active', isActive);

    isActive ? lockBodyScroll() : unLockBodyScroll();
  }

  const handleNavItem = (e, burgerEl) => {
    e.preventDefault();

    burgerEl.classList.remove('burger--active');
    navEl.classList.remove('header__nav--active');
    swiper.classList.remove('swiper--nav-active');

    unLockBodyScroll();
  }

  return {
    handleBurgerButton,
    handleNavItem
  }
}



