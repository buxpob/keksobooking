const setTextContent = function (el, field, value, unit = '') {
  el.querySelector(`.popup__${field}`).textContent = `${value} ${unit}`;
  if (value === undefined || value.length === 0) {
    el.querySelector(`.popup__${field}`).remove();
  }
}

const getType = function (type) {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
  }
}

export const createPopup = function (arr) {

  const listDescriptionObjects = document.querySelector('.map__canvas');
  const descriptionObjectTemplate = document.querySelector('#card').content.querySelector('.popup');
  const descriptionObjectFragment = document.createDocumentFragment();

  arr.forEach((item) => {
    const el = descriptionObjectTemplate.cloneNode(true);

    setTextContent(el, 'title', item.offer.title);
    setTextContent(el, 'text--address', item.offer.address);
    setTextContent(el, 'text--price', item.offer.price, '₽/ночь');
    setTextContent(el, 'type', getType(item.offer.type));
    setTextContent(el, 'text--capacity', `${item.offer.rooms} комнаты для ${item.offer.guests} гостей`);
    setTextContent(el, 'text--time', `Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}`);
    setTextContent(el, 'features', item.offer.features.join(', '));
    setTextContent(el, 'description', item.offer.description);
    setTextContent(el, 'photos', item.offer.photos.join(', '));
    setTextContent(el, 'avatar', item.author.avatar);

    descriptionObjectFragment.appendChild(el);

  });

  listDescriptionObjects.appendChild(descriptionObjectFragment);

}