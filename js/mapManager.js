/**
* Инициализирует карту Яндекс.Карт с асинхронным ожиданием готовности API.
*/
export async function initMap() {
  await ymaps3.ready;

  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = ymaps3;

  const map = new YMap(
    document.getElementById('map'),
    setMapConfig()
  );

  map.addChild(new YMapDefaultSchemeLayer());
  map.addChild(new YMapDefaultFeaturesLayer());

  const marker = new YMapMarker(setMarkerConfig(), createMarkerEl());

  map.addChild(marker);
}

/**
* Возвращает объект конфигурации для карты
*/
function setMapConfig() {
  return {
      location: {
        center: [82.926493, 55.028894],
        zoom: 16
      }
    }
}

/**
* Возвращает объект конфигурации для маркера
*/
function setMarkerConfig() {
  return {
    coordinates: [82.926493, 55.028894],
    draggable: true
  }
}

/**
* Создает маркер для карты
*/
function createMarkerEl() {
  const markerEl = document.createElement('div');
  markerEl.classList.add('map__marker');

  return markerEl;
}
