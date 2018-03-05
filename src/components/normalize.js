const phone = value => {
  if (!value) {
    return value;
  }

  const onlyNums = value.replace(/[^\d]/g, '');
  if (onlyNums.length <= 3) {
    return onlyNums;
  }
  if (onlyNums.length <= 7) {
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
  }
  return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(
    6,
    10
  )}`;
};
const zip = value => {
  if (!value) {
    return value;
  }

  return value.replace(/[^\d]/g, '').slice(0, 5);
};
const state = value => {
  if (!value) {
    return value;
  }

  return value
    .replace(/[^a-zA-Z]/g, '')
    .slice(0, 2)
    .toUpperCase();
};
const model_year = value => {
  if (!value) {
    return value;
  }

  return value.replace(/[^\d]/g, '').slice(0, 4);
};
const make = value => {
  if (!value) {
    return value;
  }

  return value.replace(/[^a-zA-Z]/g, '').toUpperCase();
};

const normalize = {
  phone,
  zip,
  state,
  model_year,
  make
};

export default normalize;
