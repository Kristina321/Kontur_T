/**
  * Выравнивает высоту заголовков в каждой строке по максимальному значению
  */
  export function setMaxHeightByGroupCards() {
    const groupCardsMap = groupCardsElements();

    for (let cardElements of groupCardsMap.values()) {
      setMaxHeightForCardsTitle(cardElements)
    }
  }

  /**
   * Группирует DOM-элементы карточек по визуальным строкам
   * @returns {Map<number, HTMLElement[]>} Возвращает коллекцию сгруппированных элементов карточек
   */
  function groupCardsElements() {
    const cardsEl = document.querySelectorAll('.cards__item');
    const rowMap = new Map();

    cardsEl.forEach(card => {
      if (!rowMap.has(card.offsetTop)) {
        rowMap.set(card.offsetTop, []);
      }
      rowMap.get(card.offsetTop).push(card);
    });

    return rowMap;
  }

  /**
   * Устанавливает одинаковую минимальную высоту для всех заголовков в группе
   * @param {HTMLElement[]} cardElements - Массив элементов карточек
   */
  function setMaxHeightForCardsTitle(cardElements) {
    const cardsTitleEl = getCardsTitleElements(cardElements);

    cardsTitleEl.forEach(title => {
      title.style.minHeight = '';
    });
    const maxTitleHeight = getMaxHeightTitleElement(cardsTitleEl);

    cardsTitleEl.forEach(title => {
      title.style.minHeight = `${maxTitleHeight}px`;
    });
  }

  /**
   * Извлекает элементы заголовков из массива элементов карточек
   * @param {HTMLElement[]} cardElements - Массив DOM-элементов карточек
   * @returns {HTMLElement[]} Массив элементов заголовков ('.cards__title')
   */
  function getCardsTitleElements(cardElements) {
    validateNonEmptyArray(cardElements);
    return cardElements.map(el => el.querySelector('.cards__title')).filter(Boolean);
  }

  /**
  * Вычисляет максимальную высоту среди элементов заголовков
  * @param {HTMLElement[]} titleElements - Массив элементов заголовков
  * @returns {number} Максимальная высота в пикселях
  */
  function getMaxHeightTitleElement(titleElements) {
    validateNonEmptyArray(titleElements);

    const heightArr = titleElements.map(title => title.scrollHeight);

    return Math.max(...heightArr);
  }

  /**
  * Выбрасывает ошибку если передан пустой массив элементов
  * @param {Array} elements - Массив для проверки
  * @param {string} [errorMessage='Полученный массив пуст'] - Текст ошибки (по умолчанию: 'Полученный массив пуст')
  */
  function validateNonEmptyArray(elements, errorMessage = 'Полученный массив пуст') {
    if (!Array.isArray(elements)) {
      throw new Error(`Не является массивом, ${typeof elements}`);
    }
    if (!elements.length) {
      throw new Error(errorMessage);
    }
  }
