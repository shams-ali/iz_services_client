import { capitalize } from 'lodash';

const dealer = value =>
  value &&
  value
    .split(' ')
    .map(v => capitalize(v))
    .join(' ');

const name = value =>
  value &&
  value
    .split(' ')
    .map(v => capitalize(v))
    .join(' ');

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

const zip = value => value && value.replace(/[^\d]/g, '').slice(0, 5);

const state = value =>
  value &&
  value
    .replace(/[^a-zA-Z]/g, '')
    .slice(0, 2)
    .toUpperCase();

const model_year = value => value && value.replace(/[^\d]/g, '').slice(0, 4);

const make = value => value && value.replace(/[^a-zA-Z]/g, '').toUpperCase();

const plate = value => value && value.toUpperCase();

const vin = value => value && value.toUpperCase();

const normalize = {
  dealer,
  name,
  phone,
  zip,
  state,
  model_year,
  make,
  plate,
  vin
};

export default normalize;
