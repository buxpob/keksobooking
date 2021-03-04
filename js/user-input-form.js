const typePlacement = document.querySelector('#type');
const pricePerNight = document.querySelector('#price');
const titleAd = document.querySelector('#title');
const capacityRooms = document.querySelector('#room_number');
const capacityGuests = document.querySelector('#capacity');

const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

const MapPlaceToPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

export const userInputForm = function () {

  titleAd.addEventListener('invalid', () => {
    if (titleAd.validity.tooShort) {
      titleAd.setCustomValidity('Объявление должно состоять минимум из 30 символов');
    } else if (titleAd.validity.tooLong) {
      titleAd.setCustomValidity('Объявление должно состоять максимум из 100 символов');
    } else if (titleAd.validity.valueMissing) {
      titleAd.setCustomValidity('Обязательное поле!');
    } else {
      titleAd.setCustomValidity('');
    }
  });

  pricePerNight.onkeydown = function (evt) {
    return evt.keyCode == 69 ? false : true;
  }

  typePlacement.onchange = function () {
    pricePerNight.placeholder = MapPlaceToPrice[typePlacement.value];
  }

  pricePerNight.min = MapPlaceToPrice[typePlacement.value];
  const minPrice = pricePerNight.min;

  pricePerNight.addEventListener('invalid', () => {
    if (pricePerNight.validity.rangeOverflow) {
      pricePerNight.setCustomValidity('Максимальная цена за ночь 1 000 000');
    } else if (pricePerNight.validity.rangeUnderflow) {
      pricePerNight.setCustomValidity(`Минимальная цена не может быть меньше ${minPrice}`);
    } else if (pricePerNight.validity.valueMissing) {
      pricePerNight.setCustomValidity('Обязательное поле!');
    } else {
      pricePerNight.setCustomValidity('');
    }
  })

  capacityRooms.addEventListener('change', () => {
    const rooms = Number(capacityRooms.value);

    for (let i = 0; i < capacityGuests.length; i++) {
      const guests = Number(capacityGuests[i].value);

      if (guests <= rooms) {
        capacityGuests[i].disabled = false;
      } else {
        capacityGuests[i].disabled = true;
      }

      if (rooms === 100) {
        if (guests !== 0) {
          capacityGuests[i].disabled = true;
        }
      }

      if (rooms !== 100) {
        if (guests === 0) {
          capacityGuests[i].disabled = true;
        }
      }
    }
  })

  timeIn.onchange = function () {
    timeOut.value = timeIn.value;
  }

  timeOut.onchange = function () {
    timeIn.value = timeOut.value;
  }
}