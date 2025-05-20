import { validateForm } from "./validate.js";
import { getConstantsPopupElements, createPopupHandlers } from "./popupManager.js";

/**
* Инициализирует форму: валидацию и обработку отправки
*/
export function initForm() {
  const formEl = document.forms['popup-form'];
  validateForm(formEl);

  formEl.addEventListener('submit', handleSubmit);
}

/**
* Обрабатывает отправку формы
* @param {Event} e - Событие отправки формы
*/
function handleSubmit(e) {
  e.preventDefault();

  if (hasEmptyRequiredFields(e.target) || hasMessageInErrorBox(e.target)) return;

  submitFormData(e.target);
}

/**
* Отправляет данные формы (заглушка для реализации)
* @param {HTMLFormElement} formEl - Форма для отправки
*/
function submitFormData(formEl) {
  const formData = new FormData(formEl);

  // здесь пишем логику, которая предусмотрена при отправке формы
  console.log('Данные для отправки формы:', Object.fromEntries(formData.entries()));

  formEl.reset();
  hidePopup();
}

/**
* Закрывает попап
*/
function hidePopup() {
  const { overlayEl, popupEl } = getConstantsPopupElements();
  const { handleHidePopupEl } = createPopupHandlers(overlayEl, popupEl);
  handleHidePopupEl();
}

/**
 * Проверяет наличие пустых обязательных полей
 * @param {HTMLFormElement} formElement - Форма для проверки
 * @returns {boolean} Есть ли пустые обязательные поля
 */
function hasEmptyRequiredFields(formEl) {
  const formFields = Array.from(formEl.querySelectorAll('[data-required]'));
  return formFields.map(el => el.value).some(str => str.trim() === '');
}

/**
* Проверяет есть ли сообщение об ошибке в соответствующих контейнерах
* @param {HTMLFormElement} formElement - Форма для проверки
* @returns {boolean} Есть ли сообщения об ошибках
*/
function hasMessageInErrorBox(formEl) {
  const errorBoxElements = Array.from(formEl.querySelectorAll('.form__error'));
  return errorBoxElements.map(el => el.textContent).some(str => str.trim() !== '');
}
