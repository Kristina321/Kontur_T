import { swiperConfig } from "./swiperConfig.js";
import { initMap } from "./mapManager.js";
import { setMaxHeightByGroupCards } from "./cardsManager.js";
import { fancyboxConfig } from "./galleryConfig.js";
import { initPopup } from "./popupManager.js";
import { initForm } from "./popupFormManager.js";
import { initBurger } from "./burgerManager.js";

document.addEventListener('DOMContentLoaded', function () {
/* разкомментировать для подключения карты
  initMap();
*/
  Fancybox.bind('[data-fancybox="gallery"]', fancyboxConfig);

  window.addEventListener('load', setMaxHeightByGroupCards);
  window.addEventListener('resize', setMaxHeightByGroupCards);

  const heroSwiper = new Swiper('.swiper', swiperConfig);

  document.addEventListener('click', function (e) {
    console.log(e.target);
    console.log(e.currentTarget);
  });
  initBurger();
  initPopup();
  initForm();
});
