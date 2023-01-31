const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomElementsArray = (arr, length) => {
  const values = [];
  while (values.length < length) {
    const currentElement = getRandomArrayElement(arr);
    values.push(currentElement);
  }
  return values;
};

const getRandomFractNumber = (min, max, decimalPlaces) => {

  if (Math.sign(max) === -1 || Math.sign(min) === -1 || max === min || max < min) {
    return NaN;
  }

  return +(Math.random() * (max - min) + min).toFixed(decimalPlaces);
};

export { getRandomArrayElement, getRandomInteger, getRandomElementsArray, getRandomFractNumber };
